class LevelTwo extends Phaser.Scene{
  constructor(){
          super('levelTwoScene');
  }

  preload(){
      this.load.image('bigBox','./assets/Tiles/heavyObstacleLarge.png');
      this.load.image('medBox','./assets/Tiles/heavyObstacleMedium.png');
      this.load.image('smallBox','./assets/Tiles/smallObstacle.png');
      this.load.image('cookie','./assets/tempGrowth.png');
      this.load.image('drink','./assets/tempShrink.png');
      this.load.image('tiles','./assets/Tiles/spritesheet.png');
      this.load.tilemapTiledJSON('map2','./assets/TileMaps/level2.json');
      this.load.spritesheet('button','./assets/buttonSpriteSheet.png',{frameWidth:32, frameHeight: 32, startFrame: 0 ,endFrame: 1});
      this.load.spritesheet('door', './assets/doorAnimation/doorOpening.png',{frameWidth: 32, frameHeight: 32, startFrame:0 , endFrame: 4});
      this.load.spritesheet('playerIdle','./assets/Alice_Standing/initialAliceStandingMedium.png',{frameWidth: 23, frameHeight: 61, startFrame: 0, endFrame: 1});
      this.load.spritesheet('playerJump','./assets/Alice_Jumping/initialAliceJumpMedium.png',{frameWidth: 37, frameHeight: 61, startFrame: 0, endFrame: 6});
      this.load.spritesheet('playerWalk','./assets/Alice_Walking/initialAliceWalking.png',{frameWidth:28, frameHeight: 61, startFrame:0, endFrame: 5})
    }
  create(){
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
      cursors = this.input.keyboard.createCursorKeys();
      this.add.text(centerX,centerY, 'Push the Boxes',{ fontSize: '22px', color: '#FFF' }).setOrigin(0.5);
      this.add.text(centerX,centerY + textSpacer, 'on button to open Door',{ fontSize: '22px', color: '#FFF' }).setOrigin(0.5);
      
      const map2 = this.make.tilemap({key: 'map2'});
      const tileset2 = map2.addTilesetImage('level2','tiles',32,32,0,0);
      const platforms2 = map2.createStaticLayer('Platforms',tileset2,0,0);
      platforms2.setCollisionByProperty({collides: true});

      this.door = new Door(this, 800, 448,'door').setOrigin(0.5).setScale(2);
      this.anims.create({
        key: 'door',
        frames: this.anims.generateFrameNumbers('door', {start: 0, end: 4, first: 0}),
        frameRate: 12
      });
      
      this.button1 = new Button(this,380,475,'button').setOrigin(0.5);
      this.physics.add.collider(this.button1,platforms2);
      buttonzone1 = this.add.zone(380, 465).setSize(32, 32).setOrigin(0.5);
      this.physics.world.enable(buttonzone1);
      buttonzone1.body.setAllowGravity(false);
      buttonzone1.body.moves = false;

      this.button2 = new Button(this,660,450,'button').setOrigin(0.5).setScale(2);
      this.physics.add.collider(this.button2,platforms2);
      buttonzone2 = this.add.zone(660, 450).setSize(64, 64).setOrigin(0.5);
      this.physics.world.enable(buttonzone2);
      buttonzone2.body.setAllowGravity(false);
      buttonzone2.body.moves = false;

      this.smallBox = new Box(this, 310,475,'smallBox').setOrigin(0.5);
      this.medBox = new Box(this,550,445,'medBox').setOrigin(0.5);

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
      
      this.physics.add.collider(this.p1, platforms2);
      this.physics.add.collider(this.door,platforms2);
      this.physics.add.collider(this.smallBox, platforms2);
      this.physics.add.collider(this.p1, this.smallBox);   
      this.physics.add.collider(this.medBox, platforms2);
      this.physics.add.collider(this.p1, this.medBox, this.checkSize, null, this);  
      
      this.physics.add.overlap(this.smallBox, buttonzone1);
      buttonzone1.on('enterzone1', () => onButton1 = true);
      buttonzone1.on('leavezone1', () => onButton1 = false);
      this.physics.add.overlap(this.medBox, buttonzone2);
      buttonzone2.on('enterzone2', () => onButton2 = true);
      buttonzone2.on('leavezone2', () => onButton2 = false);
  }

  update(){
    this.p1.update();
    this.physics.world.collide(this.p1, this.door, this.atDoor, null, this);
    this.physics.world.collide(this.p1, this.smallBox, this.pickUpBox, null, this);
      
    if(pickedUpBox == true && Phaser.Input.Keyboard.JustDown(keySPACE)){
      //this.physics.world.collide(this.platforms2, this.smallBox, null, this);
      this.Box = new Box(this,this.p1.x,this.p1.y-20,'smallBox').setOrigin(0.5,1);
      pickedUpBox = false;
    }

    let touching1 = buttonzone1.body.touching;
    let wasTouching1 = buttonzone1.body.wasTouching;  
    if (touching1.none && !wasTouching1.none) {
      buttonzone1.emit('leavezone1');
    }
    else if (!touching1.none && wasTouching1.none) {
      buttonzone1.emit('enterzone1');
    }
    if(onButton1 == true){
      this.button1.setFrame(1);
    }else{
      this.button1.setFrame(0);
    }

    let touching2 = buttonzone2.body.touching;
    let wasTouching2 = buttonzone2.body.wasTouching;  
    if (touching2.none && !wasTouching2.none) {
      buttonzone2.emit('leavezone2');
    } else if (!touching2.none && wasTouching2.none) {
        buttonzone2.emit('enterzone2');
    }
    if(onButton2 == true){
      this.button2.setFrame(1);
    }else
      this.button2.setFrame(0);  
  }    
  pickUpBox(p1,smallBox){
    if(Phaser.Input.Keyboard.JustDown(keySPACE)){
      smallBox.destroy();
      //animation to pickup box
      pickedUpBox = true;
    } 
  }
  atDoor(){
    if(onButton1 == true && onButton2 == true){
      //this.anims.play('door');
      if(cursors.up.isDown && this.p1.body.onFloor()){
        this.menumusic.stop();
        this.scene.start('creditScene');
      }
    }  
  }
  checkSize(p1,Box){
    if(currentScale < 2){
      Box.setImmovable();
    }else{
      Box.setImmovable(false);
    }
  }
}    
