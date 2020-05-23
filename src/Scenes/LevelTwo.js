class LevelTwo extends Phaser.Scene{
  constructor(){
          super('levelTwoScene');
  }

  preload(){
      this.load.image('bigBox','./assets/Tiles/heavyObstacleLarge.png');          //load all assets used in Level 2
      this.load.image('medBox','./assets/Tiles/heavyObstacleMedium.png');
      this.load.image('smallBox','./assets/Tiles/smallObstacle.png');
      this.load.image('tiles','./assets/Tiles/initialTileSheetPlatform.png');
      this.load.tilemapTiledJSON('map2','./assets/TileMaps/level2.json');
      this.load.spritesheet('button','./assets/buttonSpriteSheet.png',{frameWidth:32, frameHeight: 32, startFrame: 0 ,endFrame: 1});
      this.load.spritesheet('door', './assets/doorAnimation/doorOpening.png',{frameWidth: 32, frameHeight: 32, startFrame:0 , endFrame: 4});
      this.load.spritesheet('playerIdle','./assets/Alice_Standing/initialAliceStandingMedium.png',{frameWidth: 23, frameHeight: 61, startFrame: 0, endFrame: 1});
      this.load.spritesheet('playerJump','./assets/Alice_Jumping/initialAliceJumpMedium.png',{frameWidth: 37, frameHeight: 61, startFrame: 0, endFrame: 6});
      this.load.spritesheet('playerWalk','./assets/Alice_Walking/initialAliceWalking.png',{frameWidth:28, frameHeight: 61, startFrame:0, endFrame: 5})
    }
  create(){
      drugsTaken = 0;
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    //reserve variables for key inputs
      keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
      cursors = this.input.keyboard.createCursorKeys();                               //reserve arrow keys for movement
      //add in level 2 tilemap and sets collision for tilemap
      const map2 = this.make.tilemap({key: 'map2'});
      const tileset2 = map2.addTilesetImage('ScaleDistortionGameTileset','tiles',32,32,0,0);
      const platforms2 = map2.createStaticLayer('Platforms',tileset2,0,0);
      platforms2.setCollisionByProperty({collides: true});
      //add in door object and create its animation(currently broken)
      this.door = new Door(this, 800, 448,'door').setOrigin(0.5);
      this.anims.create({
        key: 'doorOpen',
        frames: this.anims.generateFrameNumbers('door', {start: 0, end: 13, first: 0}),
        frameRate: 12
      });
      //creating a zone for a door to play animation
      Doorzone = this.add.zone(800, 448).setSize(64, 64).setOrigin(0.5);    
      this.physics.world.enable(Doorzone);
      Doorzone.body.setAllowGravity(false);
      Doorzone.body.moves = false;      
      //create small button object and add collision between the button and map
      this.button1 = new Button(this,380,475,'button').setOrigin(0.5);
      this.physics.add.collider(this.button1,platforms2);
      buttonzone1 = this.add.zone(380, 465).setSize(32, 32).setOrigin(0.5);
      this.physics.world.enable(buttonzone1);
      buttonzone1.body.setAllowGravity(false);
      buttonzone1.body.moves = false;
      //create large button object and add collision between the button and map
      this.button2 = new Button(this,660,450,'button').setOrigin(0.5).setScale(2);
      this.physics.add.collider(this.button2,platforms2);
      buttonzone2 = this.add.zone(660, 450).setSize(64, 64).setOrigin(0.5);
      this.physics.world.enable(buttonzone2);
      buttonzone2.body.setAllowGravity(false);
      buttonzone2.body.moves = false;
      //add small and medium box objects
      this.smallBox = new Box(this, 310,475,'smallBox').setOrigin(0.5);
      this.medBox = new Box(this,550,445,'medBox').setOrigin(0.5);
      //add in player object and its animations(sizeUp animations not working)
      this.p1 = new Player(this, 110, 475,'playerIdle').setOrigin(0.5,1);
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
      this.physics.add.collider(this.p1, platforms2);
      this.physics.add.collider(this.door,platforms2);
      this.physics.add.collider(this.smallBox, platforms2);
      this.physics.add.collider(this.medBox, platforms2);
      //instantiate physics between player and boxes
      this.physics.add.collider(this.p1, this.smallBox);
      this.physics.add.collider(this.p1, this.medBox, this.checkSize, null, this);  //checks if player is big enough to push box
      //creates zones on door to play doorOpening Animation
      this.physics.add.overlap(this.p1, Doorzone);
      Doorzone.on('enterDzone', () => this.anims.play('doorOpen', this.door));
      Doorzone.on('leaveDzone', () => this.door.setFrame(0));
      //creates zones on buttons to play buttonDown Animation 
      this.physics.add.overlap(this.smallBox, buttonzone1);
      buttonzone1.on('enterzone1', () => onButton1 = true);
      buttonzone1.on('leavezone1', () => onButton1 = false);
      this.physics.add.overlap(this.medBox, buttonzone2);
      buttonzone2.on('enterzone2', () => onButton2 = true);
      buttonzone2.on('leavezone2', () => onButton2 = false);
      
      this.cameras.main.setBounds(0, 0, 896, 512);
      this.cameras.main.setZoom(1.25);
      this.cameras.main.startFollow(this.p1);
  }

  update(){
    this.p1.update();                                                                 //calls player update for controls
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
    this.physics.world.collide(this.p1, this.smallBox, this.pickUpBox, null, this);   
    //attempt at collision between player picking up box(not implemented yet) 
    if(pickedUpBox == true && Phaser.Input.Keyboard.JustDown(keySPACE)){
      //this.physics.world.collide(this.platforms2, this.smallBox, null, this);
      this.Box = new Box(this,this.p1.x,this.p1.y-20,'smallBox').setOrigin(0.5,1);
      pickedUpBox = false;
    }
    //first button zone variables for entry and leaving
    let touching1 = buttonzone1.body.touching;
    let wasTouching1 = buttonzone1.body.wasTouching;  
    if (touching1.none && !wasTouching1.none) {
      buttonzone1.emit('leavezone1');
    }
    else if (!touching1.none && wasTouching1.none) {
      buttonzone1.emit('enterzone1');
    }
    //sets first button to buttonDown frame if box is on button
    if(onButton1 == true){
      this.button1.setFrame(1);
    }else{
      this.button1.setFrame(0);
    }
    //second button zone variables for entry and leaving
    let touching2 = buttonzone2.body.touching;
    let wasTouching2 = buttonzone2.body.wasTouching;  
    if (touching2.none && !wasTouching2.none) {
      buttonzone2.emit('leavezone2');
    } else if (!touching2.none && wasTouching2.none) {
        buttonzone2.emit('enterzone2');
    }
    //sets first button to buttonDown frame is box is on button
    if(onButton2 == true){
      this.button2.setFrame(1);
    }else
      this.button2.setFrame(0);
    if(onButton1 == true && onButton2 == true){
      let Dtouching = Doorzone.body.touching;                                //reserve variables for overlapping door
      let DwasTouching = Doorzone.body.wasTouching;                                   
      if (Dtouching.none && !DwasTouching.none) {                             //if not touching door, set to leavezone                    
        Doorzone.emit('leaveDzone');
      }
      else if (!Dtouching.none && DwasTouching.none) {                        //else if touching, set to enterzone
        Doorzone.emit('enterDzone');
      }     
    }
  }
  //attempt at picking up a box if the player is overlapping(not implemented yet)    
  pickUpBox(p1,smallBox){
    if(Phaser.Input.Keyboard.JustDown(keySPACE)){
      smallBox.destroy();
      //animation to pickup box
      pickedUpBox = true;
    } 
  }
  //door collision only allowed to continue if both buttons are pressed
  atDoor(){
    if(onButton1 == true && onButton2 == true  && currentScale == 1){
      if(cursors.up.isDown && this.p1.body.onFloor()){
        this.scene.start('levelThreeScene');
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
      case 7:   let text1 = this.add.text(centerX,centerY - textSpacer, 'P___ _h_ B___s',{ fontSize: '22px', color: '#8B0000' }).setOrigin(0.5);
                let text2 = this.add.text(centerX,centerY, '_n b___o_ __ _p__ _o__',{ fontSize: '22px', color: '#8B0000' }).setOrigin(0.5);
                text1.alpha = 0.2;
                text2.alpha = 0.2; 
        break;
      case 10:  let text3 = this.add.text(centerX,centerY - textSpacer, '_u__ __e _o___',{ fontSize: '22px', color: '#8B0000' }).setOrigin(0.5);
                let text4 = this.add.text(centerX,centerY, '__ __t__n t_ ___n __or',{ fontSize: '22px', color: '#8B0000' }).setOrigin(0.5);
                text3.alpha = 0.5;
                text4.alpha = 0.5;
        break;
      case 15:  let text5 = this.add.text(centerX,centerY - textSpacer, '__sh t__ __xe_',{ fontSize: '22px', color: '#8B0000' }).setOrigin(0.5);
                let text6 = this.add.text(centerX,centerY, 'o_ _u_to_ _o o_e_ D___',{ fontSize: '22px', color: '#8B0000' }).setOrigin(0.5);
                text5.alpha = 0.7;
                text6.alpha = 0.7;
        break;      
      default:
        break;
    }
  }
}    
