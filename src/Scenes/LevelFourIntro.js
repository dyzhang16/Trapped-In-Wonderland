class LevelFourIntro extends Phaser.Scene{
    constructor(){
            super('levelFourIntroScene');
    }

    preload(){
        this.load.image('level4Load','./assets/ScreenUI/level4Intro.png');
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