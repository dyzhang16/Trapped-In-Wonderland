class LevelFourIntro extends Phaser.Scene{
    constructor(){
            super('levelFourIntroScene');
    }

    preload(){
      //load all assets for level 4
      this.load.tilemapTiledJSON('map4','./assets/TileMaps/level4.json');
      this.load.image('level4Background', './assets/Backgrounds/level4Background.png');
      this.load.image('level4Load','./assets/ScreenUI/level4Intro.png');
      this.load.spritesheet('level4Hint', './assets/Hints/level4Hints.png',{frameWidth: 1280, frameHeight: 640,startFrame: 0, endFrame: 3});
    }
    create(){
        seconds = 0;
        drugsTaken = 0;
        currentScale = 1;
        buttonPressed1 = false;
        buttonPressed2 = false;
        buttonPressed3 = false;
        smallOn1 = false;
        smallOn2 = false;
        smallOn3 = false;
        smallOn4 = false;
        smallOn5 = false;
        smallOn6 = false;
        pickedUpBox1 = false;
        pickedUpBox2 = false;
        pickedUpBox3 = false;
        holdingBox = false;   
        game.scale.resize(896,512); // resize after level 3
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
        this.scene.start('levelFourScene');                                                       
      }
      console.log(seconds);
    }
    LoadingTime(){
      seconds++;
    } 
}