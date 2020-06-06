class ExitLevel extends Phaser.Scene{
    constructor(){
            super('ExitLevelScene');
    }
  
    preload(){                                                                   
        //load all assets Level 5
        this.load.tilemapTiledJSON('map6','./assets/TileMaps/ExitLevel.json');
        //this.load.image('level5Background', './assets/Backgrounds/level5Background.png');
        this.load.spritesheet('button','./assets/Objects/buttonSpriteSheet.png',{frameWidth:32, frameHeight: 32, startFrame: 0 ,endFrame: 1});
        this.load.spritesheet('door', './assets/doorAnimation/doorOpening.png',{frameWidth: 64, frameHeight: 64, startFrame:0 , endFrame: 13});
        this.load.spritesheet('exitSign','./assets/doorAnimation/doorIndicator1.png',{frameWidth: 16, frameHeight: 16, startFrame:0 , endFrame: 1});
        this.load.spritesheet('glassExit', './assets/doorAnimation/escapeWindow.png',{frameWidth: 64, frameHeight: 64, startFrame:0 , endFrame: 5});
        this.load.spritesheet('playerIdle','./assets/AliceAnim/AliceV2Standing.png',{frameWidth: 30, frameHeight: 64, startFrame: 0, endFrame: 0});
        this.load.spritesheet('playerJump','./assets/AliceAnim/AliceV2Jump.png',{frameWidth: 30, frameHeight: 64, startFrame: 0, endFrame: 5});
        this.load.spritesheet('playerWalk','./assets/AliceAnim/AliceV2Walking.png',{frameWidth: 30, frameHeight: 64, startFrame:0, endFrame: 7});
        this.load.audio('ScaleUp','./assets/soundFX/ScaleUp.mp3');                 
        this.load.audio('ScaleDown','./assets/soundFX/ScaleDown.mp3');               
                 
      }
    create(){
        drugsTaken = 0;
        breakingglass = 0;
        this.scaleUp = this.sound.add('ScaleUp',{volume: 0.1});                                      //add soundFX for eating and drinking(not implemented yet)
        this.scaleDown = this.sound.add('ScaleDown',{volume: 0.1});                                      
        game.scale.resize(896,512);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    //reserve variables for key inputs
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        cursors = this.input.keyboard.createCursorKeys();                               //reserve arrow keys for movement
        
        //let background = this.add.tileSprite(0,0,1280,960,'level5Background').setOrigin(0,0);
        //add in level 2 tilemap and sets collision for tilemap
        //let background = this.add.tileSprite(0,0,1280,960,'level5Background').setOrigin(0,0);
        const map6 = this.make.tilemap({key: 'map6'});
        const tileset6 = map6.addTilesetImage('ScaleDistortionGameTileset','tiles',32,32,0,0);
        const platforms6 = map6.createStaticLayer('Platforms',tileset6,0,0).setOrigin(0.5);
        platforms6.setCollisionByProperty({collides: true});
        //add in door object and create its animation(currently broken)
        this.door = new Door(this, 700, 320,'door', 13).setOrigin(0.5);
        this.exit = new DoorIndicator(this, 700, 270, 'exitSign', 1).setOrigin(0.5);
        
        this.glassExit = new Door (this, 400, 290, 'glassExit', 0).setOrigin(0.5);
        //add in player object and its animations
        this.p1 = new Player(this, 120, 355,'playerIdle').setOrigin(0.5,1);
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
        this.physics.add.collider(this.p1, platforms6);
        this.physics.add.collider(this.door,platforms6);
        this.physics.add.collider(this.glassExit, platforms6);

        this.cameras.main.setBounds(0, 0, 896, 512);
        this.cameras.main.setZoom(1.25);
        this.cameras.main.startFollow(this.p1);
    }
  
    update(){
      this.p1.update();                                                                   //calls player update for controls
      
      if(Phaser.Input.Keyboard.JustDown(keyR)){
        this.scene.start('ExitLevelIntroScene');
      }
  
      if(currentScale == 2){
        this.cameras.main.setZoom(1);
      }else if(currentScale == 0.5){
        this.cameras.main.setZoom(1.5);
      }else if(currentScale == 1){
        this.cameras.main.setZoom(1.25);
      }
      
      this.physics.world.collide(this.p1, this.door, this.atDoor, null, this);          //instantiate physics between player and door
      this.physics.world.collide(this.p1, this.glassExit, this.atGlassDoor, null, this);          //instantiate physics between player and door
       // mini zone leaving and entering zones 
       /*let mzTouch1 = miniZone1.body.touching;                                //reserve variables for overlapping vent
       let mzwasTouch1 = miniZone1.body.wasTouching;                                   
       if (mzTouch1.none && !mzwasTouch1.none) {                             //if not touching vent, set to leavezone                    
         miniZone1.emit('leaveMini1');
       }
       else if (!mzTouch1.none && mzwasTouch1.none) {                        //else if touching, set to enterzone
         miniZone1.emit('enterMini1');
       } */
    }
    //door collision only allowed to continue if both buttons are pressed
    atDoor(){
      if(currentScale == 1){
        if(cursors.up.isDown && this.p1.body.onFloor()){
          this.scene.start('EndingTwoScene');
        }
      }  
    }
    atGlassDoor(){
      if(breakingglass < 5){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
          breakingglass += 1;
          this.glassExit.setFrame(breakingglass);
        }   
      }
      if(breakingglass > 4){
        if(currentScale == 1){
          if(cursors.up.isDown && this.p1.body.onFloor()){
            this.scene.start('EndingOneScene');
          }
        }
      }
    }
}