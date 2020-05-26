class LevelThree extends Phaser.Scene{
    constructor(){
            super('levelThreeScene');
    }
  
    preload(){
        //this.load.image('bigBox','./assets/Tiles/heavyObstacleLarge.png');          //load all assets used in Level 3
        this.load.image('medBox','./assets/Tiles/heavyObstacleMedium.png');
        this.load.image('smallBox','./assets/Tiles/smallObstacle.png');
        this.load.image('tiles','./assets/Tiles/initialTileSheetPlatform.png');
        this.load.tilemapTiledJSON('map3','./assets/TileMaps/level3.json');
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
        game.scale.resize(512,512);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    //reserve variables for key inputs
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        cursors = this.input.keyboard.createCursorKeys();                               //reserve arrow keys for movement
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
        //creating a zone for a door to play animation
        Doorzone = this.add.zone(438, 896).setSize(64, 64).setOrigin(0.5);    
        this.physics.world.enable(Doorzone);
        Doorzone.body.setAllowGravity(false);
        Doorzone.body.moves = false;      
        //creating a zone for the vent area where the player cannot scale up
        Ventzone1 = this.add.zone(220, 882).setSize(105, 50).setOrigin(0,0);   
        this.physics.world.enable(Ventzone1);
        Ventzone1.body.setAllowGravity(false);
        Ventzone1.body.moves = false;   
        //creating a zone for the vent area where the player cannot scale up
        Ventzone2 = this.add.zone(157, 350).setSize(35, 35).setOrigin(0,0);   
        this.physics.world.enable(Ventzone2);
        Ventzone2.body.setAllowGravity(false);
        Ventzone2.body.moves = false;               
        //create large button object and add collision between the button and map
        this.button = new Button(this,359,896,'button').setOrigin(0.5).setScale(2);
        this.physics.add.collider(this.button,platforms3);
        buttonzone1 = this.add.zone(359, 896).setSize(64, 64).setOrigin(0.5);
        this.physics.world.enable(buttonzone1);
        buttonzone1.body.setAllowGravity(false);
        buttonzone1.body.moves = false;
        //add small and medium box objects
        this.medBox = new Box(this, 140, 100,'medBox').setOrigin(0.5);
        //add in player object and its animations(sizeUp animations not working)
        this.p1 = new Player(this, 140, 920,'playerIdle').setOrigin(0.5,1);
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
        this.physics.add.collider(this.p1, platforms3);
        this.physics.add.collider(this.door,platforms3);
        this.physics.add.collider(this.medBox, platforms3);
        //instantiate physics between player and boxes
        this.physics.add.collider(this.p1, this.medBox, this.checkSize, null, this);  //checks if player is big enough to push box
        //creates zones on door to play doorOpening Animation
        this.physics.add.overlap(this.p1, Doorzone);
        Doorzone.on('enterDzone', () => this.anims.play('doorOpen', this.door));
        Doorzone.on('leaveDzone', () => this.door.setFrame(0));
        //create zone for Vent
        this.physics.add.overlap(this.p1, Ventzone1);                         //if player overlaps with ventzone
        Ventzone1.on('enterVzone', () => inSmallVent = true);                      //on entering zone, set to true
        Ventzone1.on('leaveVzone', () => inSmallVent = false);

        this.physics.add.overlap(this.p1, Ventzone2);                         //if player overlaps with ventzone
        Ventzone2.on('enterV2zone', () => inSmallVent = true);                      //on entering zone, set to true
        Ventzone2.on('leaveV2zone', () => inSmallVent = false);       
        //creates zones on buttons to play buttonDown Animation 
        this.physics.add.overlap(this.medBox, buttonzone1);
        buttonzone1.on('enterbzone', () => onButton1 = true);
        buttonzone1.on('leavebzone', () => onButton1 = false);

        //console.log(onButton1);
        this.cameras.main.setBounds(0, 0, 512, 960);
        this.cameras.main.setZoom(1.25);
        this.cameras.main.startFollow(this.p1);
    }
  
    update(){
      this.p1.update();                                                                   //calls player update for controls
      this.puzzleSolver();
      if(currentScale == 2){
        this.cameras.main.setZoom(1);
      }else if(currentScale == 0.5){
        this.cameras.main.setZoom(1.5);
      }else if(currentScale == 1){
        this.cameras.main.setZoom(1.25);
      }
      //instructions to solve puzzle(letters appear the more drugs are taken)
      
      this.physics.world.collide(this.p1, this.door, this.atDoor, null, this);          //instantiate physics between player and door
      //this.physics.world.collide(this.p1, this.smallBox, this.pickUpBox, null, this);   
      //attempt at collision between player picking up box(not implemented yet) 
      /*if(pickedUpBox == true && Phaser.Input.Keyboard.JustDown(keySPACE)){
        //this.physics.world.collide(this.platforms2, this.smallBox, null, this);
        this.Box = new Box(this,this.p1.x,this.p1.y-20,'smallBox').setOrigin(0.5,1);
        pickedUpBox = false;
      }*/
      let Vtouching = Ventzone1.body.touching;                                //reserve variables for overlapping vent
      let VwasTouching = Ventzone1.body.wasTouching;                                   
      if (Vtouching.none && !VwasTouching.none) {                             //if not touching vent, set to leavezone                    
        Ventzone1.emit('leaveVzone');
      }
      else if (!Vtouching.none && VwasTouching.none) {                        //else if touching, set to enterzone
        Ventzone1.emit('enterVzone');
      }

      let V2touching = Ventzone2.body.touching;                                //reserve variables for overlapping vent
      let V2wasTouching = Ventzone2.body.wasTouching;                                   
      if (V2touching.none && !V2wasTouching.none) {                             //if not touching vent, set to leavezone                    
        Ventzone2.emit('leaveV2zone');
      }
      else if (!V2touching.none && V2wasTouching.none) {                        //else if touching, set to enterzone
        Ventzone2.emit('enterV2zone');
      }
      //second button zone variables for entry and leaving  
      let btouching = buttonzone1.body.touching;
      let bwasTouching = buttonzone1.body.wasTouching;  
      if (btouching.none && !bwasTouching.none) {
        buttonzone1.emit('leavebzone');
      } else if (!btouching.none && bwasTouching.none) {
          buttonzone1.emit('enterbzone');
      }
      //sets first button to buttonDown frame is box is on button
      if(onButton1 == true){ 
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
        this.button.setFrame(0);     
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
      if(onButton1 == true && currentScale == 1){
        if(cursors.up.isDown && this.p1.body.onFloor()){
          this.scene.start('levelFourScene');
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
    }
  }    