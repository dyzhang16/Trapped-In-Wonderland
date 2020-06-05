class LevelThreeIntro extends Phaser.Scene{
    constructor(){
            super('levelThreeIntroScene');
    }

    preload(){
        this.load.image('level3Load','./assets/ScreenUI/level3Intro.png');
      }
    create(){
        seconds = 0;
        game.scale.resize(896,512);
        this.levelThreeIntro = this.add.tileSprite(0,0,896,512,'level3Load').setOrigin(0,0);
        this.Timer = this.time.addEvent({                         
          delay: 1000,                                                    //calls on LoadingTime() function every second
          callback: this.LoadingTime,
          callbackScope: this,
          loop: true
      });
      }
    update(){ 
      if(seconds > 3){
        this.scene.start('levelThreeScene');                                                          //transitions to menuScreen after 1 second    
      }
      console.log(seconds);
    }
    LoadingTime(){
      seconds++;
    } 
}