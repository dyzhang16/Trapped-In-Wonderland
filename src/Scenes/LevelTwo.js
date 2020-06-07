class LevelTwo extends Phaser.Scene{
  constructor(){
          super('levelTwoScene');
  }
  preload(){
  }
  create(){
      //add soundFX for eating, drinking, door, and button
      this.scaleUp = this.sound.add('ScaleUp',{volume: 0.1});                                    
      this.scaleDown = this.sound.add('ScaleDown',{volume: 0.1});
      this.doorSound = this.sound.add('doorOpening',{volume: 0.3}, false);        //https://www.zapsplat.com/?s=elevator+door&post_type=music&sound-effect-category-id=
      //reserve variables for key inputs                            
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    
      keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      //reserve arrow keys for movement
      cursors = this.input.keyboard.createCursorKeys();
      //create background and hints         
      let background = this.add.tileSprite(0,0,896,512,'level2Background').setOrigin(0,0);
      this.hint = this.add.image(0,0,'level2Hint').setOrigin(0,0);
      //add in level 2 tilemap and sets collision for tilemap
      const map2 = this.make.tilemap({key: 'map2'});
      const tileset2 = map2.addTilesetImage('ScaleDistortionGameTileset','tiles',32,32,0,0);
      const platforms2 = map2.createStaticLayer('Platforms',tileset2,0,0);
      platforms2.setCollisionByProperty({collides: true});
      //add in door object and door exit and animations
      this.door = new Door(this, 800, 448,'door').setOrigin(0.5);
      this.anims.create({
        key: 'doorOpen',
        frames: this.anims.generateFrameNumbers('door', {start: 0, end: 13, first: 0}),
        frameRate: 12
      });  
      this.exit = new DoorIndicator(this, 800, 398, 'exitSign').setOrigin(0.5);
      //create button objects
      this.button1 = new Button(this,380,475,'button').setOrigin(0.5); 
      this.button2 = new Button(this,660,450,'button').setOrigin(0.5).setScale(2);
      //create small and medium box objects
      this.smallBox = new Box(this, 310,475,'smallBox').setOrigin(0.5);
      this.medBox = new Box(this,550,445,'medBox').setOrigin(0.5);
      //add in player object
      this.p1 = new Player(this, 110, 475,'playerIdle').setOrigin(0.5,1);
      //create text and zone  with variables
      this.moveText = this.add.sprite(328,64,'textBox');
      this.moveText.setVisible(false);
      //create zones for buttons to set variables
      this.smallButtonZone = new Zone(this, 380, 465, 32, 32).setOrigin(0.5);
      this.LargeButtonZone = new Zone(this, 660, 450, 64, 64).setOrigin(0.5);
      //create textZone to display text
      this.textZone = new Zone(this, 185, 330, 60, 60).setOrigin(0,0); 
      //instantiate physics between objects and map
      this.physics.add.collider(this.p1, platforms2);
      this.physics.add.collider(this.door,platforms2);
      this.physics.add.collider(this.button1,platforms2);
      this.physics.add.collider(this.button2,platforms2);
      this.physics.add.collider(this.smallBox, platforms2);
      this.physics.add.collider(this.medBox, platforms2);
      //instantiate physics between player and boxes
      this.physics.add.collider(this.p1, this.smallBox);
      this.physics.add.collider(this.p1, this.medBox, this.checkSize, null, this);  //checks if player is big enough to push box
      //instantiates physics between box and entering zones to set variables 
      this.physics.add.overlap(this.smallBox, this.smallButtonZone);
      this.smallButtonZone.on('enterzone', () => buttonPressed1 = true);
      this.smallButtonZone.on('leavezone', () => buttonPressed1 = false);
      this.physics.add.overlap(this.medBox, this.LargeButtonZone);
      this.LargeButtonZone.on('enterzone', () => buttonPressed2 = true);
      this.LargeButtonZone.on('leavezone', () => buttonPressed2 = false);
      //instantiates physics between player and entering zones to set variables
      this.physics.add.overlap(this.p1, this.textZone); 
      this.textZone.on('enterzone', () => intextZone = true);  
      this.textZone.on('leavezone', () => intextZone = false);  
      //creates a camera and sets bounds to map size and follows player
      this.cameras.main.setBounds(0, 0, 896, 512);
      this.cameras.roundPixels = true;
      this.cameras.main.startFollow(this.p1);   
  }
  update(){
    this.p1.update();                                                                 //calls player update for controls
    this.smallButtonZone.update();                                                    //calls on the zone Object Update()
    this.LargeButtonZone.update();
    this.textZone.update();
    //restart feature, upon pressing 'R'
    if(Phaser.Input.Keyboard.JustDown(keyR)){
      this.scene.start('levelTwoIntroScene');
    }
    //text Bubble positions
    this.moveText.x = this.p1.body.position.x+100;                                    
    this.moveText.y = this.p1.body.position.y-30;
    //changes camera zoom based on scale
    if(currentScale == 2){
      this.cameras.main.setZoom(1);
    }else if(currentScale == 0.5){
      this.cameras.main.setZoom(1.5);
    }else if(currentScale == 1){
      this.cameras.main.setZoom(1.25);
    }
    //Function gradually reveals hints as the player takes more and more drugs
    this.puzzleSolver();
    //instantiate physics between players and objects
    this.physics.world.collide(this.p1, this.door, this.atDoor, null, this);          
    //Prevents players from picking up boxes if they are small
    if(currentScale > 0.5){
      this.physics.world.overlap(this.p1, this.smallBox, this.pickUpBox, null, this);   
    }
    //Dropping a box using space, Player must be holding a box, on the ground, and larger than small
    if(holdingBox && Phaser.Input.Keyboard.JustDown(keySPACE) && this.p1.body.onFloor() && currentScale > 0.5){
      this.smallBox.x = this.p1.x;
      this.smallBox.y = this.p1.y-35;                             //drops the box a little bit higher than the player's y-coordinate to prevent the box from phasing through the map
      this.smallBox.setVisible(true);
      this.smallBox.body.enable = true;
      holdingBox = false;
    }
    //displays text if in textZone
    if(intextZone){                                                            
      this.moveText.setVisible(true);
    }else{
      this.moveText.setVisible(false);   
    }
    //sets small button to pushed down if a box is over the small button
    if(buttonPressed1){
      this.button1.setFrame(1);
    }else{
      this.button1.setFrame(0);
    }
    //sets large button to pushed down if a box is over the large button
    if(buttonPressed2){
      this.button2.setFrame(1);
    }else{
      this.button2.setFrame(0);
    }
    //sets exit to green if both buttons are pressed down
    if(buttonPressed1 && buttonPressed2){
      this.exit.setFrame(1);
    }
    else{
      this.exit.setFrame(0);
    }
    //plays the door opening animation as well as the door opening sound when both buttons are pressed(logic is wonky, but couldn't find a fix in time)
    if(!buttonPressed1 || !buttonPressed2){
      this.anims.play('doorOpen', this.door);
      this.doorSound.play();                                     
    }
  }
  //called while player is overlapping a box 
  pickUpBox(p1,smallBox){
    if(Phaser.Input.Keyboard.JustDown(keySPACE) && !holdingBox && smallBox.body.onFloor()){ //cannot be holding a box, the box must be on the floor, and pressing space
      this.smallBox.setVisible(false);
      this.smallBox.body.enable = false;
      holdingBox = true;
    } 
  }
  //called when the player collides with the door object
  atDoor(){
    if(buttonPressed1 && buttonPressed2 && currentScale == 1){  //both buttons must be pressed down, scale must be normal
      if(cursors.up.isDown && this.p1.body.onFloor()){          //while player is on the floor pressing the up arrow key
        this.scene.start('levelThreeIntroScene');
      }
    }  
  }
  //checks if player is large size to move the box, else sets the box to immovable
  checkSize(p1,Box){          
    if(currentScale < 2){
      Box.setImmovable();
    }else{
      Box.setImmovable(false);
    }
  }
  //gradually reveals hints the more drugs that are taken
  puzzleSolver(){
    switch(drugsTaken)
    {
      case 4:   this.hint.setFrame(1);
        break;
      case 7:  this.hint.setFrame(2);  
        break;
      case 10:  this.hint.setFrame(3);  
        break;      
      default:
        break;
    }
  }
}    
