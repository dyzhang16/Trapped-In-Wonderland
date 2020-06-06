class LevelFourIntro extends Phaser.Scene{
    constructor(){
            super('levelFourIntroScene');
    }

    preload(){
      this.load.tilemapTiledJSON('map4','./assets/TileMaps/level4.json');
      this.load.image('level4Background', './assets/Backgrounds/level4Background.png');
      this.load.image('level4Load','./assets/ScreenUI/level4Intro.png');
      this.load.spritesheet('level4Hint', './assets/Hints/level4Hints.png',{frameWidth: 1280, frameHeight: 640,startFrame: 0, endFrame: 3});
    }
    create(){
        seconds = 0;
        game.scale.resize(896,512);
        this.levelFourIntro = this.add.tileSprite(0,0,896,512,'level4Load').setOrigin(0,0);
        this.Timer = this.time.addEvent({                         
          delay: 1000,                                                    //calls on LoadingTime() function every second
          callback: this.LoadingTime,
          callbackScope: this,
          loop: true
      });
      }
    update(){ 
      if(seconds > 3){
        this.scene.start('levelFourScene');                                                          //transitions to menuScreen after 1 second    
      }
      console.log(seconds);
    }
    LoadingTime(){
      seconds++;
    } 
}