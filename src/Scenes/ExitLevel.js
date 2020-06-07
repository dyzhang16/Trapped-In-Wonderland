class ExitLevel extends Phaser.Scene{
    constructor(){
            super('ExitLevelScene');
    }
  
    preload(){
      }
    create(){
        //add soundFX for eating and drinking(not implemented yet) 
        this.scaleUp = this.sound.add('ScaleUp',{volume: 0.1});                                      
        this.scaleDown = this.sound.add('ScaleDown',{volume: 0.1});
        this.glassbreaking = this.sound.add('GlassBreaking', {volume: 0.1});
        //reserve variables for key inputs                                      
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //reserve arrow keys for movement
        cursors = this.input.keyboard.createCursorKeys();                              
        //add in level 2 tilemap and sets collision for tilemap
        let background = this.add.tileSprite(0,0,896,512,'exitLevelBackground').setOrigin(0,0);
        this.hint = this.add.image(0,0,'exitLevelHint').setOrigin(0,0);
        const map6 = this.make.tilemap({key: 'map6'});
        const tileset6 = map6.addTilesetImage('ScaleDistortionGameTileset','tiles',32,32,0,0);
        const platforms6 = map6.createStaticLayer('Platforms',tileset6,0,0).setOrigin(0.5);
        platforms6.setCollisionByProperty({collides: true});
        //add in door object and exit
        this.door = new Door(this, 700, 320,'door', 13).setOrigin(0.5);
        this.exit = new DoorIndicator(this, 700, 270, 'exitSign', 1).setOrigin(0.5);
        this.glassExit = new Door (this, 400, 290, 'glassExit', 0).setOrigin(0.5);
        //add in player object 
        this.p1 = new Player(this, 120, 355,'playerIdle').setOrigin(0.5,1);
        //instantiate physics between objects and map
        this.physics.add.collider(this.p1, platforms6);
        this.physics.add.collider(this.door,platforms6);
        this.physics.add.collider(this.glassExit, platforms6);
        //add camera that is the size of the map and follows the player
        this.cameras.main.setBounds(0, 0, 896, 512);
        this.cameras.roundPixels = true;
        this.cameras.main.startFollow(this.p1);
    }
  
    update(){
      this.p1.update();                                                                   //calls player update for controls
      //restart mechanic upon pressing "R"
      if(Phaser.Input.Keyboard.JustDown(keyR)){
        this.scene.start('ExitLevelIntroScene');
      }
      //gradually reveals hints as player takes drugs
      this.puzzleSolver();
      //camera zoom changes based on size of player
      if(currentScale == 2){
        this.cameras.main.setZoom(1);
      }else if(currentScale == 0.5){
        this.cameras.main.setZoom(1.5);
      }else if(currentScale == 1){
        this.cameras.main.setZoom(1.25);
      }
      //instantiate physics between player and objects
      this.physics.world.collide(this.p1, this.door, this.atDoor, null, this);          
      this.physics.world.collide(this.p1, this.glassExit, this.atGlassDoor, null, this);          
    }
    //door collision 
    atDoor(){
      if(currentScale == 1){
        if(cursors.up.isDown && this.p1.body.onFloor()){
          this.scene.start('EndingTwoScene');
        }
      }  
    }
    //glass door collision(hidden ending)
    atGlassDoor(){
      if(breakingglass < 5){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
          breakingglass += 1;
          this.glassExit.setFrame(breakingglass);
          this.glassbreaking.play();
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
    puzzleSolver(){
      switch(drugsTaken)
      {
        case 6: this.hint.setFrame(1);
        break;
        case 10: this.hint.setFrame(2);
        break;
        case 12: this.hint.setFrame(3);
        break;      
        default:
        break;
      }
    }
}