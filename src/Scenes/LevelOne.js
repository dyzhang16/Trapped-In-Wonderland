class LevelOne extends Phaser.Scene{
    constructor(){
            super('levelOneScene');
    }

    preload(){
    }
    create(){
        drugsTaken = 0;
        this.scaleUp = this.sound.add('ScaleUp',{volume: 0.1});                                      //add soundFX for eating and drinking(not implemented yet)
        this.scaleDown = this.sound.add('ScaleDown',{volume: 0.1});                                
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);  //reserve space e and q as interactable buttons
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        cursors = this.input.keyboard.createCursorKeys();                             //reserve arrow keys for movement
        let background = this.add.tileSprite(0,0,896,512,'level1Background').setOrigin(0,0);
        this.hint = this.add.image(0,0,'level1Hint').setOrigin(0,0);
        //add in level 1 tilemap and sets collision for tilemap
        const map1 = this.make.tilemap({key: 'map1'});                                //https://stackabuse.com/phaser-3-and-tiled-building-a-platformer/
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
        //add in player object and create animations(scale up and down animations bugged atm)
        this.p1 = new Player(this, 400, 100,'playerIdle').setOrigin(0.5,1); //bug with swapping different sized characters
        this.anims.create({                                 //basic movement animation
            key: 'p1Idle',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('playerIdle', {start: 0, end: 0, first: 0}),
            frameRate: 30
        });
        this.anims.create({                                 //basic movement animation
          key: 'p1Walk',
          repeat: -1,
          frames: this.anims.generateFrameNumbers('playerWalk', {start: 0, end: 7, first: 0}),
          frameRate: 24
        });
        this.anims.create({                                 //basic movement animation
            key: 'p1Jump',
            frames: this.anims.generateFrameNumbers('playerJump', {start: 0, end: 5, first: 0}),
            frameRate: 5
        });
        this.anims.create({                                 //basic movement animation
          key: 'p1SizeUp',
          frames: this.anims.generateFrameNumbers('playerSizeUp', {start: 0, end: 10, first: 0}),
          frameRate: 10
        });
        this.anims.create({                                 //basic movement animation
          key: 'p1SizeDown',
          frames: this.anims.generateFrameNumbers('playerSizeDown', {start: 0, end: 11, first: 0}),
          frameRate: 10
        });
        //add in cookie and drink objects
        this.cookie = new Cookie(this, 350, 432,'cookie').setOrigin(0.5);
        this.drink = new Drink(this, 70, 350,'drink').setOrigin(0.5);
        //creating a zone for the vent area where the player cannot scale up
        this.Ventzone1 = new Zone(this, 565, 430, 150, 60).setOrigin(0,0);    //https://www.html5gamedevs.com/topic/38895-making-a-zone/
        this.Ventzone6 = new Zone(this, 765, 430, 60, 60).setOrigin(0,0);

        this.physics.add.collider(this.p1, platforms1);                     //physics between objects and map 
        this.physics.add.collider(this.door, platforms1);                   //to ensure they don't fall through
        this.physics.add.collider(this.cookie, platforms1);                 //the map 
        this.physics.add.collider(this.drink, platforms1);
        this.physics.add.overlap(this.p1, this.Ventzone1);                        //if player overlaps with ventzone
        this.physics.add.overlap(this.p1, this.Ventzone6);  
        this.Ventzone1.on('enterzone', () => inSmallVent = true);                      //on entering zone, set to true
        this.Ventzone1.on('leavezone', () => inSmallVent = false);                     //when not overlapping, set to false
        this.Ventzone6.on('enterzone', () => textVent5 = true);  
        this.Ventzone6.on('leavezone', () => textVent5 = false);

        this.cameras.main.setBounds(0, 0, 896, 512);
        this.cameras.roundPixels = true;
        this.cameras.main.startFollow(this.p1);
      }
    update(){ 
      this.p1.update();                                                     //calls on player object update()
      this.Ventzone1.update();
      this.Ventzone6.update();
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
      
      this.puzzleSolver();
      if(Phaser.Input.Keyboard.JustDown(keySPACE)){                       //shortcut for debugging future levels
        this.scene.start('levelFiveIntroScene');
      }
      if(currentScale == 2){
        this.cameras.main.setZoom(1);
        this.eatText.destroy();
      }else if(currentScale == 0.5){
        this.cameras.main.setZoom(1.5);
        this.drinkText.destroy();
      }else if(currentScale == 1){
        this.cameras.main.setZoom(1.25);
      }
      this.physics.world.collide(this.p1, this.cookie, this.p1cookieCollision, null, this); //add physics for collision between player
      this.physics.world.collide(this.p1, this.drink, this.p1drinkCollision,null, this);    //and objects in the game
      this.physics.world.overlap(this.p1, this.door, this.atDoor, null, this);

      if(textVent5){                                                          //conditions if true for text bubble door
        this.doorText.setVisible(true);
      }else{
        this.doorText.setVisible(false);
      }
    }
    
    p1cookieCollision(){                                                    //called when p1 collides into the cookie object
      this.cookie.destroy();
      cookieObtained = true;                                                //sets variable to true to enable future use
      this.eatText.setVisible(true);
      //console.log(cookieObtained);
    }
    p1drinkCollision(){                                                     //called when p1 collides into the drink object
      this.drink.destroy();
      drinkObtained = true;                                                 //sets variable to true to enable future use
      this.drinkText.setVisible(true);
      //console.log(drinkObtained);
    }
    atDoor(){                                                               //called when p1 collides into the door object
      if(cursors.up.isDown && this.p1.body.onFloor() && currentScale == 1){ //can only transition if the player is the right size
        this.scene.start('levelTwoIntroScene');
        this.doorText.setVisible(false);
      }
    }
    puzzleSolver(){
      switch(drugsTaken)
      {
        case 7:   this.hint.setFrame(1);
          break;
        case 10:  this.hint.setFrame(2); 
          break;
        case 15:  this.hint.setFrame(3);
          break;      
        default:
          break;
      }
    }
}    