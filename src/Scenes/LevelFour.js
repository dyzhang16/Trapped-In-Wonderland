class LevelFour extends Phaser.Scene{
    constructor(){
            super('levelFourScene');
    }
  
    preload(){                                                                   
        //load all assets for Level 4
        this.load.tilemapTiledJSON('map4','./assets/TileMaps/level4.json');
        this.load.image('level4Background', './assets/Backgrounds/level4Background.png');
        this.load.image('medBox','./assets/Objects/heavyObstacleMedium.png');                         
        this.load.image('smallBox','./assets/Objects/smallObstacle.png');
        this.load.spritesheet('button','./assets/Objects/buttonSpriteSheet.png',{frameWidth:32, frameHeight: 32, startFrame: 0 ,endFrame: 1});
        this.load.spritesheet('door', './assets/doorAnimation/doorOpening.png',{frameWidth: 32, frameHeight: 32, startFrame:0 , endFrame: 4});
        this.load.spritesheet('exitSign','./assets/doorAnimation/doorIndicator1.png',{frameWidth: 16, frameHeight: 16, startFrame:0 , endFrame: 1});
        this.load.spritesheet('playerIdle','./assets/AliceAnim/AliceV2Standing.png',{frameWidth: 30, frameHeight: 64, startFrame: 0, endFrame: 0});
        this.load.spritesheet('playerJump','./assets/AliceAnim/AliceV2Jump.png',{frameWidth: 30, frameHeight: 64, startFrame: 0, endFrame: 5});
        this.load.spritesheet('playerWalk','./assets/AliceAnim/AliceV2Walking.png',{frameWidth: 30, frameHeight: 64, startFrame:0, endFrame: 7});
        this.load.audio('ScaleUp','./assets/soundFX/ScaleUp.mp3');                  
        this.load.audio('ScaleDown','./assets/soundFX/ScaleDown.mp3');               
        this.load.audio('doorOpening','./assets/soundFX/doorOpening.mp3');
    }               
    create(){
        drugsTaken = 0;
        onButton1 = false;
        onButton2 = false;
        onButton3 = false;
        pickedUpBox1 = false;
        pickedUpBox2 = false;
        pickedUpBox3 = false;
        holdingBox = false;   
        this.scaleUp = this.sound.add('ScaleUp',{volume: 0.1});                                      //add soundFX for eating and drinking(not implemented yet)
        this.scaleDown = this.sound.add('ScaleDown',{volume: 0.1});
        this.doorSound = this.sound.add('doorOpening',{volume: 0.3});                              
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    //reserve variables for key inputs
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        cursors = this.input.keyboard.createCursorKeys();                               //reserve arrow keys for movement
        let background = this.add.tileSprite(0,0,1280,960,'level4Background').setOrigin(0,0);
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
        //creating a zone for the vent area where the player cannot scale up
        Ventzone1 = this.add.zone(380, 25).setSize(295, 110).setOrigin(0,0);   
        this.physics.world.enable(Ventzone1);
        Ventzone1.body.setAllowGravity(false);
        Ventzone1.body.moves = false;      
        //creating a zone for the vent area where the player cannot scale up
        Ventzone2 = this.add.zone(380, 150).setSize(50, 110).setOrigin(0,0);   
        this.physics.world.enable(Ventzone2);
        Ventzone2.body.setAllowGravity(false);
        Ventzone2.body.moves = false;  
        //creating a zone for the vent area where the player cannot scale up
        Ventzone3 = this.add.zone(380, 575).setSize(745, 35).setOrigin(0,0);   
        this.physics.world.enable(Ventzone3);
        Ventzone3.body.setAllowGravity(false);
        Ventzone3.body.moves = false; 
        //creating a zone for the vent area where the player cannot scale up
        Ventzone4 = this.add.zone(1115, 200).setSize(140,415).setOrigin(0,0);   
        this.physics.world.enable(Ventzone4);
        Ventzone4.body.setAllowGravity(false);
        Ventzone4.body.moves = false; 
        //creating a zone for the vent area where the player cannot scale up
        Ventzone5 = this.add.zone(860, 25).setSize(260,110).setOrigin(0,0);   
        this.physics.world.enable(Ventzone5);
        Ventzone5.body.setAllowGravity(false);
        Ventzone5.body.moves = false; 

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
        this.smallBox1 = new Box(this, 500, 120,'smallBox').setOrigin(0.5);
        this.smallBox2 = new Box(this, 1000, 120,'smallBox').setOrigin(0.5);
        this.smallBox3 = new Box(this, 795, 280,'smallBox').setOrigin(0.5);
        this.medBox = new Box(this, 720, 255,'medBox').setOrigin(0.5);
        //add in player object and its animations(sizeUp animations not working)
        this.p1 = new Player(this, 80, 260,'playerIdle').setOrigin(0.5,1);
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
        //instantiate physics between boxes
        this.physics.add.collider(this.smallBox1, this.smallBox2);
        this.physics.add.collider(this.smallBox1, this.smallBox3);
        this.physics.add.collider(this.smallBox1, this.medBox);        
        this.physics.add.collider(this.smallBox2, this.smallBox3);
        this.physics.add.collider(this.smallBox2, this.medBox);
        this.physics.add.collider(this.smallBox3, this.medBox);

        //create zone for Vent
        this.physics.add.overlap(this.p1, Ventzone1);                         //if player overlaps with ventzone
        Ventzone1.on('enterV1zone', () => inMedVent = true);                      //on entering zone, set to true
        Ventzone1.on('leaveV1zone', () => inMedVent = false);   
        
        //create zone for Vent
        this.physics.add.overlap(this.p1, Ventzone2);                         //if player overlaps with ventzone
        Ventzone2.on('enterV2zone', () => inMedVent = true);                      //on entering zone, set to true
        Ventzone2.on('leaveV2zone', () => inMedVent = false);   

        //create zone for Vent
        this.physics.add.overlap(this.p1, Ventzone3);                         //if player overlaps with ventzone
        Ventzone3.on('enterV3zone', () => inSmallVent = true);                      //on entering zone, set to true
        Ventzone3.on('leaveV3zone', () => inSmallVent = false);   

        //create zone for Vent
        this.physics.add.overlap(this.p1, Ventzone4);                         //if player overlaps with ventzone
        Ventzone4.on('enterV4zone', () => inMedVent = true);                      //on entering zone, set to true
        Ventzone4.on('leaveV4zone', () => inMedVent = false);
           
        //create zone for Vent
        this.physics.add.overlap(this.p1, Ventzone5);                         //if player overlaps with ventzone
        Ventzone5.on('enterV5zone', () => inMedVent = true);                      //on entering zone, set to true
        Ventzone5.on('leaveV5zone', () => inMedVent = false);   

        //creates zones on buttons to play buttonDown Animation 
        this.physics.add.overlap(this.smallBox1, buttonzone1);
        this.physics.add.overlap(this.smallBox1, buttonzone2);
        this.physics.add.overlap(this.smallBox1, buttonzone3);
        this.physics.add.overlap(this.smallBox2, buttonzone1);
        this.physics.add.overlap(this.smallBox2, buttonzone2);
        this.physics.add.overlap(this.smallBox2, buttonzone3);
        this.physics.add.overlap(this.smallBox3, buttonzone1);
        this.physics.add.overlap(this.smallBox3, buttonzone2);
        this.physics.add.overlap(this.smallBox3, buttonzone3);
        this.physics.add.overlap(this.medBox, buttonzone2);
        this.physics.add.overlap(this.medBox, buttonzone3);
        buttonzone1.on('enterb1zone', () => onButton1 = true);
        buttonzone1.on('leaveb1zone', () => onButton1 = false);
        buttonzone2.on('enterb2zone', () => onButton2 = true);
        buttonzone2.on('leaveb2zone', () => onButton2 = false);
        //buttonzone3.on('enterb3zone', () => onButton3 = true);
        buttonzone3.on('leaveb3zone', () => onButton3 = false);

        //mini zones for each small box / overlaps for mini zone
        miniZone1 = this.add.zone(167, 230).setSize(67, 10).setOrigin(0,0); 
        this.physics.world.enable(miniZone1);
        miniZone1.body.setAllowGravity(false);
        miniZone1.body.moves = false;
        this.physics.add.overlap(this.smallBox1, miniZone1);
        miniZone1.on('enterMini1', () => smallOn1 = true);  
        miniZone1.on('leaveMini1', () => smallOn1 = false);

        miniZone2 = this.add.zone(167, 240).setSize(67, 10).setOrigin(0,0); 
        this.physics.world.enable(miniZone2);
        miniZone2.body.setAllowGravity(false);
        miniZone2.body.moves = false;
        this.physics.add.overlap(this.smallBox2, miniZone2);
        miniZone2.on('enterMini2', () => smallOn2 = true);  
        miniZone2.on('leaveMini2', () => smallOn2 = false);

        miniZone3 = this.add.zone(167, 250).setSize(67, 10).setOrigin(0,0); 
        this.physics.world.enable(miniZone3);
        miniZone3.body.setAllowGravity(false);
        miniZone3.body.moves = false;
        this.physics.add.overlap(this.smallBox3, miniZone3);
        miniZone3.on('enterMini3', () => smallOn3 = true);  
        miniZone3.on('leaveMini3', () => smallOn3 = false);

        miniZone4 = this.add.zone(740, 480).setSize(67, 10).setOrigin(0,0); 
        this.physics.world.enable(miniZone4);
        miniZone4.body.setAllowGravity(false);
        miniZone4.body.moves = false;
        this.physics.add.overlap(this.smallBox1, miniZone4);
        miniZone4.on('enterMini4', () => smallOn4 = true);  
        miniZone4.on('leaveMini4', () => smallOn4 = false);

        miniZone5 = this.add.zone(740, 490).setSize(67, 10).setOrigin(0,0); 
        this.physics.world.enable(miniZone5);
        miniZone5.body.setAllowGravity(false);
        miniZone5.body.moves = false;
        this.physics.add.overlap(this.smallBox2, miniZone5);
        miniZone5.on('enterMini5', () => smallOn5 = true);  
        miniZone5.on('leaveMini5', () => smallOn5 = false);

        miniZone6 = this.add.zone(740, 500).setSize(67, 10).setOrigin(0,0); 
        this.physics.world.enable(miniZone6);
        miniZone6.body.setAllowGravity(false);
        miniZone6.body.moves = false;
        this.physics.add.overlap(this.smallBox3, miniZone6);
        miniZone6.on('enterMini6', () => smallOn6 = true);  
        miniZone6.on('leaveMini6', () => smallOn6 = false);

        miniZone7 = this.add.zone(740, 470).setSize(67, 10).setOrigin(0,0); 
        this.physics.world.enable(miniZone7);
        miniZone7.body.setAllowGravity(false);
        miniZone7.body.moves = false;
        this.physics.add.overlap(this.medBox, miniZone7);
        miniZone7.on('enterMini7', () => medOn1 = true);  
        miniZone7.on('leaveMini7', () => medOn1 = false);

        //console.log(onButton1);
        this.cameras.main.setBounds(0, 0, 1280, 640);
        this.cameras.main.setZoom(1.25);
        this.cameras.main.startFollow(this.p1);
    }
  
    update(){
      this.p1.update();                                                                   //calls player update for controls
      
      if(Phaser.Input.Keyboard.JustDown(keyR)){
        this.scene.start('levelFourIntroScene');
      }
      if(currentScale == 2){
        this.cameras.main.setZoom(1);
      }else if(currentScale == 0.5){
        this.cameras.main.setZoom(1.5);
      }else if(currentScale == 1){
        this.cameras.main.setZoom(1.25);
      }
      //instructions to solve puzzle(letters appear the more drugs are taken)
      //this.puzzleSolver();
      this.physics.world.collide(this.p1, this.door, this.atDoor, null, this);          //instantiate physics between player and door
      if(currentScale > 0.5){
        this.physics.world.collide(this.p1, this.smallBox1, this.pickUpBox1, null, this);
        this.physics.world.collide(this.p1, this.smallBox2, this.pickUpBox2, null, this);
        this.physics.world.collide(this.p1, this.smallBox3, this.pickUpBox3, null, this);
      }
      //Dropping Box if picked up a small Box
      if(currentScale > 0.5){
        if(pickedUpBox1 && Phaser.Input.Keyboard.JustDown(keySPACE) && this.p1.body.onFloor()){
          this.smallBox1.x = this.p1.x;
          this.smallBox1.y = this.p1.y-35;
          this.smallBox1.setVisible(true);
          this.smallBox1.body.enable = true;
          pickedUpBox1 = false;
          holdingBox = false;
        }
        if(pickedUpBox2 && Phaser.Input.Keyboard.JustDown(keySPACE) && this.p1.body.onFloor()){
          this.smallBox2.x = this.p1.x;
          this.smallBox2.y = this.p1.y-35;
          this.smallBox2.setVisible(true);
          this.smallBox2.body.enable = true;
          pickedUpBox2 = false;
          holdingBox = false;
        }
        if(pickedUpBox3 && Phaser.Input.Keyboard.JustDown(keySPACE) && this.p1.body.onFloor()){
          this.smallBox3.x = this.p1.x;
          this.smallBox3.y = this.p1.y-35;
          this.smallBox3.setVisible(true);
          this.smallBox3.body.enable = true;
          pickedUpBox3 = false;
          holdingBox = false;
        }
      }
      let V1touching = Ventzone1.body.touching;                                //reserve variables for overlapping vent
      let V1wasTouching = Ventzone1.body.wasTouching;                                   
      if (V1touching.none && !V1wasTouching.none) {                             //if not touching vent, set to leavezone                    
        Ventzone1.emit('leaveV1zone');
      }
      else if (!V1touching.none && V1wasTouching.none) {                        //else if touching, set to enterzone
        Ventzone1.emit('enterV1zone');
      }
      let V2touching = Ventzone2.body.touching;                                //reserve variables for overlapping vent
      let V2wasTouching = Ventzone2.body.wasTouching;                                   
      if (V2touching.none && !V2wasTouching.none) {                             //if not touching vent, set to leavezone                    
        Ventzone2.emit('leaveV2zone');
      }
      else if (!V2touching.none && V2wasTouching.none) {                        //else if touching, set to enterzone
        Ventzone2.emit('enterV2zone');
      }
      let V3touching = Ventzone3.body.touching;                                //reserve variables for overlapping vent
      let V3wasTouching = Ventzone3.body.wasTouching;                                   
      if (V3touching.none && !V3wasTouching.none) {                             //if not touching vent, set to leavezone                    
        Ventzone3.emit('leaveV3zone');
      }
      else if (!V3touching.none && V3wasTouching.none) {                        //else if touching, set to enterzone
        Ventzone3.emit('enterV3zone');
      }
      let V4touching = Ventzone4.body.touching;                                //reserve variables for overlapping vent
      let V4wasTouching = Ventzone4.body.wasTouching;                                   
      if (V4touching.none && !V4wasTouching.none) {                             //if not touching vent, set to leavezone                    
        Ventzone4.emit('leaveV4zone');
      }
      else if (!V4touching.none && V4wasTouching.none) {                        //else if touching, set to enterzone
        Ventzone4.emit('enterV4zone');
      }
      let V5touching = Ventzone5.body.touching;                                //reserve variables for overlapping vent
      let V5wasTouching = Ventzone5.body.wasTouching;                                   
      if (V5touching.none && !V5wasTouching.none) {                             //if not touching vent, set to leavezone                    
        Ventzone5.emit('leaveV5zone');
      }
      else if (!V5touching.none && V5wasTouching.none) {                        //else if touching, set to enterzone
        Ventzone5.emit('enterV5zone');
      }
      //second button zone variables for entry and leaving  
      let b1touching = buttonzone1.body.touching;
      let b1wasTouching = buttonzone1.body.wasTouching;  
      if (b1touching.none && !b1wasTouching.none) {
        buttonzone1.emit('leaveb1zone');
      } else if (!b1touching.none && b1wasTouching.none) {
          buttonzone1.emit('enterb1zone');
      }
      let b2touching = buttonzone2.body.touching;
      let b2wasTouching = buttonzone2.body.wasTouching;  
      if (b2touching.none && !b2wasTouching.none) {
        buttonzone2.emit('leaveb2zone');
      } else if (!b2touching.none && b2wasTouching.none) {
          buttonzone2.emit('enterb2zone');
      }
      let b3touching = buttonzone3.body.touching;
      let b3wasTouching = buttonzone3.body.wasTouching;  
      if (b3touching.none && !b3wasTouching.none) {
        buttonzone3.emit('leaveb3zone');
      } else if (!b3touching.none && b3wasTouching.none) {
          buttonzone3.emit('enterb3zone');
      }
       // mini zone leaving and entering zones 
      let mzTouch1 = miniZone1.body.touching;                                //reserve variables for overlapping vent
      let mzwasTouch1 = miniZone1.body.wasTouching;                                   
      if (mzTouch1.none && !mzwasTouch1.none) {                             //if not touching vent, set to leavezone                    
        miniZone1.emit('leaveMini1');
      }
      else if (!mzTouch1.none && mzwasTouch1.none) {                        //else if touching, set to enterzone
        miniZone1.emit('enterMini1');
      } 

      let mzTouch2 = miniZone2.body.touching;                                
      let mzwasTouch2 = miniZone2.body.wasTouching;                                   
      if (mzTouch2.none && !mzwasTouch2.none) {                                                
        miniZone2.emit('leaveMini2');
      }
      else if (!mzTouch2.none && mzwasTouch2.none) {                       
        miniZone2.emit('enterMini2');
      } 

      let mzTouch3 = miniZone3.body.touching;                                
      let mzwasTouch3 = miniZone3.body.wasTouching;                                   
      if (mzTouch3.none && !mzwasTouch3.none) {                                                
        miniZone3.emit('leaveMini3');
      }
      else if (!mzTouch3.none && mzwasTouch3.none) {                       
        miniZone3.emit('enterMini3');
      } 

      let mzTouch4 = miniZone4.body.touching;                                
      let mzwasTouch4 = miniZone4.body.wasTouching;                                   
      if (mzTouch4.none && !mzwasTouch4.none) {                                                
        miniZone4.emit('leaveMini4');
      }
      else if (!mzTouch4.none && mzwasTouch4.none) {                       
        miniZone4.emit('enterMini4');
      } 

      let mzTouch5 = miniZone5.body.touching;                                
      let mzwasTouch5 = miniZone5.body.wasTouching;                                   
      if (mzTouch5.none && !mzwasTouch5.none) {                                                
        miniZone5.emit('leaveMini5');
      }
      else if (!mzTouch5.none && mzwasTouch5.none) {                       
        miniZone5.emit('enterMini5');
      } 

      let mzTouch6 = miniZone6.body.touching;                                
      let mzwasTouch6 = miniZone6.body.wasTouching;                                   
      if (mzTouch6.none && !mzwasTouch6.none) {                                             
        miniZone6.emit('leaveMini6');
      }
      else if (!mzTouch6.none && mzwasTouch6.none) {                        
        miniZone6.emit('enterMini6');
      } 

      let mzTouch7 = miniZone7.body.touching;                             
      let mzwasTouch7 = miniZone7.body.wasTouching;                                   
      if (mzTouch7.none && !mzwasTouch7.none) {                                                
        miniZone7.emit('leaveMini7');
      }
      else if (!mzTouch7.none && mzwasTouch7.none) {                       
        miniZone7.emit('enterMini7');
      } 

      //sets first button to buttonDown frame is box is on button
      if((smallOn1 && smallOn2) || (smallOn1 && smallOn3) || (smallOn2 && smallOn3)){ 
        this.largeButton1.setFrame(1);
        onButton3 = true;
      }else{
        this.largeButton1.setFrame(0);  
        onButton3 = false;   
      }
      if(onButton2){ 
        this.smallButton.setFrame(1);
      }else{
        this.smallButton.setFrame(0);     
      }
      if((smallOn4 && smallOn5) || (smallOn4 && smallOn6) || (smallOn5 && smallOn6) || (medOn1)){ 
        this.largeButton2.setFrame(1);
      }else{
        this.largeButton2.setFrame(0);     
      }
      //sets first button to buttonDown frame is box is on button
      if(onButton1 && onButton2 && onButton3){ 
        this.exit.setFrame(1);
      }else { 
        this.exit.setFrame(0); 
      }
      if(!onButton1 || !onButton2 || !onButton3){
        this.anims.play('doorOpen', this.door);
        this.doorSound.play();                                      //bugged drinking sound  
        //console.log(onButton1, onButton2);
      }        
    }


    //attempt at picking up a box if the player is overlapping(not implemented yet)    
    pickUpBox1(p1,smallBox1){
      if(Phaser.Input.Keyboard.JustDown(keySPACE) && !holdingBox && smallBox1.body.onFloor()){
        this.smallBox1.setVisible(false);
        this.smallBox1.body.enable = false;
        //animation to pickup box
        pickedUpBox1 = true;
        holdingBox = true;
      } 
    }
    pickUpBox2(p1,smallBox2){
      if(Phaser.Input.Keyboard.JustDown(keySPACE) && !holdingBox && smallBox2.body.onFloor()){
        this.smallBox2.setVisible(false);
        this.smallBox2.body.enable = false;
        //animation to pickup box
        pickedUpBox2 = true;
        holdingBox = true;
      } 
    }
    pickUpBox3(p1,smallBox3){
      if(Phaser.Input.Keyboard.JustDown(keySPACE) && !holdingBox && smallBox3.body.onFloor()){
        this.smallBox3.setVisible(false);
        this.smallBox3.body.enable = false;
        //animation to pickup box
        pickedUpBox3 = true;
        holdingBox = true;
      } 
    }
    //door collision only allowed to continue if both buttons are pressed
    atDoor(){
      if(onButton1 && onButton2 && onButton3 && currentScale == 1){
        if(cursors.up.isDown && this.p1.body.onFloor()){
          this.scene.start('levelFiveIntroScene');
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
        case 2/*15*/:   let text1 = this.add.text(400,700, 'Size Matters!',{ fontSize: '20px', color: '#8B0000' }).setOrigin(0.5);
                  let text2 = this.add.text(400,700 + textSpacer, 'Scale Down to Jump Farther!',{ fontSize: '20px', color: '#8B0000' }).setOrigin(0.5);
                  text1.alpha = 0.2;
                  text2.alpha = 0.2; 
          break;
        case 3/*20*/:  let text3 = this.add.text(400,700, 'Size Matters!',{ fontSize: '20px', color: '#8B0000' }).setOrigin(0.5);
                  let text4 = this.add.text(400,700 + textSpacer, 'Scale Down to Jump Farther',{ fontSize: '20px', color: '#8B0000' }).setOrigin(0.5);
                  text3.alpha = 0.5;
                  text4.alpha = 0.5;
          break;
        case 4/*25*/:  let text5 = this.add.text(400,700, 'Size Matters!',{ fontSize: '20px', color: '#8B0000' }).setOrigin(0.5);
                  let text6 = this.add.text(400,700 + textSpacer, 'Scale Down to Jump Farther!',{ fontSize: '20px', color: '#8B0000' }).setOrigin(0.5);
                  text5.alpha = 0.7;
                  text6.alpha = 0.7;
          break;      
        default:
          break;
      }
    }
}
    