class LevelTwoIntro extends Phaser.Scene{
    constructor(){
            super('levelTwoIntroScene');
    }

    preload(){
        this.load.image('level2Load','./assets/ScreenUI/level2Intro.png');
      }
    create(){
        seconds = 0;
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
        this.scene.start('levelTwoScene');                                                          //transitions to menuScreen after 1 second    
      }
      console.log(seconds);
    }
    LoadingTime(){
      seconds++;
    } 
}