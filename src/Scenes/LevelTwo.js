class LevelTwo extends Phaser.Scene{
  constructor(){
          super('levelTwoScene');
  }

  preload(){
      //load all assets used in Level 2
      this.load.tilemapTiledJSON('map2','./assets/TileMaps/level2.json');
      this.load.image('level2Background', './assets/Backgrounds/level2Background.png');
      this.load.image('medBox','./assets/Objects/heavyObstacleMedium.png');
      this.load.image('smallBox','./assets/Objects/smallObstacle.png');
      this.load.image('textBox', './assets/TextBubbles/boxPickupText.png')
      this.load.spritesheet('button','./assets/Objects/buttonSpriteSheet.png',{frameWidth:32, frameHeight: 32, startFrame: 0 ,endFrame: 1});
      this.load.spritesheet('door', './assets/doorAnimation/initialDoor.png',{frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 13});
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
      pickedUpBox1 = false;
      this.scaleUp = this.sound.add('ScaleUp',{volume: 0.1});                                      //add soundFX for eating and drinking(not implemented yet)
      this.scaleDown = this.sound.add('ScaleDown',{volume: 0.1});
      this.doorSound = this.sound.add('doorOpening',{volume: 0.3});                            
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    //reserve variables for key inputs
      keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      cursors = this.input.keyboard.createCursorKeys();                               //reserve arrow keys for movement
      let background = this.add.tileSprite(0,0,896,512,'level2Background').setOrigin(0,0);
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
      this.exit = new DoorIndicator(this, 800, 398, 'exitSign').setOrigin(0.5);
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
      this.anims.create({
        key:'p1Push',
        repeat: -1,
        frames: this.anims.generateFrameNumbers('playerPush', {start: 0, end: 5, first: 0}),
        frameRate: 30
      })
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
      
      this.physics.add.collider(this.p1, this.medBox, this.checkSize, null, this);  //checks if player is big enough to push box
      //creates zones on buttons to play buttonDown Animation 
      this.physics.add.overlap(this.smallBox, buttonzone1);
      buttonzone1.on('enterzone1', () => onButton1 = true);
      buttonzone1.on('leavezone1', () => onButton1 = false);
      this.physics.add.overlap(this.medBox, buttonzone2);
      buttonzone2.on('enterzone2', () => onButton2 = true);
      buttonzone2.on('leavezone2', () => onButton2 = false);

      //create text and zone  with variables
      this.moveText = this.add.sprite(328,64,'textBox');
      this.moveText.setVisible(false);

      Ventzone4 = this.add.zone(185, 330).setSize(60, 60).setOrigin(0,0); 
      this.physics.world.enable(Ventzone4);
      Ventzone4.body.setAllowGravity(false);
      Ventzone4.body.moves = false;

      this.physics.add.overlap(this.p1, Ventzone4); 

      Ventzone4.on('enterVzone4', () => textVent4 = true);  
      Ventzone4.on('leaveVzone4', () => textVent4 = false);  

      this.cameras.main.setBounds(0, 0, 896, 512);
      this.cameras.main.setZoom(1.25);
      this.cameras.main.startFollow(this.p1);   
  }

  update(){
    this.p1.update();                                                                 //calls player update for controls

    if(Phaser.Input.Keyboard.JustDown(keyR)){
      this.scene.start('levelTwoIntroScene');
    }
    this.moveText.x = this.p1.body.position.x+100;                                    //bubble follwing player position
    this.moveText.y = this.p1.body.position.y-30;

    if(currentScale == 2){
      this.cameras.main.setZoom(1);
    }else if(currentScale == 0.5){
      this.cameras.main.setZoom(1.5);
    }else if(currentScale == 1){
      this.cameras.main.setZoom(1.25);
    }
    //instructions to solve puzzle(letters appear the more drugs are taken)
    this.puzzleSolver();
    
    this.physics.world.collide(this.p1, this.smallBox);
    this.physics.world.collide(this.p1, this.door, this.atDoor, null, this);          //instantiate physics between player and door
    if(currentScale > 0.5){
      this.physics.world.collide(this.p1, this.smallBox, this.pickUpBox, null, this);   
    }
    //Picking up box 
    if(pickedUpBox1 && Phaser.Input.Keyboard.JustDown(keySPACE) && this.p1.body.onFloor() && currentScale > 0.5){
      this.smallBox.x = this.p1.x;
      this.smallBox.y = this.p1.y-35;
      this.smallBox.setVisible(true);
      this.smallBox.body.enable = true;
      pickedUpBox1 = false;
    }
    // text zone 
    let Vtouching4 = Ventzone4.body.touching;                               
    let VwasTouching4 = Ventzone4.body.wasTouching;                                   
    if (Vtouching4.none && !VwasTouching4.none) {                                                
      Ventzone4.emit('leaveVzone4');
    }
    else if (!Vtouching4.none && VwasTouching4.none) {                        
      Ventzone4.emit('enterVzone4');
    } 

    if(textVent4){                                                            //sets text box if overlap
      this.moveText.setVisible(true);
    }else{
      this.moveText.setVisible(false);   
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
    if(onButton1){
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
    if(onButton2){
      this.button2.setFrame(1);
    }else{
      this.button2.setFrame(0);
    }
    
    if(onButton1 && onButton2){
      this.exit.setFrame(1);
    }
    else{
      this.exit.setFrame(0);
    }
    if(!onButton1 || !onButton2){
      this.anims.play('doorOpen', this.door);
      this.doorSound.play();                                      //bugged drinking sound  
      //console.log(onButton1, onButton2);
    }
  }

  //attempt at picking up a box if the player is overlapping(not implemented yet)    
  pickUpBox(p1,smallBox){
    if(Phaser.Input.Keyboard.JustDown(keySPACE) && pickedUpBox1 == false && smallBox.body.onFloor()){
      this.smallBox.setVisible(false);
      this.smallBox.body.enable = false;
      //animation to pickup box
      pickedUpBox1 = true;
    } 
  }
  //door collision only allowed to continue if both buttons are pressed
  atDoor(){
    if(onButton1 && onButton2 && currentScale == 1){
      if(cursors.up.isDown && this.p1.body.onFloor()){
        this.scene.start('levelThreeIntroScene');
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
                let text2 = this.add.text(centerX,centerY, '_n _h_ b___o_ __ _p__ _o__',{ fontSize: '22px', color: '#8B0000' }).setOrigin(0.5);
                text1.alpha = 0.2;
                text2.alpha = 0.2; 
        break;
      case 10:  let text3 = this.add.text(centerX,centerY - textSpacer, '_u__ __e _o___',{ fontSize: '22px', color: '#8B0000' }).setOrigin(0.5);
                let text4 = this.add.text(centerX,centerY, '__ t__ __t__n t_ ___n __or',{ fontSize: '22px', color: '#8B0000' }).setOrigin(0.5);
                text3.alpha = 0.5;
                text4.alpha = 0.5;
        break;
      case 15:  let text5 = this.add.text(centerX,centerY - textSpacer, '__sh t__ __xe_',{ fontSize: '22px', color: '#8B0000' }).setOrigin(0.5);
                let text6 = this.add.text(centerX,centerY, 'o_ __e _u_to_ _o o_e_ D___',{ fontSize: '22px', color: '#8B0000' }).setOrigin(0.5);
                text5.alpha = 0.7;
                text6.alpha = 0.7;
        break;      
      default:
        break;
    }
  }
}    
