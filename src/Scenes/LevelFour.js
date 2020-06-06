class LevelFour extends Phaser.Scene{
    constructor(){
            super('levelFourScene');
    }
  
    preload(){                                                                   
    }               
    create(){
        drugsTaken = 0;
        buttonPressed1 = false;
        buttonPressed2 = false;
        buttonPressed3 = false;
        smallOn1 = false;
        smallOn2 = false;
        smallOn3 = false;
        smallOn4 = false;
        smallOn5 = false;
        smallOn6 = false;
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
        this.hint = this.add.image(0,0,'level4Hint').setOrigin(0,0);
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

        //create button objects
        this.largeButton1 = new Button(this,200,225,'button').setOrigin(0.5).setScale(2);
        this.smallButton = new Button(this,250, 496,'button').setOrigin(0.5);
        this.largeButton2 = new Button(this,775,480,'button').setOrigin(0.5).setScale(2);

        //add small and medium box objects
        this.smallBox1 = new Box(this, 500, 120,'smallBox').setOrigin(0.5);
        this.smallBox2 = new Box(this, 1000, 120,'smallBox').setOrigin(0.5);
        this.smallBox3 = new Box(this, 795, 280,'smallBox').setOrigin(0.5);
        this.medBox = new Box(this, 720, 255,'medBox').setOrigin(0.5);        

        //creating a zone for the vent area where the player cannot scale up
        this.Ventzone1 = new Zone(this, 380, 25, 295, 110).setOrigin(0,0);   
        this.Ventzone2 = new Zone(this, 380, 150, 50, 110).setOrigin(0,0);   
        this.Ventzone3 = new Zone(this, 380, 575, 745, 35).setOrigin(0,0);   
        this.Ventzone4 = new Zone(this, 1115, 100, 140, 515).setOrigin(0,0);   
        this.Ventzone5 = new Zone(this, 860, 25, 260, 110).setOrigin(0,0);   
                
        this.smallButtonZone = new Zone(this, 250, 496, 32, 32).setOrigin(0.5);
        this.largeButtonZone = new Zone(this, 775, 480, 64, 64).setOrigin(0.5);

        this.box1LargeButton1Zone = new Zone(this, 167, 230, 67, 10).setOrigin(0,0);         
        this.box2LargeButton1Zone = new Zone(this, 167, 240, 67, 10).setOrigin(0,0); 
        this.box3LargeButton1Zone = new Zone(this, 167, 250, 67, 10).setOrigin(0,0); 

        this.box1LargeButton2Zone = new Zone(this,740, 480, 67, 10).setOrigin(0,0); 
        this.box2LargeButton2Zone = new Zone(this, 740, 490, 67, 10).setOrigin(0,0); 
        this.box3LargeButton2Zone = new Zone(this, 740, 500, 67, 10).setOrigin(0,0); 

        //add in player object and its animations
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
        this.physics.add.collider(this.largeButton1,platforms4);
        this.physics.add.collider(this.smallButton,platforms4);
        this.physics.add.collider(this.largeButton2,platforms4);
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
        this.physics.add.overlap(this.p1, this.Ventzone1);                         //if player overlaps with ventzone
        this.Ventzone1.on('enterzone', () => inMedVent = true);                      //on entering zone, set to true
        this.Ventzone1.on('leavezone', () => inMedVent = false);   
        this.physics.add.overlap(this.p1, this.Ventzone2);                         //if player overlaps with ventzone
        this.Ventzone2.on('enterzone', () => inMedVent = true);                      //on entering zone, set to true
        this.Ventzone2.on('leavezone', () => inMedVent = false);   
        this.physics.add.overlap(this.p1, this.Ventzone3);                         //if player overlaps with ventzone
        this.Ventzone3.on('enterzone', () => inSmallVent = true);                      //on entering zone, set to true
        this.Ventzone3.on('leavezone', () => inSmallVent = false);   
        this.physics.add.overlap(this.p1, this.Ventzone4);                         //if player overlaps with ventzone
        this.Ventzone4.on('enterzone', () => inMedVent = true);                      //on entering zone, set to true
        this.Ventzone4.on('leavezone', () => inMedVent = false);
        this.physics.add.overlap(this.p1, this.Ventzone5);                         //if player overlaps with ventzone
        this.Ventzone5.on('enterzone', () => inMedVent = true);                      //on entering zone, set to true
        this.Ventzone5.on('leavezone', () => inMedVent = false);   
        //creates zones on buttons to play buttonDown Animation 
        this.physics.add.overlap(this.smallBox1, this.smallButtonZone);
        this.physics.add.overlap(this.smallBox2, this.smallButtonZone);
        this.physics.add.overlap(this.smallBox3, this.smallButtonZone);
        this.physics.add.overlap(this.medBox, this.smallButtonZone);
        this.smallButtonZone.on('enterzone', () => buttonPressed2 = true);
        this.smallButtonZone.on('leavezone', () => buttonPressed2 = false);
        this.physics.add.overlap(this.medBox, this.largeButtonZone);
        this.largeButtonZone.on('enterzone', () => medOn1 = true);
        this.largeButtonZone.on('leavezone', () => medOn1 = false);
        //mini zones for each small box / overlaps for mini zone
        this.physics.add.overlap(this.smallBox1, this.box1LargeButton1Zone);
        this.box1LargeButton1Zone.on('enterzone', () => smallOn1 = true);  
        this.box1LargeButton1Zone.on('leavezone', () => smallOn1 = false);
        this.physics.add.overlap(this.smallBox2, this.box2LargeButton1Zone);
        this.box2LargeButton1Zone.on('enterzone', () => smallOn2 = true);  
        this.box2LargeButton1Zone.on('leavezone', () => smallOn2 = false);
        this.physics.add.overlap(this.smallBox3, this.box3LargeButton1Zone);
        this.box3LargeButton1Zone.on('enterzone', () => smallOn3 = true);  
        this.box3LargeButton1Zone.on('leavezone', () => smallOn3 = false);
        this.physics.add.overlap(this.smallBox1, this.box1LargeButton2Zone);
        this.box1LargeButton2Zone.on('enterzone', () => smallOn4 = true);  
        this.box1LargeButton2Zone.on('leavezone', () => smallOn4 = false);
        this.physics.add.overlap(this.smallBox2, this.box2LargeButton2Zone);
        this.box2LargeButton2Zone.on('enterzone', () => smallOn5 = true);  
        this.box2LargeButton2Zone.on('leavezone', () => smallOn5 = false);
        this.physics.add.overlap(this.smallBox3, this.box3LargeButton2Zone);
        this.box3LargeButton2Zone.on('enterzone', () => smallOn6 = true);  
        this.box3LargeButton2Zone.on('leavezone', () => smallOn6 = false);

        this.cameras.main.setBounds(0, 0, 1280, 640);
        this.cameras.main.setZoom(1.25);
        this.cameras.main.startFollow(this.p1);
    }
  
    update(){
      this.p1.update();                                                                   //calls player update for controls
      this.Ventzone1.update();
      this.Ventzone2.update();
      this.Ventzone3.update();
      this.Ventzone3.update();
      this.Ventzone4.update();
      this.Ventzone5.update();
      this.smallButtonZone.update();
      this.largeButtonZone.update();
      this.box1LargeButton1Zone.update();
      this.box2LargeButton1Zone.update();
      this.box3LargeButton1Zone.update();
      this.box1LargeButton2Zone.update();
      this.box2LargeButton2Zone.update();
      this.box3LargeButton2Zone.update();

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
      this.puzzleSolver();
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
      if((smallOn1 && smallOn2) || (smallOn1 && smallOn3) || (smallOn2 && smallOn3)){ 
        this.largeButton1.setFrame(1);
        buttonPressed1 = true;
      }else{
        this.largeButton1.setFrame(0);  
        buttonPressed1 = false;   
      }
      if(buttonPressed2){ 
        this.smallButton.setFrame(1);
      }else{
        this.smallButton.setFrame(0);     
      }
      if((smallOn4 && smallOn5) || (smallOn4 && smallOn6) || (smallOn5 && smallOn6) || (medOn1)){ 
        this.largeButton2.setFrame(1);
        buttonPressed3 = true;
      }else{
        this.largeButton2.setFrame(0);
        buttonPressed3 = false;     
      }
      //sets first button to buttonDown frame is box is on button
      if(buttonPressed1 && buttonPressed2 && buttonPressed3){ 
        this.exit.setFrame(1);
      }else { 
        this.exit.setFrame(0); 
      }
      if(!buttonPressed1 || !buttonPressed2 || !buttonPressed3){
        this.anims.play('doorOpen', this.door);
        this.doorSound.play();                                      //bugged drinking sound  
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
      if(buttonPressed1 && buttonPressed2 && buttonPressed3 && currentScale == 1){
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
        case 30:  this.hint.setFrame(1);
          break;
        case 35:  this.hint.setFrame(2);
          break;
        case 45:  this.hint.setFrame(3);
          break; 
        default:
          break;
      }
    }
}
    