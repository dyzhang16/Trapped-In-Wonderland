class Loading extends Phaser.Scene{
    constructor(){
            super({key: 'loadingScene', active: true});
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