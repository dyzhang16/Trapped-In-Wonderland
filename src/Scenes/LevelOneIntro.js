class LevelOneIntro extends Phaser.Scene{
    constructor(){
            super('levelOneIntroScene');
    }

    preload(){
        this.load.image('level1Load','./assets/ScreenUI/level1Intro.png');
      }
    create(){
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
        this.scene.start('levelOneScene');                                                          //transitions to menuScreen after 1 second    
      }
      console.log(seconds);
    }
    LoadingTime(){
      seconds++;
    } 
}