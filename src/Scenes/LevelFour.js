class LevelFour extends Phaser.Scene{
    constructor(){
            super('levelFourScene');
    }
  
    preload(){                                                                   
        this.load.image('medBox','./assets/Tiles/heavyObstacleMedium.png');                         //load all assets used in Level 4
        this.load.image('smallBox','./assets/Tiles/smallObstacle.png');
        this.load.image('tiles','./assets/Tiles/initialTileSheetPlatform.png');
        this.load.tilemapTiledJSON('map4','./assets/TileMaps/level4.json');
        this.load.spritesheet('button','./assets/buttonSpriteSheet.png',{frameWidth:32, frameHeight: 32, startFrame: 0 ,endFrame: 1});
        this.load.spritesheet('door', './assets/doorAnimation/doorOpening.png',{frameWidth: 32, frameHeight: 32, startFrame:0 , endFrame: 4});
        this.load.spritesheet('exitSign','./assets/doorAnimation/doorIndicator1.png',{frameWidth: 16, frameHeight: 16, startFrame:0 , endFrame: 1});
        this.load.spritesheet('playerIdle','./assets/Alice_Standing/initialAliceStandingMedium.png',{frameWidth: 23, frameHeight: 61, startFrame: 0, endFrame: 1});
        this.load.spritesheet('playerJump','./assets/Alice_Jumping/initialAliceJumpMedium.png',{frameWidth: 37, frameHeight: 61, startFrame: 0, endFrame: 6});
        this.load.spritesheet('playerWalk','./assets/Alice_Walking/initialAliceWalking.png',{frameWidth:28, frameHeight: 61, startFrame:0, endFrame: 5})
      }
    create(){
        drugsTaken = 0;
        onButton1 = false;
        game.scale.resize(1280,640);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    //reserve variables for key inputs
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        cursors = this.input.keyboard.createCursorKeys();                               //reserve arrow keys for movement
        //add in level 2 tilemap and sets collision for tilemap
        const map4 = this.make.tilemap({key: 'map4'});
        const tileset4 = map4.addTilesetImage('ScaleDistortionGameTileset','tiles',32,32,0,0);
        const platforms4 = map4.createStaticLayer('Platforms',tileset4,0,0).setOrigin(0.5);
        platforms4.setCollisionByProperty({collides: true});
        //add in door object and create its animation(currently broken)
        this.door = new Door(this, 300, 225,'door').setOrigin(0.5);
        this.exit = new DoorIndicator(this, 300, 175, 'exitSign').setOrigin(0.5);
        this.anims.create({
          key: 'doorOpen',
          frames: this.anims.generateFrameNumbers('door', {start: 0, end: 13, first: 0}),
          frameRate: 12
        });
        //creating a zone for a door to play animation
        /*Doorzone = this.add.zone(438, 896).setSize(64, 64).setOrigin(0.5);    
        this.physics.world.enable(Doorzone);
        Doorzone.body.setAllowGravity(false);
        Doorzone.body.moves = false;      
        //creating a zone for the vent area where the player cannot scale up
        Ventzone = this.add.zone(220, 850).setSize(105, 100).setOrigin(0,0);   
        this.physics.world.enable(Ventzone);
        Ventzone.body.setAllowGravity(false);
        Ventzone.body.moves = false;*/      
        //create large button object and add collision between the button and map
        this.largeButton1 = new Button(this,200,225,'button').setOrigin(0.5).setScale(2);
        this.physics.add.collider(this.largeButton1,platforms4);
        buttonzone1 = this.add.zone(200, 225).setSize(64, 64).setOrigin(0.5);
        this.physics.world.enable(buttonzone1);
        buttonzone1.body.setAllowGravity(false);
        buttonzone1.body.moves = false;
        
        this.smallButton = new Button(this,250, 496,'button').setOrigin(0.5);
        this.physics.add.collider(this.smallButton,platforms4);
        buttonzone2 = this.add.zone(250, 496).setSize(32, 32).setOrigin(0.5);
        this.physics.world.enable(buttonzone2);
        buttonzone2.body.setAllowGravity(false);
        buttonzone2.body.moves = false;
        
        this.largeButton2 = new Button(this,775,480,'button').setOrigin(0.5).setScale(2);
        this.physics.add.collider(this.largeButton2,platforms4);
        buttonzone3 = this.add.zone(775, 480).setSize(64, 64).setOrigin(0.5);
        this.physics.world.enable(buttonzone3);
        buttonzone3.body.setAllowGravity(false);
        buttonzone3.body.moves = false;
        //add small and medium box objects
        this.smallBox1 = new Box(this, 500, 110,'smallBox').setOrigin(0.5);
        this.smallBox2 = new Box(this, 1000, 120,'smallBox').setOrigin(0.5);
        this.smallBox3 = new Box(this, 790, 280,'smallBox').setOrigin(0.5);
        this.medBox = new Box(this, 720, 255,'medBox').setOrigin(0.5);
        //add in player object and its animations(sizeUp animations not working)
        this.p1 = new Player(this, 80, 260,'playerIdle').setOrigin(0.5,1);
        this.anims.create({                                 //basic movement animation
          key: 'p1Idle',
          repeat: -1,
          frames: this.anims.generateFrameNumbers('playerIdle', {start: 0, end: 1, first: 0}),
          frameRate: 30
        });
        this.anims.create({                                 //basic movement animation
          key: 'p1Walk',
          repeat: -1,
          frames: this.anims.generateFrameNumbers('playerWalk', {start: 0, end: 5, first: 0}),
          frameRate: 24
        });
        this.anims.create({                                 //basic movement animation
          key: 'p1Jump',
          frames: this.anims.generateFrameNumbers('playerJump', {start: 0, end: 4, first: 0}),
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
        this.physics.add.collider(this.p1, platforms4);
        this.physics.add.collider(this.door,platforms4);
        this.physics.add.collider(this.medBox, platforms4);
        this.physics.add.collider(this.smallBox1, platforms4);
        this.physics.add.collider(this.smallBox2, platforms4);
        this.physics.add.collider(this.smallBox3, platforms4);
        //instantiate physics between player and boxes
        this.physics.add.collider(this.p1, this.smallBox1);
        this.physics.add.collider(this.p1, this.smallBox2);
        this.physics.add.collider(this.p1, this.smallBox3);
        this.physics.add.collider(this.p1, this.medBox, this.checkSize, null, this);  //checks if player is big enough to push box
        //creates zones on door to play doorOpening Animation
        /*this.physics.add.overlap(this.p1, Doorzone);
        Doorzone.on('enterDzone', () => this.anims.play('doorOpen', this.door));
        Doorzone.on('leaveDzone', () => this.door.setFrame(0));
        //create zone for Vent
        this.physics.add.overlap(this.p1, Ventzone);                         //if player overlaps with ventzone
        Ventzone.on('enterVzone', () => inVent = true);                      //on entering zone, set to true
        Ventzone.on('leaveVzone', () => inVent = false);     
        //creates zones on buttons to play buttonDown Animation 
        this.physics.add.overlap(this.medBox, buttonzone1);
        buttonzone1.on('enterbzone', () => onButton1 = true);
        buttonzone1.on('leavebzone', () => onButton1 = false);*/

        //console.log(onButton1);
        //this.cameras.main.setBounds(0, 0, 1280, 960);
        //this.cameras.main.setZoom(1.25);
        //this.cameras.main.startFollow(this.p1);
    }
  
    update(){
      this.p1.update();                                                                   //calls player update for controls
      
      /*if(currentScale == 2){
        this.cameras.main.setZoom(1);
      }else if(currentScale == 0.5){
        this.cameras.main.setZoom(1.5);
      }else if(currentScale == 1){
        this.cameras.main.setZoom(1.25);
      }*/
      //instructions to solve puzzle(letters appear the more drugs are taken)
      //this.puzzleSolver();
      this.physics.world.collide(this.p1, this.door, this.atDoor, null, this);          //instantiate physics between player and door
      //this.physics.world.collide(this.p1, this.smallBox, this.pickUpBox, null, this);   
      //attempt at collision between player picking up box(not implemented yet) 
      /*if(pickedUpBox == true && Phaser.Input.Keyboard.JustDown(keySPACE)){
        //this.physics.world.collide(this.platforms2, this.smallBox, null, this);
        this.Box = new Box(this,this.p1.x,this.p1.y-20,'smallBox').setOrigin(0.5,1);
        pickedUpBox = false;
      }*/
      /*let Vtouching = Ventzone.body.touching;                                //reserve variables for overlapping vent
      let VwasTouching = Ventzone.body.wasTouching;                                   
      if (Vtouching.none && !VwasTouching.none) {                             //if not touching vent, set to leavezone                    
        Ventzone.emit('leaveVzone');
      }
      else if (!Vtouching.none && VwasTouching.none) {                        //else if touching, set to enterzone
        Ventzone.emit('enterVzone');
      }*/
    /*  //second button zone variables for entry and leaving  
      let btouching = buttonzone1.body.touching;
      let bwasTouching = buttonzone1.body.wasTouching;  
      if (btouching.none && !bwasTouching.none) {
        buttonzone1.emit('leavebzone');
      } else if (!btouching.none && bwasTouching.none) {
          buttonzone1.emit('enterbzone');
      }/*
      //sets first button to buttonDown frame is box is on button
    /*  if(onButton1 == true){ 
        this.exit.setFrame(1);
        this.button.setFrame(1);
        let Dtouching = Doorzone.body.touching;                                //reserve variables for overlapping door
        let DwasTouching = Doorzone.body.wasTouching;                                   
        if (Dtouching.none && !DwasTouching.none) {                             //if not touching door, set to leavezone                    
          Doorzone.emit('leaveDzone');
        }
        else if (!Dtouching.none && DwasTouching.none) {                        //else if touching, set to enterzone
          Doorzone.emit('enterDzone');
        }
      }else
        this.button.setFrame(0);*/     
    }
    //attempt at picking up a box if the player is overlapping(not implemented yet)    
    /*pickUpBox(p1,smallBox){
      if(Phaser.Input.Keyboard.JustDown(keySPACE)){
        smallBox.destroy();
        //animation to pickup box
        pickedUpBox = true;
      } 
    }*/
    //door collision only allowed to continue if both buttons are pressed
    atDoor(){
      if(onButton1 == true && onButton2 == true && onButton3 == true && currentScale == 1){
        if(cursors.up.isDown && this.p1.body.onFloor()){
          this.scene.start('creditScene');
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
    /*puzzleSolver(){
      switch(drugsTaken)
      {
        case 7:   let text1 = this.add.text(400,700, 'S_a__ _p',{ fontSize: '20px', color: '#8B0000' }).setOrigin(0.5);
                  let text2 = this.add.text(400,700 + textSpacer, '_ _o U__',{ fontSize: '20px', color: '#8B0000' }).setOrigin(0.5);
                  text1.alpha = 0.2;
                  text2.alpha = 0.2; 
          break;
        case 10:  let text3 = this.add.text(400,700, '___l_ U_',{ fontSize: '20px', color: '#8B0000' }).setOrigin(0.5);
                  let text4 = this.add.text(400,700 + textSpacer, '& __ __!',{ fontSize: '20px', color: '#8B0000' }).setOrigin(0.5);
                  text3.alpha = 0.5;
                  text4.alpha = 0.5;
          break;
        case 15:  let text5 = this.add.text(400,700, '_c__e __',{ fontSize: '20px', color: '#8B0000' }).setOrigin(0.5);
                  let text6 = this.add.text(400,700 + textSpacer, '_ G_ _p_',{ fontSize: '20px', color: '#8B0000' }).setOrigin(0.5);
                  text5.alpha = 0.7;
                  text6.alpha = 0.7;
          break;      
        default:
          break;
      }
    }*/
}
    