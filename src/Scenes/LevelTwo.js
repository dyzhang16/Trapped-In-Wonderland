class LevelTwo extends Phaser.Scene{
  constructor(){
          super('levelTwoScene');
  }

  preload(){
      this.load.image('bigBox','./assets/Tiles/heavyObstacleLarge.png');
      this.load.image('medBox','./assets/Tiles/heavyObstacleMedium.png');
      this.load.image('smallBox','./assets/Tiles/smallObstacle.png');
      this.load.image('cookie','./assets/tempGrowth.png');
      this.load.image('drink','./assets/tempShrink.png');
      this.load.image('tiles','./assets/Tiles/spritesheet.png');
      this.load.tilemapTiledJSON('map2','./assets/TileMaps/level2.json');
      this.load.spritesheet('playerIdle','./assets/Alice_Standing/initialAliceStandingMedium.png',{frameWidth: 23, frameHeight: 61, startFrame: 0, endFrame: 1});
      this.load.spritesheet('playerJump','./assets/Alice_Jumping/initialAliceJumpMedium.png',{frameWidth: 37, frameHeight: 61, startFrame: 0, endFrame: 6});
      this.load.spritesheet('playerWalk','./assets/Alice_Walking/initialAliceWalking.png',{frameWidth:28, frameHeight: 61, startFrame:0, endFrame: 5})
    }
  create(){
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
      cursors = this.input.keyboard.createCursorKeys();
      this.add.text(centerX,centerY, 'Push the Boxes',{ fontSize: '22px', color: '#FFF' }).setOrigin(0.5);
      this.add.text(centerX,centerY + textSpacer, 'on button to open Door',{ fontSize: '22px', color: '#FFF' }).setOrigin(0.5);
      
      const map2 = this.make.tilemap({key: 'map2'});
      const tileset2 = map2.addTilesetImage('level2','tiles',32,32,0,0);
      const platforms2 = map2.createStaticLayer('Platforms',tileset2,0,0);
      platforms2.setCollisionByProperty({collides: true});
      this.door2 = this.physics.add.group({
        allowGravity: false,
        immovable: true
      })
      const doorObject2 = map2.getObjectLayer('Door')['objects'];
      doorObject2.forEach(doorObject2 => {
      const door2 = this.door2.create(doorObject2.x, doorObject2.y, 'medBox').setOrigin(0,0);
      });

      this.p1 = new Player(this, 110, 473,'playerIdle').setOrigin(0.5,1);
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

      this.physics.add.collider(this.p1, platforms2);

      this.smallBox = new SmallBox(this, 350,400,'smallBox').setOrigin(0.5);
      this.physics.add.collider(this.smallBox, platforms2);
      this.physics.add.collider(this.p1, this.smallBox);
      //this.physics.add.collider(this.p1,this.smallBox,this.pickUpBox,null, this);    
  }

  update(){
    if(currentScale == 1){  
      if (cursors.left.isDown) {              
          this.p1.setVelocityX(-150);
          if (this.p1.body.onFloor()) {
            this.p1.anims.play('p1Walk', true);
          }
      } else if (cursors.right.isDown) {
          this.p1.setVelocityX(150);
          if(this.p1.body.onFloor()) {
            this.p1.anims.play('p1Walk', true);
          }  
      } else { 
          this.p1.setVelocityX(0);
          if (this.p1.body.onFloor()) {
            this.p1.anims.play('p1Idle',true);
          }
        }
      if (cursors.up.isDown && this.p1.body.onFloor()) {
        //console.log('jump');
        this.p1.setVelocityY(-150);
        this.p1.play('p1Jump',true);
      }
    } else if(currentScale == 2){
        if (cursors.left.isDown) {              
          this.p1.setVelocityX(-125);
          if (this.p1.body.onFloor()) {
            this.p1.anims.play('p1Walk', true);
          }
        } else if (cursors.right.isDown) {
          this.p1.setVelocityX(125);
          if (this.p1.body.onFloor()) {
            this.p1.anims.play('p1Walk', true);
          }
        } else {
          this.p1.setVelocityX(0);
          if (this.p1.body.onFloor()) {
            this.p1.anims.play('p1Idle',true);
          }
        }
        if (cursors.up.isDown && this.p1.body.onFloor()) {
          this.p1.setVelocityY(-175);
          this.p1.play('p1Jump',true);
        }
    } else if(currentScale == 4){
        if (cursors.left.isDown) {              
          this.p1.setVelocityX(-100);
          if (this.p1.body.onFloor()) {
            this.p1.anims.play('p1Walk', true);
          }
        } else if (cursors.right.isDown) {
          this.p1.setVelocityX(100);
          if (this.p1.body.onFloor()) {
            this.p1.anims.play('p1Walk', true);
          }
        } else {
          this.p1.setVelocityX(0);
          if (this.p1.body.onFloor()) {
            this.p1.anims.play('p1Idle',true);
          }
        }
        if (cursors.up.isDown && this.p1.body.onFloor()) {
          this.p1.setVelocityY(-200);
          this.p1.play('p1Jump',true);
        }
    } else if(currentScale == 0.5){
        if (cursors.left.isDown) {              
          this.p1.setVelocityX(-175);
          if (this.p1.body.onFloor()) {
            this.p1.anims.play('p1Walk', true);
          }
        } else if (cursors.right.isDown) {
          this.p1.setVelocityX(175);
          if (this.p1.body.onFloor()) {
            this.p1.anims.play('p1Walk', true);
          }
        } else {
          this.p1.setVelocityX(0);
          if (this.p1.body.onFloor()) {
            this.p1.anims.play('p1Idle',true);
          }
        }
        if (cursors.up.isDown && this.p1.body.onFloor()) {
          this.p1.setVelocityY(-125);
          this.p1.play('p1Jump',true);
        }
      } 
    if (this.p1.body.velocity.x > 0) {
      this.p1.setFlipX(false);
    } else if (this.p1.body.velocity.x < 0) {
      // otherwise, make them face the other side
        this.p1.setFlipX(true);
      }

      if(cookieObtained == true && this.p1.body.onFloor()){
        if(Phaser.Input.Keyboard.JustDown(keyE) && currentScale < 4){
          this.p1.setScale(2*currentScale);
          currentScale = 2*currentScale;
          //console.log('CurrentScale is:', currentScale);
        }
      }
      if(drinkObtained == true && this.p1.body.onFloor()){
        if(Phaser.Input.Keyboard.JustDown(keyQ) && currentScale > 0.5){
          this.p1.setScale(currentScale * 0.5);
          currentScale = 0.5*currentScale;
          //console.log('CurrentScale is:', currentScale);
        }
      }
      /*if(pickedUpBox == true && Phaser.Input.Keyboard.JustDown(keySPACE)){
        this.smallBox = new SmallBox(this,this.p1.x,this.p1.y,'smallBox').setOrigin(0.5,1);
        pickedUpBox = false;
      }*/

      this.physics.world.collide(this.p1, this.door2, this.atDoor, null, this);
      
  }    
  /*pickUpBox(p1,smallBox){
    if(Phaser.Input.Keyboard.JustDown(keySPACE)){
      smallBox.destroy();
      //animation to pickup box
      pickedUpBox = true;
    } 
  }*/
  atDoor(){
    if(cursors.up.isDown && this.p1.body.onFloor()){
      this.scene.start('menuScene');
    }
  }
}    
