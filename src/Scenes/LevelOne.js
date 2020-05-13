class LevelOne extends Phaser.Scene{
    constructor(){
            super('levelOneScene');
    }

    preload(){
        this.load.image('bigBox','./assets/Tiles/heavyObstacleLarge.png');
        this.load.image('medBox','./assets/Tiles/heavyObstacleMedium.png');
        this.load.image('smallBox','./assets/Tiles/smallObstacle.png');
        this.load.image('cookie','./assets/tempGrowth.png');
        this.load.image('drink','./assets/tempShrink.png');
        this.load.image('tiles','./assets/Tiles/spritesheet.png');
        this.load.tilemapTiledJSON('map1','./assets/TileMaps/level1.json');
        this.load.spritesheet('playerIdle','./assets/Alice_Standing/initialAliceStandingMedium.png',{frameWidth: 23, frameHeight: 61, startFrame: 0, endFrame: 1});
        this.load.spritesheet('playerJump','./assets/Alice_Jumping/initialAliceJumpMedium.png',{frameWidth: 37, frameHeight: 61, startFrame: 0, endFrame: 6});
    }
    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        cursors = this.input.keyboard.createCursorKeys();
        this.add.text(centerX,centerY, 'Press E to Increase',{ fontSize: '22px', color: '#FFF' }).setOrigin(0.5);
        this.add.text(centerX,centerY- textSpacer, 'Press Q to Decrease',{ fontSize: '22px', color: '#FFF' }).setOrigin(0.5);
        
        const map1 = this.make.tilemap({key: 'map1'});
        const tileset1 = map1.addTilesetImage('level1','tiles',32,32,0,0);
        const platforms1 = map1.createStaticLayer('Platforms',tileset1,0,0);
        const size1 = map1.createStaticLayer('Size',tileset1,0,0);
        platforms1.setCollisionByProperty({collides: true});
        size1.setCollisionByProperty({collides:true});
        size1.setCollisionByProperty({cookie: true});

        this.door1 = this.physics.add.group({
          allowGravity: false,
          immovable: true
        })
        const doorObject1 = map1.getObjectLayer('Door')['objects'];
        doorObject1.forEach(doorObject1 => {
        const door1 = this.door1.create(doorObject1.x, doorObject1.y, 'medBox').setOrigin(0,0);
        });

        this.p1 = new Player(this, 400, 100,'playerIdle').setOrigin(0.5,1);
        this.anims.create({                                 //basic movement animation
            key: 'p1Idle',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('playerIdle', {start: 0, end: 1, first: 0}),
            frameRate: 30
        });
        this.anims.create({                                 //basic movement animation
            key: 'p1Jump',
            frames: this.anims.generateFrameNumbers('playerJump', {start: 0, end: 4, first: 0}),
            frameRate: 5
        });

        this.cookie = new Cookie(this, 350, 420,'cookie').setOrigin(0.5);
        this.drink = new Drink(this, 70, 300,'drink').setOrigin(0.5);

        this.physics.add.collider(this.p1, platforms1);
        this.physics.add.collider(this.cookie, platforms1);
        this.physics.add.collider(this.drink, platforms1);
        this.physics.add.collider(this.p1, size1, this.UnabletoSizeUp, null, this);
        
    }
    update(){
      if(currentScale == 1){  
        if (cursors.left.isDown) {              
            this.p1.setVelocityX(-150);
            //needs animation
        } else if (cursors.right.isDown) {
            this.p1.setVelocityX(150);
            //needs animation
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
            //needs animation
          } else if (cursors.right.isDown) {
            this.p1.setVelocityX(125);
            //needs animation
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
            //needs animation
          } else if (cursors.right.isDown) {
            this.p1.setVelocityX(100);
            //needs animation
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
            //needs animation
          } else if (cursors.right.isDown) {
            this.p1.setVelocityX(175);
            //needs animation
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

        this.physics.world.collide(this.p1, this.cookie, this.p1cookieCollision, null, this); 
        this.physics.world.collide(this.p1, this.drink, this.p1drinkCollision,null, this);
        this.physics.world.collide(this.p1, this.door1, this.atDoor, null, this);
        
    }    
    p1cookieCollision(){
      this.cookie.destroy();
      cookieObtained = true;
      //console.log(cookieObtained);
    }
    p1drinkCollision(){
      this.drink.destroy();
      drinkObtained = true;
      //console.log(drinkObtained);
    }
    atDoor(){
      //play Door opening Animation
      if(cursors.up.isDown && this.p1.body.onFloor()){
        this.scene.start('levelTwoScene');
      }
    }
    UnabletoSizeUp(){
      console.log('you are touching the vent');
      if(Phaser.Input.Keyboard.JustDown(keyE) && currentScale < 4){
        this.p1.setScale(currentScale);
      }
    }
}    