class LevelThree extends Phaser.Scene{
    constructor(){
            super('levelThreeScene');
    }
  
    preload(){          
    }
    create(){
        drugsTaken = 0;
        buttonPressed1 = false;
        this.scaleUp = this.sound.add('ScaleUp',{volume: 0.1});                                      //add soundFX for eating and drinking(not implemented yet)
        this.scaleDown = this.sound.add('ScaleDown',{volume: 0.1});
        this.doorSound = this.sound.add('doorOpening',{volume: 0.3});                                    
        game.scale.resize(512,512);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    //reserve variables for key inputs
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        cursors = this.input.keyboard.createCursorKeys();                               //reserve arrow keys for movement
        let background = this.add.tileSprite(0,0,512,960,'level3Background').setOrigin(0,0);
        this.hint = this.add.image(0,0,'level3Hint').setOrigin(0,0);
        //add in level 2 tilemap and sets collision for tilemap
        const map3 = this.make.tilemap({key: 'map3'});
        const tileset3 = map3.addTilesetImage('ScaleDistortionGameTileset','tiles',32,32,0,0);
        const platforms3 = map3.createStaticLayer('Platforms',tileset3,0,0).setOrigin(0.5);
        platforms3.setCollisionByProperty({collides: true});
        //add in door object and create its animation(currently broken)
        this.door = new Door(this, 438, 896,'door').setOrigin(0.5);
        this.exit = new DoorIndicator(this, 438, 846, 'exitSign').setOrigin(0.5);
        this.anims.create({
          key: 'doorOpen',
          frames: this.anims.generateFrameNumbers('door', {start: 0, end: 13, first: 0}),
          frameRate: 12
        });     
        //creating a zone for the vent area where the player cannot scale up
        this.Ventzone1 = new Zone(this, 220, 882, 105, 50).setOrigin(0,0);     
        this.Ventzone2 = new Zone(this, 157, 350, 35, 35).setOrigin(0,0);   
          
        //create large button object and add collision between the button and map
        this.button = new Button(this,359,896,'button').setOrigin(0.5).setScale(2);
        this.physics.add.collider(this.button,platforms3);
        this.buttonzone1 = new Zone(this, 359, 896, 64, 64).setOrigin(0.5);

        //add small and medium box objects
        this.medBox = new Box(this, 140, 100,'medBox').setOrigin(0.5);
        //add in player object and its animations(sizeUp animations not working)
        this.p1 = new Player(this, 140, 920,'playerIdle').setOrigin(0.5,1);
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
        //instantiate physics between objects and map
        this.physics.add.collider(this.p1, platforms3);
        this.physics.add.collider(this.door,platforms3);
        this.physics.add.collider(this.medBox, platforms3);
        //instantiate physics between player and boxes
        this.physics.add.collider(this.p1, this.medBox, this.checkSize, null, this);  //checks if player is big enough to push box

        //create zone for Vent
        this.physics.add.overlap(this.p1, this.Ventzone1);                         //if player overlaps with ventzone
        this.Ventzone1.on('enterzone', () => inSmallVent = true);                      //on entering zone, set to true
        this.Ventzone1.on('leavezone', () => inSmallVent = false);

        this.physics.add.overlap(this.p1, this.Ventzone2);                         //if player overlaps with ventzone
        this.Ventzone2.on('enterzone', () => inSmallVent = true);                      //on entering zone, set to true
        this.Ventzone2.on('leavezone', () => inSmallVent = false);       
        //creates zones on buttons to play buttonDown Animation 
        this.physics.add.overlap(this.medBox, this.buttonzone1);
        this.buttonzone1.on('enterzone', () => buttonPressed1 = true);
        this.buttonzone1.on('leavezone', () => buttonPressed1 = false);

        this.cameras.main.setBounds(0, 0, 512, 960);
        this.cameras.main.setZoom(1.25);
        this.cameras.main.startFollow(this.p1);
    }
  
    update(){
      this.p1.update();                                                                   //calls player update for controls
      this.buttonzone1.update();
      this.Ventzone1.update();
      this.Ventzone2.update();
      console.log(inSmallVent);
      if(Phaser.Input.Keyboard.JustDown(keyR)){
        this.scene.start('levelThreeIntroScene');
      }
      if(currentScale == 2){
        this.cameras.main.setZoom(1);
      }else if(currentScale == 0.5){
        this.cameras.main.setZoom(1.5);
      }else if(currentScale == 1){
        this.cameras.main.setZoom(1.25);
      }
      //instructions to solve puzzle(letters appear the more drugs are taken)
      this.puzzleSolver();
      this.physics.world.collide(this.p1, this.door, this.atDoor, null, this);          //instantiate physics between player and door
      //sets first button to buttonDown frame is box is on button
      if(buttonPressed1){ 
        this.exit.setFrame(1);
        this.button.setFrame(1);
      }else { 
        this.button.setFrame(0);
        this.exit.setFrame(0); 
      }
      if(!buttonPressed1){
          this.anims.play('doorOpen', this.door);
          this.doorSound.play();                                      //bugged drinking sound  
        }       
    }

    //door collision only allowed to continue if both buttons are pressed
    atDoor(){
      if(buttonPressed1 && currentScale == 1){
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
    puzzleSolver(){
      switch(drugsTaken)
      {
        case 15:  this.hint.setFrame(1); 
          break;
        case 20:  this.hint.setFrame(2);
          break;
        case 25:  this.hint.setFrame(3);
          break;      
        default:
          break;
      }
    }
  }    