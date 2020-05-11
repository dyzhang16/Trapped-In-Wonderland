class Loading extends Phaser.Scene{
    constructor(){
            super('loadingScene');
    }

    preload(){                           
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
    }
    update(){
        if(seconds > 1){
            this.scene.start('menuScene');
        }
    }
    LoadingTime(){
        seconds++;
        console.log(seconds);
    }   
}