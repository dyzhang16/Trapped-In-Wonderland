class LevelThree extends Phaser.Scene{
    constructor(){
            super('levelThreeScene');
    }
  
    preload(){          
    }
    create(){
        //add soundFX for eating drinking and door
        this.scaleUp = this.sound.add('ScaleUp',{volume: 0.1});                                      
        this.scaleDown = this.sound.add('ScaleDown',{volume: 0.1});
        this.doorSound = this.sound.add('doorOpening',{volume: 0.3}); 
        //resize game window since level is more vertically focused                                   
        game.scale.resize(512,512);
        //reserve variables for key inputs
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //reserve arrow keys for movement
        cursors = this.input.keyboard.createCursorKeys();
        //add background and hints                               
        let background = this.add.tileSprite(0,0,512,960,'level3Background').setOrigin(0,0);
        this.hint = this.add.image(0,0,'level3Hint').setOrigin(0,0);
        //add in level 2 tilemap and sets collision for tilemap
        const map3 = this.make.tilemap({key: 'map3'});
        const tileset3 = map3.addTilesetImage('ScaleDistortionGameTileset','tiles',32,32,0,0);
        const platforms3 = map3.createStaticLayer('Platforms',tileset3,0,0).setOrigin(0.5);
        platforms3.setCollisionByProperty({collides: true});
        //add in door object and and exit
        this.door = new Door(this, 438, 896,'door').setOrigin(0.5);
        this.exit = new DoorIndicator(this, 438, 846, 'exitSign').setOrigin(0.5);
        //create large button object and add collision between the button and map
        this.button = new Button(this,359,896,'button').setOrigin(0.5).setScale(2);
        //add medium box object
        this.medBox = new Box(this, 140, 100,'medBox').setOrigin(0.5);  
        //creating a zone for the vent area to set variable
        this.ventZone1 = new Zone(this, 220, 882, 105, 50).setOrigin(0,0);     
        this.ventZone2 = new Zone(this, 157, 350, 35, 35).setOrigin(0,0);    
        //creating a zone for button to set variable
        this.largeButtonZone = new Zone(this, 359, 896, 64, 64).setOrigin(0.5);
        //add in player object 
        this.p1 = new Player(this, 140, 920,'playerIdle').setOrigin(0.5,1);
        //instantiate physics between objects and map
        this.physics.add.collider(this.p1, platforms3);
        this.physics.add.collider(this.door,platforms3);
        this.physics.add.collider(this.medBox, platforms3);
        this.physics.add.collider(this.button,platforms3);
        //instantiate physics between player and boxes
        this.physics.add.collider(this.p1, this.medBox, this.checkSize, null, this);  //checks if player is big enough to push box
        //sets variables for when player enters and leaves ventZones
        this.physics.add.overlap(this.p1, this.ventZone1);                        
        this.ventZone1.on('enterzone', () => inSmallVent = true);                      
        this.ventZone1.on('leavezone', () => inSmallVent = false);
        this.physics.add.overlap(this.p1, this.ventZone2);                         
        this.ventZone2.on('enterzone', () => inSmallVent = true);                     
        this.ventZone2.on('leavezone', () => inSmallVent = false);       
        //set variables for when box enters and leaves Zones 
        this.physics.add.overlap(this.medBox, this.largeButtonZone);
        this.largeButtonZone.on('enterzone', () => buttonPressed1 = true);
        this.largeButtonZone.on('leavezone', () => buttonPressed1 = false);
        //adds camera to came with the bounds and map and follows the player
        this.cameras.main.setBounds(0, 0, 512, 960);
        this.cameras.roundPixels = true; 
        this.cameras.main.startFollow(this.p1);
    }
    update(){
      this.p1.update();                                                                   //calls player update for controls
      this.ventZone1.update();                                                            //calls Zone Update()
      this.ventZone2.update();
      this.largeButtonZone.update();
      //restart mechanic, by pressing 'R'
      if(Phaser.Input.Keyboard.JustDown(keyR)){
        this.scene.start('levelThreeIntroScene');
      }
      //camera zoom changes based on scale of character
      if(currentScale == 2){
        this.cameras.main.setZoom(1);
      }else if(currentScale == 0.5){
        this.cameras.main.setZoom(1.5);
      }else if(currentScale == 1){
        this.cameras.main.setZoom(1.25);
      }
      //gradually reveals more hints about how to solve the map the more drugs the player takes
      this.puzzleSolver();
      //instantiate physics between player and objects
      this.physics.world.collide(this.p1, this.door, this.atDoor, null, this);          
      //sets button down and exit to open when box is on button
      if(buttonPressed1){ 
        this.exit.setFrame(1);
        this.button.setFrame(1);
      }else { 
        this.button.setFrame(0);
        this.exit.setFrame(0); 
      }
      //(plays door animation and door Opening SoundFX)
      if(!buttonPressed1){
          this.anims.play('doorOpen', this.door);
          this.doorSound.play();                                       
        }       
    }
    //door collision 
    atDoor(){
      if(buttonPressed1 && currentScale == 1){ //only able to progress when the large button is down, normal size, body is on the ground and pressing the up arrow key
        if(cursors.up.isDown && this.p1.body.onFloor()){
          this.scene.start('levelFourIntroScene');
        }
      }  
    }
    //checks if player is the right size to move the box, else sets the box to immovable
    checkSize(p1,Box){
      if(currentScale < 2){
        Box.setImmovable();
      }else{
        Box.setImmovable(false);
      }
    }
    //gradually reveals more hints the more times a player takes a drug
    puzzleSolver(){
      switch(drugsTaken)
      {
        case 20:  this.hint.setFrame(1); 
          break;
        case 25:  this.hint.setFrame(2);
          break;
        case 30:  this.hint.setFrame(3);
          break;      
        default:
          break;
      }
    }
  }    