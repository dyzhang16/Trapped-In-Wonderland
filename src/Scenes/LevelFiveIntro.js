class LevelFiveIntro extends Phaser.Scene{
    constructor(){
            super('levelFiveIntroScene');
    }

    preload(){
        this.load.image('level5Load','./assets/ScreenUI/level5Intro2.png');
      }
    create(){
        seconds = 0;
        this.levelFiveIntro = this.add.tileSprite(0,0,896,512,'level5Load').setOrigin(0,0);
        this.Timer = this.time.addEvent({                         
          delay: 1000,                                                    //calls on LoadingTime() function every second
          callback: this.LoadingTime,
          callbackScope: this,
          loop: true
      });
      }
    update(){ 
      if(seconds > 3){
        this.scene.start('levelFiveScene');                                                          //transitions to menuScreen after 1 second    
      }
      console.log(seconds);
    }
    LoadingTime(){
      seconds++;
    } 
}