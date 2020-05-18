class LevelOne extends Phaser.Scene{
    constructor(){
            super('levelOneScene');
    }

    preload(){
        this.load.image('cookie','./assets/initialEatMe.png');        //load in all assets for level 1
        this.load.image('drink','./assets/initialDrinkMe.png');
        this.load.image('tiles','./assets/Tiles/spritesheet.png');
        this.load.tilemapTiledJSON('map1','./assets/TileMaps/level1.json');
        this.load.spritesheet('door', './assets/doorAnimation/doorOpening.png',{frameWidth: 32, frameHeight: 32, startFrame:0 , endFrame: 4});
        this.load.spritesheet('playerIdle','./assets/Alice_Standing/initialAliceStandingMedium.png',{frameWidth: 23, frameHeight: 61, startFrame: 0, endFrame: 1});
        this.load.spritesheet('playerJump','./assets/Alice_Jumping/initialAliceJumpMedium.png',{frameWidth: 37, frameHeight: 61, startFrame: 0, endFrame: 6});
        this.load.spritesheet('playerWalk','./assets/Alice_Walking/initialAliceWalking.png',{frameWidth:28, frameHeight: 61, startFrame:0, endFrame: 5});
        this.load.spritesheet('playerSizeUp','./assets/initialAliceSizeUp.png',{frameWidth:46, frameHeight:122,startFrame:0, endFrame: 10 });
        this.load.spritesheet('playerSizeDown','./assets/initialAliceSizeUp.png',{frameWidth:66, frameHeight:122,startFrame:0, endFrame: 11 });
      }
    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);  //reserve space e and q as interactable buttons
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        cursors = this.input.keyboard.createCursorKeys();                             //reserve arrow keys for movement
        //instructions to solve puzzle(will implement disappearing and reappearing feature in the future)
        this.add.text(centerX,centerY, 'Press E to Increase',{ fontSize: '22px', color: '#FFF' }).setOrigin(0.5);
        this.add.text(centerX,centerY- textSpacer, 'Press Q to Decrease',{ fontSize: '22px', color: '#FFF' }).setOrigin(0.5);
        //add in level 1 tilemap and sets collision for tilemap
        const map1 = this.make.tilemap({key: 'map1'});                                //https://stackabuse.com/phaser-3-and-tiled-building-a-platformer/
        const tileset1 = map1.addTilesetImage('level1','tiles',32,32,0,0);
        const platforms1 = map1.createStaticLayer('Platforms',tileset1,0,0);
        platforms1.setCollisionByProperty({collides: true});
        //add in door object and create animations(animations still bugged atm)
        this.door = new Door(this, 800, 448,'door', 4).setOrigin(0.5).setScale(2);
        this.anims.create({
          key: 'door',
          repeat: -1,
          frames: this.anims.generateFrameNumbers('door', {start: 0, end: 4, first: 0}),
          frameRate: 12
        });
        //add in player object and create animations(scale up and down animations bugged atm)
        this.p1 = new Player(this, 400, 100,'playerIdle').setOrigin(0.5,1); //bug with swapping different sized characters
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
        //add in cookie and drink objects
        this.cookie = new Cookie(this, 350, 420,'cookie').setOrigin(0.5);
        this.drink = new Drink(this, 70, 300,'drink').setOrigin(0.5);
        //creating a zone for the vent area where the player cannot scale up
        Ventzone = this.add.zone(560, 300).setSize(155, 190).setOrigin(0,0);    //https://www.html5gamedevs.com/topic/38895-making-a-zone/
        this.physics.world.enable(Ventzone);
        Ventzone.body.setAllowGravity(false);
        Ventzone.body.moves = false;
        //instantiating physics 
        this.physics.add.collider(this.p1, platforms1);                     //physics between objects and map 
        this.physics.add.collider(this.door, platforms1);                   //to ensure they don't fall through
        this.physics.add.collider(this.cookie, platforms1);                 //the map 
        this.physics.add.collider(this.drink, platforms1);
        this.physics.add.overlap(this.p1, Ventzone);                        //if player overlaps with ventzone 
        Ventzone.on('enterzone', () => inVent = true);                      //on entering zone, set to true
        Ventzone.on('leavezone', () => inVent = false);                     //when not overlapping, set to false
    }
    update(){ 
      this.p1.update();                                                     //calls on player object update()
      /*if(Phaser.Input.Keyboard.JustDown(keySPACE)){                       //shortcut for debugging future levels
      this.scene.start('levelTwoScene');
      }*/
      this.physics.world.collide(this.p1, this.cookie, this.p1cookieCollision, null, this); //add physics for collision between player
      this.physics.world.collide(this.p1, this.drink, this.p1drinkCollision,null, this);    //and objects in the game
      this.physics.world.collide(this.p1, this.door, this.atDoor, null, this);
      
      let touching = Ventzone.body.touching;                                //reserve variables for overlapping vent
      let wasTouching = Ventzone.body.wasTouching;                                   
      if (touching.none && !wasTouching.none) {                             //if not touching vent, set to leavezone                    
        Ventzone.emit('leavezone');
      }
      else if (!touching.none && wasTouching.none) {                        //else if touching, set to enterzone
        Ventzone.emit('enterzone');
      }
    }    
    p1cookieCollision(){                                                    //called when p1 collides into the cookie object
      this.cookie.destroy();
      cookieObtained = true;                                                //sets variable to true to enable future use
      //console.log(cookieObtained);
    }
    p1drinkCollision(){                                                     //called when p1 collides into the drink object
      this.drink.destroy();
      drinkObtained = true;                                                 //sets variable to true to enable future use
      //console.log(drinkObtained);
    }
    atDoor(){                                                               //called when p1 collides into the door object
      //this.anims.play(door);                                              //animation bugged atm
      if(cursors.up.isDown && this.p1.body.onFloor() && currentScale == 1){ //can only transition if the player is the right size
        this.scene.start('levelTwoScene');
      }
    }
}    