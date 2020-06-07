class LevelFiveIntro extends Phaser.Scene{
    constructor(){
            super('levelFiveIntroScene');
    }

    preload(){
      //load all assets for level 5
        this.load.image('level5Load','./assets/ScreenUI/level5Intro2.png');
        this.load.tilemapTiledJSON('map5','./assets/TileMaps/level5.json');
        this.load.image('level5Background', './assets/Backgrounds/level5Background.png');
        this.load.spritesheet('level5Hint', './assets/Hints/level5Hints.png',{frameWidth: 1280, frameHeight: 640,startFrame: 0, endFrame: 3});
    }
    create(){
      drugsTaken = 0;
      buttonPressed1 = false;
      buttonPressed2 = false;
      pickedUpBox1 = false;
      pickedUpBox2 = false;
      pickedUpBox3 = false;
      smallOn1 = false;
      smallOn2 = false;
      smallOn3 = false;
      holdingBox = false;
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
        this.scene.start('levelFiveScene');                                                        
      }
      console.log(seconds);
    }
    LoadingTime(){
      seconds++;
    } 
}