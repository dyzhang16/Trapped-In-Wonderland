class LevelOne extends Phaser.Scene{
    constructor(){
            super('levelOneScene');
    }

    preload(){
        this.load.image('cookie','./assets/Objects/updatedEatMe.png');        //load in all assets for level 1
        this.load.image('drink','./assets/Objects/updatedDrinkMe.png');
        this.load.image('tiles','./assets/Tiles/initialTileSheetPlatform.png');
        this.load.tilemapTiledJSON('map1','./assets/TileMaps/level1.json');
        this.load.image('level1Background', './assets/Backgrounds/level1Background.png');
        this.load.spritesheet('door', './assets/doorAnimation/initialDoor.png',{frameWidth: 64, frameHeight: 64, startFrame:0 , endFrame: 13});
        this.load.spritesheet('exitSign','./assets/doorAnimation/doorIndicator1.png',{frameWidth: 16, frameHeight: 16, startFrame:0 , endFrame: 1});
        this.load.spritesheet('playerIdle','./assets/AliceAnim/AliceV2StandingExtraPixel.png',{frameWidth: 30, frameHeight: 64, startFrame: 0, endFrame: 0});
        this.load.spritesheet('playerJump','./assets/AliceAnim/AliceV2Jump.png',{frameWidth: 30, frameHeight: 64, startFrame: 0, endFrame: 5});
        this.load.spritesheet('playerWalk','./assets/AliceAnim/AliceV2Walking.png',{frameWidth: 30, frameHeight: 64, startFrame:0, endFrame: 7});
        //this.load.spritesheet('playerPush','./assets/AliceAnim/AliceV2Pushing.png',{frameWidth: 30, frameHeight: 64, startFrame:0, endFrame: 5});
        this.load.audio('ScaleUp','./assets/soundFX/ScaleUp.mp3');                    //https://www.zapsplat.com/page/7/?s=jumping&post_type=music&sound-effect-category-id  
        this.load.audio('ScaleDown','./assets/soundFX/ScaleDown.mp3');                //https://www.zapsplat.com/page/7/?s=jumping&post_type=music&sound-effect-category-id  
      }
    create(){
        drugsTaken = 0;
        this.scaleUp = this.sound.add('ScaleUp',{volume: 0.1});                                      //add soundFX for eating and drinking(not implemented yet)
        this.scaleDown = this.sound.add('ScaleDown',{volume: 0.1});                                
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);  //reserve space e and q as interactable buttons
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        cursors = this.input.keyboard.createCursorKeys();                             //reserve arrow keys for movement
        let background = this.add.tileSprite(0,0,896,512,'level1Background').setOrigin(0,0);
        //add in level 1 tilemap and sets collision for tilemap
        const map1 = this.make.tilemap({key: 'map1'});                                //https://stackabuse.com/phaser-3-and-tiled-building-a-platformer/
        const tileset1 = map1.addTilesetImage('ScaleDistortionGameTileset','tiles',32,32,0,0);
        const platforms1 = map1.createStaticLayer('Platforms',tileset1,1,1);
        platforms1.setCollisionByProperty({collides: true});
        //add in door object and exitSign object 
        this.door = new Door(this, 800, 448,'door', 13).setOrigin(0.5);
        this.exit = new DoorIndicator(this, 800, 398, 'exitSign', 1).setOrigin(0.5);
        //add in player object and create animations(scale up and down animations bugged atm)
        this.p1 = new Player(this, 400, 100,'playerIdle').setOrigin(0.5,1); //bug with swapping different sized characters
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
        //add in cookie and drink objects
        this.cookie = new Cookie(this, 350, 432,'cookie').setOrigin(0.5);
        this.drink = new Drink(this, 70, 350,'drink').setOrigin(0.5);
        //creating a zone for the vent area where the player cannot scale up
        Ventzone1 = this.add.zone(565, 430).setSize(150, 60).setOrigin(0,0);    //https://www.html5gamedevs.com/topic/38895-making-a-zone/
        this.physics.world.enable(Ventzone1);
        Ventzone1.body.setAllowGravity(false);
        Ventzone1.body.moves = false;
        //instantiating physics 
        this.physics.add.collider(this.p1, platforms1);                     //physics between objects and map 
        this.physics.add.collider(this.door, platforms1);                   //to ensure they don't fall through
        this.physics.add.collider(this.cookie, platforms1);                 //the map 
        this.physics.add.collider(this.drink, platforms1);
        this.physics.add.overlap(this.p1, Ventzone1);                        //if player overlaps with ventzone
        Ventzone1.on('enterVzone', () => inSmallVent = true);                      //on entering zone, set to true
        Ventzone1.on('leaveVzone', () => inSmallVent = false);                     //when not overlapping, set to false

        this.cameras.main.setBounds(0, 0, 896, 512);
        this.cameras.main.setZoom(1.25);
        this.cameras.main.startFollow(this.p1);
      }
    update(){ 
      this.p1.update();                                                     //calls on player object update()
      
      this.puzzleSolver();
      if(Phaser.Input.Keyboard.JustDown(keySPACE)){                       //shortcut for debugging future levels
      this.scene.start('levelFiveScene');
      }

      if(currentScale == 2){
        this.cameras.main.setZoom(1);
      }else if(currentScale == 0.5){
        this.cameras.main.setZoom(1.5);
      }else if(currentScale == 1){
        this.cameras.main.setZoom(1.25);
      }
      this.physics.world.collide(this.p1, this.cookie, this.p1cookieCollision, null, this); //add physics for collision between player
      this.physics.world.collide(this.p1, this.drink, this.p1drinkCollision,null, this);    //and objects in the game
      this.physics.world.overlap(this.p1, this.door, this.atDoor, null, this);
      
      let Vtouching = Ventzone1.body.touching;                                //reserve variables for overlapping vent
      let VwasTouching = Ventzone1.body.wasTouching;                                   
      if (Vtouching.none && !VwasTouching.none) {                             //if not touching vent, set to leavezone                    
        Ventzone1.emit('leaveVzone');
      }
      else if (!Vtouching.none && VwasTouching.none) {                        //else if touching, set to enterzone
        Ventzone1.emit('enterVzone');
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
      if(cursors.up.isDown && this.p1.body.onFloor() && currentScale == 1){ //can only transition if the player is the right size
        this.scene.start('levelTwoScene');
      }
    }
    puzzleSolver(){
      switch(drugsTaken)
      {
        case 7:   let text1 = this.add.text(centerX - 150,centerY - textSpacer, '_h_ a__ __d c___d j___ h____r_._.',{ fontSize: '18px',fontStyle: 'bold', color: '#8B0000' }).setOrigin(0.5);
                  let text2 = this.add.text(centerX - 150,centerY, 'S__ d_a__ a__ _o_l_ ___ t_g____.___',{ fontSize: '18px',fontStyle: 'bold', color: '#8B0000' }).setOrigin(0.5);
          break;
        case 10:  let text3 = this.add.text(centerX - 150,centerY - textSpacer, 'S__ _t_ _n_ ___l_ _u_p _i__e_.___',{ fontSize: '18px', fontStyle: 'bold',  color: '#8B0000' }).setOrigin(0.5);
                  let text4 = this.add.text(centerX - 150,centerY, '_h_ _r___ ___ __u_d f__ _i__t_r_._.',{ fontSize: '18px',fontStyle: 'bold', color: '#8B0000' }).setOrigin(0.5);
          break;
        case 15:  let text5 = this.add.text(centerX - 150,centerY - textSpacer, '__e __e a__ _ou__ __m_ __gh____._',{ fontSize: '18px',fontStyle: 'bold', color: '#8B0000' }).setOrigin(0.5);
                  let text6 = this.add.text(centerX - 150,centerY, '__e ___nk _nd c____ _it ___h_e___._',{ fontSize: '18px',fontStyle: 'bold', color: '#8B0000' }).setOrigin(0.5);      
          break;      
        default:
          break;
      }
    }
}    