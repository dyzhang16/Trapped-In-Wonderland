class LevelTwo extends Phaser.Scene{
  constructor(){
          super('levelTwoScene');
  }
  preload(){
  }
  create(){
      drugsTaken = 0;
      buttonPressed1 = false;
      buttonPressed2 = false;
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
      this.hint = this.add.image(0,0,'level2Hint').setOrigin(0,0);
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
      this.buttonzone1 = new Zone(this, 380, 465, 32, 32).setOrigin(0.5);

      //create large button object and add collision between the button and map
      this.button2 = new Button(this,660,450,'button').setOrigin(0.5).setScale(2);
      this.physics.add.collider(this.button2,platforms2);
      this.buttonzone2 = new Zone(this, 660, 450, 64, 64).setOrigin(0.5);

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
      this.physics.add.overlap(this.smallBox, this.buttonzone1);
      this.buttonzone1.on('enterzone', () => buttonPressed1 = true);
      this.buttonzone1.on('leavezone', () => buttonPressed1 = false);
      this.physics.add.overlap(this.medBox, this.buttonzone2);
      this.buttonzone2.on('enterzone', () => buttonPressed2 = true);
      this.buttonzone2.on('leavezone', () => buttonPressed2 = false);

      //create text and zone  with variables
      this.moveText = this.add.sprite(328,64,'textBox');
      this.moveText.setVisible(false);

      this.Ventzone4 = new Zone(this, 185, 330, 60, 60).setOrigin(0,0); 

      this.physics.add.overlap(this.p1, this.Ventzone4); 

      this.Ventzone4.on('enterzone', () => textVent4 = true);  
      this.Ventzone4.on('leavezone', () => textVent4 = false);  

      this.cameras.main.setBounds(0, 0, 896, 512);
      this.cameras.main.setZoom(1.25);
      this.cameras.main.startFollow(this.p1);   
  }

  update(){
    this.p1.update();                                                                 //calls player update for controls
    this.Ventzone4.update();
    this.buttonzone1.update();
    this.buttonzone2.update();
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

    if(textVent4){                                                            //sets text box if overlap
      this.moveText.setVisible(true);
    }else{
      this.moveText.setVisible(false);   
    }
    if(buttonPressed1){
      this.button1.setFrame(1);
    }else{
      this.button1.setFrame(0);
    }

    if(buttonPressed2){
      this.button2.setFrame(1);
    }else{
      this.button2.setFrame(0);
    }
    
    if(buttonPressed1 && buttonPressed2){
      this.exit.setFrame(1);
    }
    else{
      this.exit.setFrame(0);
    }
    if(!buttonPressed1 || !buttonPressed2){
      this.anims.play('doorOpen', this.door);
      this.doorSound.play();                                      //bugged drinking sound  
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
    if(buttonPressed1 && buttonPressed2 && currentScale == 1){
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
      case 7:   this.hint.setFrame(1);
        break;
      case 10:  this.hint.setFrame(2);  
        break;
      case 15:  this.hint.setFrame(3);  
        break;      
      default:
        break;
    }
  }
}    
