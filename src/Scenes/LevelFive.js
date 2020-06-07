class LevelFive extends Phaser.Scene{
  constructor(){
          super('levelFiveScene');
  }

  preload(){
  }
  create(){
    //add soundFX for eating and drinking(not implemented yet)
    this.scaleUp = this.sound.add('ScaleUp',{volume: 0.1});                                      
    this.scaleDown = this.sound.add('ScaleDown',{volume: 0.1});
    this.doorSound = this.sound.add('doorOpening',{volume: 0.3});                                       
    //reserve variables for key inputs
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    
    keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    //reserve arrow keys for movement
    cursors = this.input.keyboard.createCursorKeys();
    //create background and hints                               
    let background = this.add.tileSprite(0,0,1280,960,'level5Background').setOrigin(0,0);
    this.hint = this.add.image(0,0,'level5Hint').setOrigin(0,0);      
    //add in level 2 tilemap and sets collision for tilemap
    const map5 = this.make.tilemap({key: 'map5'});
    const tileset5 = map5.addTilesetImage('ScaleDistortionGameTileset','tiles',32,32,0,0);
    const platforms5 = map5.createStaticLayer('Platforms',tileset5,0,0).setOrigin(0.5);
    platforms5.setCollisionByProperty({collides: true});
    //add in door object and exit
    this.door = new Door(this, 1200, 575,'door').setOrigin(0.5);
    this.exit = new DoorIndicator(this, 1200, 527, 'exitSign').setOrigin(0.5);
    //create button objects
    this.largeButton = new Button(this,340,575,'button').setOrigin(0.5).setScale(2);
    this.smallButton = new Button(this,400, 240,'button').setOrigin(0.5);
    //add small and medium box objects
    this.smallBox1 = new Box(this, 900, 80,'smallBox').setOrigin(0.5);
    this.smallBox2 = new Box(this, 950, 220,'smallBox').setOrigin(0.5);
    this.smallBox3 = new Box(this, 795, 600,'smallBox').setOrigin(0.5);
    //create vent zones to set variables
    this.ventZone1 = new Zone(this, 155, 565, 105, 50).setOrigin(0,0);   
    this.ventZone2 = new Zone(this, 410, 500, 170, 120).setOrigin(0,0);   
    this.ventZone3 = new Zone(this, 30, 126, 484, 290).setOrigin(0,0);   
    this.ventZone4 = new Zone(this, 285, 65, 230, 35).setOrigin(0,0);   
    this.ventZone5 = new Zone(this, 735, 190, 35, 35).setOrigin(0,0);   
    this.ventZone6 = new Zone(this, 890, 150, 260, 400).setOrigin(0,0);   
    this.ventZone7 = new Zone(this, 895, 575, 67, 35).setOrigin(0,0);   
    this.ventZone8 = new Zone(this, 1023, 575, 133, 35).setOrigin(0,0);   
    this.ventZone9 = new Zone(this, 1155, 555, 90, 15).setOrigin(0,0);   
    this.ventZone10 = new Zone(this, 1155, 205, 60, 15).setOrigin(0,0);   
    this.ventZone11 = new Zone(this, 1155, 70, 90, 110).setOrigin(0,0);   
    this.ventZone12 = new Zone(this, 735, 70, 420, 20).setOrigin(0,0);   
    //create button zones to set variables
    this.smallButtonZone = new Zone(this, 400, 240, 32, 32).setOrigin(0.5);
    //create a zone for each box to set variables
    this.box1LargeButtonZone = new Zone(this, 305, 580, 67, 10).setOrigin(0,0); 
    this.box2LargeButtonZone = new Zone(this, 305, 590, 67, 10).setOrigin(0,0); 
    this.box3LargeButtonZone = new Zone(this, 305, 600, 67, 10).setOrigin(0,0); 
    //add in player object
    this.p1 = new Player(this, 80, 610,'playerIdle').setOrigin(0.5,1);
    //instantiate physics between objects and map
    this.physics.add.collider(this.p1, platforms5);
    this.physics.add.collider(this.door,platforms5);
    this.physics.add.collider(this.largeButton,platforms5);
    this.physics.add.collider(this.smallButton,platforms5);
    this.physics.add.collider(this.smallBox1, platforms5);
    this.physics.add.collider(this.smallBox2, platforms5);
    this.physics.add.collider(this.smallBox3, platforms5);
    //instantiate physics between player and boxes
    this.physics.add.collider(this.p1, this.smallBox1);
    this.physics.add.collider(this.p1, this.smallBox2);
    this.physics.add.collider(this.p1, this.smallBox3);
    //instantiate physics between boxes 
    this.physics.add.collider(this.smallBox1, this.smallBox2);
    this.physics.add.collider(this.smallBox1, this.smallBox3);
    this.physics.add.collider(this.smallBox2, this.smallBox3);
    //instantiate physics between player and vents
    this.physics.add.overlap(this.p1, this.ventZone1);                         
    this.ventZone1.on('enterzone', () => inSmallVent = true);                      
    this.ventZone1.on('leavezone', () => inSmallVent = false);   
    this.physics.add.overlap(this.p1, this.ventZone2);                         
    this.ventZone2.on('enterzone', () => inMedVent = true);                      
    this.ventZone2.on('leavezone', () => inMedVent = false);   
    this.physics.add.overlap(this.p1, this.ventZone3);                         
    this.ventZone3.on('enterzone', () => inMedVent = true);                     
    this.ventZone3.on('leavezone', () => inMedVent = false);   
    this.physics.add.overlap(this.p1, this.ventZone4);                         
    this.ventZone4.on('enterzone', () => inSmallVent = true);                      
    this.ventZone4.on('leavezone', () => inSmallVent = false);
    this.physics.add.overlap(this.p1, this.ventZone5);                         
    this.ventZone5.on('enterzone', () => inSmallVent = true);                      
    this.ventZone5.on('leavezone', () => inSmallVent = false);   
    this.physics.add.overlap(this.p1, this.ventZone6);                         
    this.ventZone6.on('enterzone', () => inMedVent = true);                      
    this.ventZone6.on('leavezone', () => inMedVent = false);   
    this.physics.add.overlap(this.p1, this.ventZone7);                        
    this.ventZone7.on('enterzone', () => inSmallVent = true);                      
    this.ventZone7.on('leavezone', () => inSmallVent = false);
    this.physics.add.overlap(this.p1, this.ventZone8);                         
    this.ventZone8.on('enterzone', () => inSmallVent = true);                      
    this.ventZone8.on('leavezone', () => inSmallVent = false);   
    this.physics.add.overlap(this.p1, this.ventZone9);                         
    this.ventZone9.on('enterzone', () => inMedVent = true);                      
    this.ventZone9.on('leavezone', () => inMedVent = false);   
    this.physics.add.overlap(this.p1, this.ventZone10);                         
    this.ventZone10.on('enterzone', () => inSmallVent = true);                      
    this.ventZone10.on('leavezone', () => inSmallVent = false);
    this.physics.add.overlap(this.p1, this.ventZone11);                         
    this.ventZone11.on('enterzone', () => inMedVent = true);                      
    this.ventZone11.on('leavezone', () => inMedVent = false);
    this.physics.add.overlap(this.p1, this.ventZone12);                         
    this.ventZone12.on('enterzone', () => inSmallVent = true);                      
    this.ventZone12.on('leavezone', () => inSmallVent = false);      
    //instantiates physics between boxes and buttonZones to set variables
    this.physics.add.overlap(this.smallBox1, this.smallButtonZone);
    this.physics.add.overlap(this.smallBox2, this.smallButtonZone);
    this.physics.add.overlap(this.smallBox3, this.smallButtonZone);
    this.smallButtonZone.on('enterzone', () => buttonPressed2 = true);
    this.smallButtonZone.on('leavezone', () => buttonPressed2 = false);
    //instantiates physics between boxes and separate buttonZones to set variables
    this.physics.add.overlap(this.smallBox1, this.box1LargeButtonZone);
    this.box1LargeButtonZone.on('enterzone', () => smallOn1 = true);  
    this.box1LargeButtonZone.on('leavezone', () => smallOn1 = false);
    this.physics.add.overlap(this.smallBox2, this.box2LargeButtonZone);
    this.box2LargeButtonZone.on('enterzone', () => smallOn2 = true);  
    this.box2LargeButtonZone.on('leavezone', () => smallOn2 = false);
    this.physics.add.overlap(this.smallBox3, this.box3LargeButtonZone);
    this.box3LargeButtonZone.on('enterzone', () => smallOn3 = true);  
    this.box3LargeButtonZone.on('leavezone', () => smallOn3 = false);
    //add cameras that are set to the bounds of the map, and follows the player
    this.cameras.main.setBounds(0, 0, 1280, 640);
    this.cameras.roundPixels = true;
    this.cameras.main.startFollow(this.p1);
  }
  update(){
    this.p1.update();                                                                   //calls player update for controls
    this.ventZone1.update();                                                            //calls on zone update()
    this.ventZone2.update();
    this.ventZone3.update();
    this.ventZone4.update();
    this.ventZone5.update();
    this.ventZone6.update();
    this.ventZone7.update();
    this.ventZone8.update();
    this.ventZone9.update();
    this.ventZone10.update();
    this.ventZone11.update();
    this.ventZone12.update();
    this.smallButtonZone.update();
    this.box1LargeButtonZone.update();
    this.box2LargeButtonZone.update();
    this.box3LargeButtonZone.update();
    //restart mechanic by pressing "R"
    if(Phaser.Input.Keyboard.JustDown(keyR)){
      this.scene.start('levelFiveIntroScene');
    }
    //changes camera zoom based on player scale
    if(currentScale == 2){
      this.cameras.main.setZoom(1);
    }else if(currentScale == 0.5){
      this.cameras.main.setZoom(1.5);
    }else if(currentScale == 1){
      this.cameras.main.setZoom(1.25);
    }
    //gradually reveals more hints as the player takes more drugs
    this.puzzleSolver();
    //instantiate physics between player and door
    this.physics.world.collide(this.p1, this.door, this.atDoor, null, this);          
    if(currentScale > 0.5){
      this.physics.world.collide(this.p1, this.smallBox1, this.pickUpBox1, null, this);
      this.physics.world.collide(this.p1, this.smallBox2, this.pickUpBox2, null, this);
      this.physics.world.collide(this.p1, this.smallBox3, this.pickUpBox3, null, this);
    }
    //dropping box 
    if(currentScale> 0.5){
      if(pickedUpBox1 == true && Phaser.Input.Keyboard.JustDown(keySPACE) && this.p1.body.onFloor()){
        this.smallBox1.x = this.p1.x;
        this.smallBox1.y = this.p1.y-35;
        this.smallBox1.setVisible(true);
        this.smallBox1.body.enable = true;
        pickedUpBox1 = false;
        holdingBox = false;
      }
      if(pickedUpBox2 == true && Phaser.Input.Keyboard.JustDown(keySPACE) && this.p1.body.onFloor()){
        this.smallBox2.x = this.p1.x;
        this.smallBox2.y = this.p1.y-35;
        this.smallBox2.setVisible(true);
        this.smallBox2.body.enable = true;
        pickedUpBox2 = false;
        holdingBox = false;
      }
      if(pickedUpBox3 == true && Phaser.Input.Keyboard.JustDown(keySPACE) && this.p1.body.onFloor()){
        this.smallBox3.x = this.p1.x;
        this.smallBox3.y = this.p1.y-35;
        this.smallBox3.setVisible(true);
        this.smallBox3.body.enable = true;
        pickedUpBox3 = false;
        holdingBox = false;
      }
    }
    //checks for any combination of boxes to set the large button down
    if((smallOn1 && smallOn2) || (smallOn1 && smallOn3) || (smallOn2 && smallOn3)){ 
      this.largeButton.setFrame(1);
      buttonPressed1 = true;
    }else{
      this.largeButton.setFrame(0);
      buttonPressed1 = false;     
    }
    //sets smallbutton as pressed if the box is overlapping button
    if(buttonPressed2){ 
      this.smallButton.setFrame(1);
    }else{
      this.smallButton.setFrame(0);     
    }
    //sets exit as green if both buttons are pressed
    if(buttonPressed1 && buttonPressed2){
      this.exit.setFrame(1);
    }else{
      this.exit.setFrame(0);
    }
    //plays door opening animation and sound
    if(!buttonPressed1 || !buttonPressed2){
      this.anims.play('doorOpen', this.door);
      this.doorSound.play();                                      
    }  
  }
  //pick up Box    
  pickUpBox1(p1,smallBox1){
    if(Phaser.Input.Keyboard.JustDown(keySPACE) && !holdingBox  && smallBox1.body.onFloor()){
      this.smallBox1.setVisible(false);
      this.smallBox1.body.enable = false;
      pickedUpBox1 = true;
      holdingBox = true;
    } 
  }
  pickUpBox2(p1,smallBox2){
    if(Phaser.Input.Keyboard.JustDown(keySPACE) && !holdingBox && smallBox2.body.onFloor()){
      this.smallBox2.setVisible(false);
      this.smallBox2.body.enable = false;
      pickedUpBox2 = true;
      holdingBox = true;
    } 
  }
  pickUpBox3(p1,smallBox3){
    if(Phaser.Input.Keyboard.JustDown(keySPACE) && !holdingBox && smallBox3.body.onFloor()){
      this.smallBox3.setVisible(false);
      this.smallBox3.body.enable = false;
      pickedUpBox3 = true;
      holdingBox = true;
    }  
  }
  //door collision only allowed to continue if both buttons are pressed
  atDoor(){
    if(buttonPressed1 && buttonPressed2 && currentScale == 1){
      if(cursors.up.isDown && this.p1.body.onFloor()){
        this.scene.start('ExitLevelIntroScene');
      }
    }  
  }
  puzzleSolver(){
    switch(drugsTaken)
    {
      case 15: this.hint.setFrame(1);
      break;
      case 20: this.hint.setFrame(2);
      break;
      case 25: this.hint.setFrame(3);
      break;      
      default:
      break;
    }
  }
}