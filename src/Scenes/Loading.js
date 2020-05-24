class Loading extends Phaser.Scene{
    constructor(){
            super('loadingScene');
    }

    preload(){   
        this.load.audio('BGM','./assets/soundFX/backgroundMusic.mp3');              //https://www.fesliyanstudios.com/royalty-free-music/download/too-crazy/307
        this.load.audio('eatFX','./assets/soundFX/eating.wav');                     //http://soundbible.com/976-Eating.html
        this.load.audio('drinkFX','./assets/soundFX/drinking.wav');                 //http://soundbible.com/1502-Slurping-2.html                        
    }
    create(){
        seconds = 0;                                                            
        this.add.text(centerX,centerY, 'Loading....',{ fontSize: '22px', color: '#FFF' }).setOrigin(0.5);   
        this.difficultyTimer = this.time.addEvent({                         
            delay: 1000,                                                    //calls on TimePlayed() function
            callback: this.LoadingTime,
            callbackScope: this,
            loop: true
        });
        this.menumusic = this.sound.add('BGM',{volume: 0.3});                                       //add BGM
        this.menumusic.loop = true;                                                                 //loop music
        this.menumusic.play();                                                                      //play BGM
        //this.eatingFX = this.sound.add('eatFX',{volume: 0.1});                                      //add soundFX for eating and drinking(not implemented yet)
        //this.drinkingFX = this.sound.add('drinkFX',{volume: 0.1});                      
    }
    update(){
        if(seconds > 1){
            this.scene.start('menuScene');
        }
    }
    LoadingTime(){
        seconds++;
        //console.log(seconds);
    }   
}