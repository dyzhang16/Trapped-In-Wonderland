class LevelOne extends Phaser.Scene{
    constructor(){
            super('levelOneScene');
    }

    preload(){
    }
    create(){
        //add soundFX for eating and drinking
        this.scaleUp = this.sound.add('ScaleUp',{volume: 0.1});                       
        this.scaleDown = this.sound.add('ScaleDown',{volume: 0.1});
        //reserve keys for interactable buttons
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);  
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //reserve arrow keys for movement
        cursors = this.input.keyboard.createCursorKeys();
        //create background and hints                             
        let background = this.add.tileSprite(0,0,896,512,'level1Background').setOrigin(0,0); 
        this.hint = this.add.image(0,0,'level1Hint').setOrigin(0,0);
        this.pepe = this.add.image(100,100,'Pepe').setScale(0.2).setOrigin(0,0);  //easter egg
        this.pepe.setVisible(false);           
        //add in level 1 tilemap and sets collision for tilemap
        const map1 = this.make.tilemap({key: 'map1'});                   //https://stackabuse.com/phaser-3-and-tiled-building-a-platformer/
        const tileset1 = map1.addTilesetImage('ScaleDistortionGameTileset','tiles',32,32,0,0);
        const platforms1 = map1.createStaticLayer('Platforms',tileset1,1,1);
        platforms1.setCollisionByProperty({collides: true});
        //add in door object and exitSign object 
        this.door = new Door(this, 800, 448,'door', 13).setOrigin(0.5);
        this.exit = new DoorIndicator(this, 800, 398, 'exitSign', 1).setOrigin(0.5);
        //add text bubbles
        this.eatText = this.add.sprite(128,64,'textEat');
        this.eatText.setVisible(false);
        this.drinkText = this.add.sprite(228,64,'textDrink');
        this.drinkText.setVisible(false);
        this.doorText = this.add.sprite(428,64,'textDoor');
        this.doorText.setVisible(false);
        this.doorText.setDepth(1);
        //add in player object and create animations
        this.p1 = new Player(this, 400, 100,'playerIdle').setOrigin(0.5,1); 
        this.anims.create({                                 //Idle animation
          key: 'p1Idle',
          repeat: -1,
          frames: this.anims.generateFrameNumbers('playerIdle', {start: 0, end: 0, first: 0}),
          frameRate: 30
        });
        this.anims.create({                                 //Movement animation
          key: 'p1Walk',
          repeat: -1,
          frames: this.anims.generateFrameNumbers('playerWalk', {start: 0, end: 7, first: 0}),
          frameRate: 24
        });
        this.anims.create({                                 //Jump animation
          key: 'p1Jump',
          frames: this.anims.generateFrameNumbers('playerJump', {start: 0, end: 5, first: 0}),
          frameRate: 5
        });
        //add in cookie and drink objects
        this.cookie = new Cookie(this, 350, 432,'cookie').setOrigin(0.5);
        this.drink = new Drink(this, 70, 350,'drink').setOrigin(0.5);
        //create a ventZone and textZone that set variables upon entering zone
        this.ventZone = new Zone(this, 565, 430, 150, 60).setOrigin(0,0);    //https://www.html5gamedevs.com/topic/38895-making-a-zone/
        this.textZone = new Zone(this, 765, 430, 60, 60).setOrigin(0,0);
        //instantiate physics between objects and platforms
        this.physics.add.collider(this.p1, platforms1);                    
        this.physics.add.collider(this.door, platforms1);                   
        this.physics.add.collider(this.cookie, platforms1);                 
        this.physics.add.collider(this.drink, platforms1);
        //instantiate physics between player and entering zones
        this.physics.add.overlap(this.p1, this.ventZone);                        
        this.physics.add.overlap(this.p1, this.textZone);  
        this.ventZone.on('enterzone', () => inSmallVent = true);                      //upon overlap, sets variable to true
        this.ventZone.on('leavezone', () => inSmallVent = false);                     //upon leaving, sets variable to false
        this.textZone.on('enterzone', () => intextZone = true);  
        this.textZone.on('leavezone', () => intextZone = false);
        //add cameras that are bound the map, and follow the player
        this.cameras.main.setBounds(0, 0, 896, 512);
        this.cameras.roundPixels = true;                                              //attempt to fix edge bleeding when shrinking
        this.cameras.main.startFollow(this.p1);
    }
    update(){ 
      this.p1.update();                                                     //calls on player object update()
      this.ventZone.update();                                               //calls on the zone Object Update()
      this.textZone.update();
      //restart feature, upon pressing 'R'
      if(Phaser.Input.Keyboard.JustDown(keyR)){
        this.scene.start('levelOneIntroScene');
      }
      //text bubbles positions
      this.eatText.x = this.p1.body.position.x+100;
      this.eatText.y = this.p1.body.position.y-30;
      this.drinkText.x = this.p1.body.position.x+100;
      this.drinkText.y = this.p1.body.position.y-30;
      this.doorText.x = this.p1.body.position.x-100;
      this.doorText.y = this.p1.body.position.y-30;
      //Function that reveals hints for the map the more drugs are taken
      this.puzzleSolver();
      //changes camera zoom based on size of player
      if(currentScale == 2){
        this.cameras.main.setZoom(1);
        this.eatText.destroy();
      }else if(currentScale == 0.5){
        this.cameras.main.setZoom(1.5);
        this.drinkText.destroy();
      }else if(currentScale == 1){
        this.cameras.main.setZoom(1.25);
      }
      //instantiates physics between player and objects
      this.physics.world.collide(this.p1, this.cookie, this.p1cookieCollision, null, this); 
      this.physics.world.collide(this.p1, this.drink, this.p1drinkCollision,null, this);    
      this.physics.world.overlap(this.p1, this.door, this.atDoor, null, this);
      //sets text bubble to be visible when in the textZone
      if(intextZone){                                                          //conditions if true for text bubble door
        this.doorText.setVisible(true);
      }else{
        this.doorText.setVisible(false);
      }
    }
    //collision between cookie object and player
    p1cookieCollision(){                                                    
      this.cookie.destroy();
      cookieObtained = true;                                                //sets variable to true to enable future use
      this.eatText.setVisible(true);                                        //reveals text to explain how to use the cookie
    }
    //collision between drink object and player
    p1drinkCollision(){                                                     
      this.drink.destroy();
      drinkObtained = true;                                                 //sets variable to true to enable future use
      this.drinkText.setVisible(true);                                      //reveals text to explain how to use the drink
      //console.log(drinkObtained);
    }
    //collision between door and player
    atDoor(){                                                               
      if(cursors.up.isDown && this.p1.body.onFloor() && currentScale == 1){ //can only transition if the player is the right size
        this.scene.start('levelTwoIntroScene');                             //on the ground and pressing the up arrow key
        this.doorText.setVisible(false);                                    //hides doorText upon leaving level
      }
    }
    //revealed when player takes a certain number of drugs
    puzzleSolver(){     
      switch(drugsTaken)
      {
        case 6:   this.hint.setFrame(1);
          break;
        case 8:  this.hint.setFrame(2); 
          break;
        case 10:  this.hint.setFrame(3);
          break;
        case 20:  this.pepe.setVisible(true);      
        default:
          break;
      }
    }
}    