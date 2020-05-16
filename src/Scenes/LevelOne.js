class LevelOne extends Phaser.Scene{
    constructor(){
            super('levelOneScene');
    }

    preload(){
        this.load.image('bigBox','./assets/Tiles/heavyObstacleLarge.png');
        this.load.image('medBox','./assets/Tiles/heavyObstacleMedium.png');
        this.load.image('smallBox','./assets/Tiles/smallObstacle.png');
        this.load.image('cookie','./assets/initialEatMe.png');
        this.load.image('drink','./assets/initialDrinkMe.png');
        this.load.image('tiles','./assets/Tiles/spritesheet.png');
        this.load.tilemapTiledJSON('map1','./assets/TileMaps/level1.json');
        this.load.spritesheet('door', './assets/doorAnimation/doorOpening.png',{frameWidth: 32, frameHeight: 32, startFrame:0 , endFrame: 4});
        this.load.spritesheet('playerIdle','./assets/Alice_Standing/initialAliceStandingMedium.png',{frameWidth: 23, frameHeight: 61, startFrame: 0, endFrame: 1});
        this.load.spritesheet('playerJump','./assets/Alice_Jumping/initialAliceJumpMedium.png',{frameWidth: 37, frameHeight: 61, startFrame: 0, endFrame: 6});
        this.load.spritesheet('playerWalk','./assets/Alice_Walking/initialAliceWalking.png',{frameWidth:28, frameHeight: 61, startFrame:0, endFrame: 5});
        this.load.spritesheet('playerSizeUp','./assets/initialAliceSizeUp.png',{frameWidth:46, frameHeight:122,startFrame:0, endFrame: 10 });
        this.load.spritesheet('playerSizeDown','./assets/initialAliceSizeUp.png',{frameWidth:66, frameHeight:122,startFrame:0, endFrame: 11 });
      }
    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        cursors = this.input.keyboard.createCursorKeys();
        this.add.text(centerX,centerY, 'Press E to Increase',{ fontSize: '22px', color: '#FFF' }).setOrigin(0.5);
        this.add.text(centerX,centerY- textSpacer, 'Press Q to Decrease',{ fontSize: '22px', color: '#FFF' }).setOrigin(0.5);
        
        const map1 = this.make.tilemap({key: 'map1'});
        const tileset1 = map1.addTilesetImage('level1','tiles',32,32,0,0);
        const platforms1 = map1.createStaticLayer('Platforms',tileset1,0,0);
        platforms1.setCollisionByProperty({collides: true});

        this.door1 = this.physics.add.group({
          allowGravity: false,
          immovable: true
        })
        const doorObject1 = map1.getObjectLayer('Door')['objects'];
        doorObject1.forEach(doorObject1 => {
        const door1 = this.door1.create(doorObject1.x, doorObject1.y, 'door').setOrigin(0,0).setScale(2);
        });
        this.anims.create({
          key: 'door',
          frames: this.anims.generateFrameNumbers('door', {start: 0, end: 4, first: 0}),
          frameRate: 12
        })

        Ventzone = this.add.zone(560, 300).setSize(155, 190).setOrigin(0,0);
        this.physics.world.enable(Ventzone);
        Ventzone.body.setAllowGravity(false);
        Ventzone.body.moves = false;
        
        this.p1 = new Player(this, 400, 100,'playerIdle').setOrigin(0.5,1); //bug with swapping different sized characters
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

        this.cookie = new Cookie(this, 350, 420,'cookie').setOrigin(0.5);
        this.drink = new Drink(this, 70, 300,'drink').setOrigin(0.5);

        this.physics.add.collider(this.p1, platforms1);
        this.physics.add.collider(this.cookie, platforms1);
        this.physics.add.collider(this.drink, platforms1);
        this.physics.add.overlap(this.p1, Ventzone);
        Ventzone.on('enterzone', () => inVent = true);
        Ventzone.on('leavezone', () => inVent = false);
    }
    update(){
      this.p1.update();
       //if(Phaser.Input.Keyboard.JustDown(keySPACE)){           //left Click transition to next scene
       //  this.scene.start('levelTwoScene');
       //}
      this.physics.world.collide(this.p1, this.cookie, this.p1cookieCollision, null, this); 
      this.physics.world.collide(this.p1, this.drink, this.p1drinkCollision,null, this);
      this.physics.world.collide(this.p1, this.door1, this.atDoor, null, this);
      
      let touching = Ventzone.body.touching;
      let wasTouching = Ventzone.body.wasTouching;  
      if (touching.none && !wasTouching.none) {
        Ventzone.emit('leavezone');
      }
      else if (!touching.none && wasTouching.none) {
        Ventzone.emit('enterzone');
      }
    }    
    p1cookieCollision(){
      this.cookie.destroy();
      cookieObtained = true;
      //console.log(cookieObtained);
    }
    p1drinkCollision(){
      this.drink.destroy();
      drinkObtained = true;
      //console.log(drinkObtained);
    }
    atDoor(){
      //this.anims.play('door');
      if(cursors.up.isDown && this.p1.body.onFloor() && currentScale == 1){
        this.scene.start('levelTwoScene');
      }
    }
}    