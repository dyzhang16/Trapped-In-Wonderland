class LevelTwoIntro extends Phaser.Scene{
    constructor(){
            super('levelTwoIntroScene');
    }

    preload(){
        //load all assets for level 2
        this.load.image('level2Load','./assets/ScreenUI/level2Intro.png');
        this.load.tilemapTiledJSON('map2','./assets/TileMaps/level2.json');
        this.load.image('level2Background', './assets/Backgrounds/level2Background.png');
        this.load.image('medBox','./assets/Objects/heavyObstacleMedium.png');
        this.load.image('smallBox','./assets/Objects/smallObstacle.png');
        this.load.image('textBox', './assets/TextBubbles/boxPickupText.png');
        this.load.spritesheet('level2Hint', './assets/Hints/level2Hints.png',{frameWidth: 896, frameHeight: 512,startFrame: 0, endFrame: 3});
        this.load.spritesheet('button','./assets/Objects/buttonSpriteSheet.png',{frameWidth:32, frameHeight: 32, startFrame: 0 ,endFrame: 1});            
        this.load.audio('doorOpening','./assets/soundFX/doorOpening.mp3');     
      }
    create(){
        seconds = 0;
        drugsTaken = 0;
        buttonPressed1 = false;
        buttonPressed2 = false;
        intextZone = false;
        holdingBox = false;
        this.levelTwoIntro = this.add.tileSprite(0,0,896,512,'level2Load').setOrigin(0,0);
        this.Timer = this.time.addEvent({                         
          delay: 1000,                                                    //calls on LoadingTime() function every second
          callback: this.LoadingTime,
          callbackScope: this,
          loop: true
      });
      }
    update(){ 
      if(seconds > 3){
        this.scene.start('levelFiveIntroScene');                                                         
      }
      console.log(seconds);
    }
    LoadingTime(){
      seconds++;
    } 
}