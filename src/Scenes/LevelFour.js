class LevelFour extends Phaser.Scene{
    constructor(){
            super('levelFourScene');
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
        let background = this.add.tileSprite(0,0,1280,960,'level4Background').setOrigin(0,0);
        this.hint = this.add.image(0,0,'level4Hint').setOrigin(0,0);
        //add in level 2 tilemap and sets collision for tilemap
        const map4 = this.make.tilemap({key: 'map4'});
        const tileset4 = map4.addTilesetImage('ScaleDistortionGameTileset','tiles',32,32,0,0);
        const platforms4 = map4.createStaticLayer('Platforms',tileset4,0,0).setOrigin(0.5);
        platforms4.setCollisionByProperty({collides: true});
        //add in door object and exit
        this.door = new Door(this, 300, 225,'door').setOrigin(0.5);
        this.exit = new DoorIndicator(this, 300, 175, 'exitSign').setOrigin(0.5);
        //create button objects
        this.largeButton1 = new Button(this,200,225,'button').setOrigin(0.5).setScale(2);
        this.smallButton = new Button(this,250, 496,'button').setOrigin(0.5);
        this.largeButton2 = new Button(this,775,480,'button').setOrigin(0.5).setScale(2);
        //add small and medium box objects
        this.medBox = new Box(this, 720, 255,'medBox').setOrigin(0.5); 
        this.smallBox1 = new Box(this, 500, 120,'smallBox').setOrigin(0.5);
        this.smallBox2 = new Box(this, 1000, 120,'smallBox').setOrigin(0.5);
        this.smallBox3 = new Box(this, 795, 280,'smallBox').setOrigin(0.5);        
        //creating a zone for the vents to set variables
        this.ventZone1 = new Zone(this, 380, 25, 295, 110).setOrigin(0,0);   
        this.ventZone2 = new Zone(this, 380, 150, 50, 110).setOrigin(0,0);   
        this.ventZone3 = new Zone(this, 380, 575, 745, 35).setOrigin(0,0);   
        this.ventZone4 = new Zone(this, 1115, 100, 140, 515).setOrigin(0,0);   
        this.ventZone5 = new Zone(this, 860, 25, 260, 110).setOrigin(0,0);   
        //creating a zone for buttons to set variables         
        this.smallButtonZone = new Zone(this, 250, 496, 32, 32).setOrigin(0.5);
        this.largeButtonZone = new Zone(this, 775, 480, 64, 64).setOrigin(0.5);
        //creating two seperate zones for each box to set variables
        this.box1LargeButton1Zone = new Zone(this, 167, 230, 67, 10).setOrigin(0,0);         
        this.box2LargeButton1Zone = new Zone(this, 167, 240, 67, 10).setOrigin(0,0); 
        this.box3LargeButton1Zone = new Zone(this, 167, 250, 67, 10).setOrigin(0,0); 
        this.box1LargeButton2Zone = new Zone(this,740, 480, 67, 10).setOrigin(0,0); 
        this.box2LargeButton2Zone = new Zone(this, 740, 490, 67, 10).setOrigin(0,0); 
        this.box3LargeButton2Zone = new Zone(this, 740, 500, 67, 10).setOrigin(0,0); 
        //add in player object
        this.p1 = new Player(this, 80, 260,'playerIdle').setOrigin(0.5,1);
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
        //instantiate physics for zones for vent and set variables accordingly
        this.physics.add.overlap(this.p1, this.ventZone1);                         
        this.ventZone1.on('enterzone', () => inMedVent = true);               //different variables allow certain places to scale to normal       
        this.ventZone1.on('leavezone', () => inMedVent = false);      
        this.physics.add.overlap(this.p1, this.ventZone2);                         
        this.ventZone2.on('enterzone', () => inMedVent = true);                      
        this.ventZone2.on('leavezone', () => inMedVent = false);   
        this.physics.add.overlap(this.p1, this.ventZone3);                         
        this.ventZone3.on('enterzone', () => inSmallVent = true);             //whereas other variables prevent you from scaling at all                 
        this.ventZone3.on('leavezone', () => inSmallVent = false);   
        this.physics.add.overlap(this.p1, this.ventZone4);                         
        this.ventZone4.on('enterzone', () => inMedVent = true);                     
        this.ventZone4.on('leavezone', () => inMedVent = false);
        this.physics.add.overlap(this.p1, this.ventZone5);                        
        this.ventZone5.on('enterzone', () => inMedVent = true);                      
        this.ventZone5.on('leavezone', () => inMedVent = false);   
        //instantiates physics for button zones to set variables accordingly  
        this.physics.add.overlap(this.smallBox1, this.smallButtonZone);
        this.physics.add.overlap(this.smallBox2, this.smallButtonZone);
        this.physics.add.overlap(this.smallBox3, this.smallButtonZone);
        this.physics.add.overlap(this.medBox, this.smallButtonZone);
        this.smallButtonZone.on('enterzone', () => buttonPressed2 = true);      //certain variables trigger buttonPressed immediately
        this.smallButtonZone.on('leavezone', () => buttonPressed2 = false);
        this.physics.add.overlap(this.medBox, this.largeButtonZone);
        this.largeButtonZone.on('enterzone', () => medOn = true);             //whereas some variables check if multiple variables are true to 
        this.largeButtonZone.on('leavezone', () => medOn = false);            //trigger buttonPressed
        //instantiates physics for the buttons that can take multiple boxes
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
        //adds in a camera, sets it the map size and follows the player
        this.cameras.main.setBounds(0, 0, 1280, 640);
        this.cameras.roundPixels = true;
        this.cameras.main.startFollow(this.p1);
    }
  
    update(){
      this.p1.update();                                                                   //calls player update for controls
      this.ventZone1.update();                                                            //calls zone update()
      this.ventZone2.update();
      this.ventZone3.update();
      this.ventZone3.update();
      this.ventZone4.update();
      this.ventZone5.update();
      this.smallButtonZone.update();
      this.largeButtonZone.update();
      this.box1LargeButton1Zone.update();
      this.box2LargeButton1Zone.update();
      this.box3LargeButton1Zone.update();
      this.box1LargeButton2Zone.update();
      this.box2LargeButton2Zone.update();
      this.box3LargeButton2Zone.update();
      //restart mechanic, use "R" key
      if(Phaser.Input.Keyboard.JustDown(keyR)){
        this.scene.start('levelFourIntroScene');
      }
      //camera scale changes based on size of player
      if(currentScale == 2){
        this.cameras.main.setZoom(1);
      }else if(currentScale == 0.5){
        this.cameras.main.setZoom(1.5);
      }else if(currentScale == 1){
        this.cameras.main.setZoom(1.25);
      }
      //gradually reveals hints the more drugs that are taken
      this.puzzleSolver();
      //instantiate physics between player and door
      this.physics.world.collide(this.p1, this.door, this.atDoor, null, this);
      //pick up specific Box if not small size          
      if(currentScale > 0.5){
        this.physics.world.collide(this.p1, this.smallBox1, this.pickUpBox1, null, this);
        this.physics.world.collide(this.p1, this.smallBox2, this.pickUpBox2, null, this);
        this.physics.world.collide(this.p1, this.smallBox3, this.pickUpBox3, null, this);
      }
      //Dropping Box if picked up a Box, on the floor, and bigger than small size
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
      //checks for any 2 combination of small boxes on the first large button, then sets buttonPressed1 to true if true and buttonDown animation
      if((smallOn1 && smallOn2) || (smallOn1 && smallOn3) || (smallOn2 && smallOn3)){ 
        this.largeButton1.setFrame(1);
        buttonPressed1 = true;
      }else{
        this.largeButton1.setFrame(0);  
        buttonPressed1 = false;   
      }
      //checks if buttonPressed2 is true, then sets buttonDown animation
      if(buttonPressed2){ 
        this.smallButton.setFrame(1);
      }else{
        this.smallButton.setFrame(0);     
      }
      //checks for any 2 combination of small boxes or the medium box on the second large button, then sets buttonPressed3 to true if true and buttonDown animation
      if((smallOn4 && smallOn5) || (smallOn4 && smallOn6) || (smallOn5 && smallOn6) || (medOn)){ 
        this.largeButton2.setFrame(1);
        buttonPressed3 = true;
      }else{
        this.largeButton2.setFrame(0);
        buttonPressed3 = false;     
      }
      //if all three buttons are down, sets the exit to green
      if(buttonPressed1 && buttonPressed2 && buttonPressed3){ 
        this.exit.setFrame(1);
      }else { 
        this.exit.setFrame(0); 
      }
      //plays the doorOpen animation and soundFX
      if(!buttonPressed1 || !buttonPressed2 || !buttonPressed3){
        this.anims.play('doorOpen', this.door);
        this.doorSound.play();                                       
      }        
    }
    //picking up the box    
    pickUpBox1(p1,smallBox1){
      if(Phaser.Input.Keyboard.JustDown(keySPACE) && !holdingBox && smallBox1.body.onFloor()){
        this.smallBox1.setVisible(false);
        this.smallBox1.body.enable = false;
        pickedUpBox1 = true;          //tracks specific box 1
        holdingBox = true;
      } 
    }
    pickUpBox2(p1,smallBox2){
      if(Phaser.Input.Keyboard.JustDown(keySPACE) && !holdingBox && smallBox2.body.onFloor()){
        this.smallBox2.setVisible(false);
        this.smallBox2.body.enable = false;
        pickedUpBox2 = true;          //tracks specific box 2
        holdingBox = true;
      } 
    }
    pickUpBox3(p1,smallBox3){
      if(Phaser.Input.Keyboard.JustDown(keySPACE) && !holdingBox && smallBox3.body.onFloor()){
        this.smallBox3.setVisible(false);
        this.smallBox3.body.enable = false;
        pickedUpBox3 = true;          //tracks specific box 3
        holdingBox = true;
      } 
    }
    //door collision 
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
        case 25:  this.hint.setFrame(1);
          break;
        case 30:  this.hint.setFrame(2);
          break;
        case 40:  this.hint.setFrame(3);
          break; 
        default:
          break;
      }
    }
}
    