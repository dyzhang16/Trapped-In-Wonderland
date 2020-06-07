class LevelOneIntro extends Phaser.Scene{
    constructor(){
            super('levelOneIntroScene');
    }

    preload(){
        //load in all assets for level 1
        this.load.image('level1Load','./assets/ScreenUI/level1Intro.png');
        this.load.image('Pepe','./assets/Hints/PePe.png');
        this.load.image('cookie','./assets/Objects/updatedEatMe.png');        
        this.load.image('drink','./assets/Objects/updatedDrinkMe.png');
        this.load.image('textMove', './assets/TextBubbles/movementText.png');
        this.load.image('textDoor', './assets/TextBubbles/levelExitTextInvert.png');
        this.load.image('textDrink', './assets/TextBubbles/drinkMeText.png');
        this.load.image('textEat', './assets/TextBubbles/eatMeText.png');
        this.load.image('tiles','./assets/Tiles/finalTileSheet.png');
        this.load.tilemapTiledJSON('map1','./assets/TileMaps/level1.json');
        this.load.image('level1Background', './assets/Backgrounds/level1Background.png');
        this.load.spritesheet('level1Hint', './assets/Hints/level1Hints.png',{frameWidth: 896, frameHeight: 512,startFrame: 0, endFrame: 3});
        this.load.spritesheet('door', './assets/doorAnimation/initialDoor.png',{frameWidth: 64, frameHeight: 64, startFrame:0 , endFrame: 13});
        this.load.spritesheet('exitSign','./assets/doorAnimation/doorIndicator1.png',{frameWidth: 16, frameHeight: 16, startFrame:0 , endFrame: 1});
        this.load.spritesheet('playerIdle','./assets/AliceAnim/AliceV2StandingExtraPixel.png',{frameWidth: 30, frameHeight: 64, startFrame: 0, endFrame: 0});
        this.load.spritesheet('playerJump','./assets/AliceAnim/AliceV2Jump.png',{frameWidth: 30, frameHeight: 64, startFrame: 0, endFrame: 5});
        this.load.spritesheet('playerWalk','./assets/AliceAnim/AliceV2Walking.png',{frameWidth: 30, frameHeight: 64, startFrame:0, endFrame: 7});
        this.load.audio('ScaleUp','./assets/soundFX/ScaleUp.mp3');                    //https://www.zapsplat.com/page/7/?s=jumping&post_type=music&sound-effect-category-id  
        this.load.audio('ScaleDown','./assets/soundFX/ScaleDown.mp3');                //https://www.zapsplat.com/page/7/?s=jumping&post_type=music&sound-effect-category-id  
      }
    create(){
        cookieObtained = false;         //setting variables to false in case of reset
        drinkObtained = false;
        drugsTaken = 0;
        seconds = 0;
        this.levelOneIntro = this.add.tileSprite(0,0,896,512,'level1Load').setOrigin(0,0);
        this.Timer = this.time.addEvent({                         
          delay: 1000,                                                    //calls on LoadingTime() function every second
          callback: this.LoadingTime,
          callbackScope: this,
          loop: true
      });
      }
    update(){ 
      if(seconds > 3){
        this.scene.start('levelOneScene');                                                       
      }
      console.log(seconds);
    }
    LoadingTime(){
      seconds++;
    } 
}