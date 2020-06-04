class Loading extends Phaser.Scene{
    constructor(){
            super('loadingScene');
    }

    preload(){   
        this.load.audio('BGM','./assets/soundFX/backgroundMusic.mp3');              //https://www.fesliyanstudios.com/royalty-free-music/download/too-crazy/307                    
    }
    create(){
        seconds = 0;                                                                //creating a timer for loading screen                  
        this.add.text(centerX,centerY, 'Loading....',{ fontSize: '22px', color: '#FFF' }).setOrigin(0.5);   
        this.Timer = this.time.addEvent({                         
            delay: 1000,                                                    //calls on LoadingTime() function every second
            callback: this.LoadingTime,
            callbackScope: this,
            loop: true
        });
        this.menumusic = this.sound.add('BGM',{volume: 0.3}, true);                                 //add BGM
        this.menumusic.play();                                                                      //play BGM     
    }
    update(){
        if(seconds > 1){
            this.scene.start('menuScene');                                                          //transitions to menuScreen after 1 second    
        }
    }
    LoadingTime(){
        seconds++;
    }   
}