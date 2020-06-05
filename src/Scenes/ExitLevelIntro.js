class ExitLevelIntro extends Phaser.Scene{
    constructor(){
            super('ExitLevelIntroScene');
    }

    preload(){
        this.load.image('exitLevelLoad','./assets/ScreenUI/level6Intro.png');
      }
    create(){
        seconds = 0;
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
        this.scene.start('ExitLevelScene');                                                          //transitions to menuScreen after 1 second    
      }
      console.log(seconds);
    }
    LoadingTime(){
      seconds++;
    } 
}