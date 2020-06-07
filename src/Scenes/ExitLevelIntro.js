class ExitLevelIntro extends Phaser.Scene{
    constructor(){
            super('ExitLevelIntroScene');
    }

    preload(){
      //load all assets exitLevel
        this.load.image('exitLevelLoad','./assets/ScreenUI/level6Intro.png');
        this.load.spritesheet('exitLevelHint', './assets/Hints/ExitLevelHints.png',{frameWidth: 896, frameHeight: 512, startFrame: 0, endFrame: 3});
        this.load.tilemapTiledJSON('map6','./assets/TileMaps/ExitLevel.json');
        this.load.image('exitLevelBackground', './assets/Backgrounds/ExitLevelBackground.png');
        this.load.spritesheet('glassExit', './assets/doorAnimation/escapeWindow.png',{frameWidth: 64, frameHeight: 64, startFrame: 0,endFrame: 5});
        this.load.audio('GlassBreaking','./assets/soundFX/GlassShatter.mp3');  
      }
    create(){
        seconds = 0;
        currentScale = 1;
        inMedVent = false;
        drugsTaken = 0;
        breakingglass = 0;
        this.ExitLevelIntro = this.add.tileSprite(0,0,896,512,'exitLevelLoad').setOrigin(0,0);
        this.Timer = this.time.addEvent({                         
          delay: 1000,                                                    //calls on LoadingTime() function every second
          callback: this.LoadingTime,
          callbackScope: this,
          loop: true
      });
      }
    update(){ 
      if(seconds > 3){
        this.scene.start('ExitLevelScene');                                                         
      }
      console.log(seconds);
    }
    LoadingTime(){
      seconds++;
    } 
}