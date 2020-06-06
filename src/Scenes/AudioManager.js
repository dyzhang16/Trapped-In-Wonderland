class Audio extends Phaser.Scene{
    constructor(){
            super({key:'AudioScene', active: true});
    }

    preload(){   
        this.load.audio('BGM','./assets/soundFX/backgroundMusic.mp3');              //https://www.fesliyanstudios.com/royalty-free-music/download/too-crazy/307                    
    }
    create(){
        this.menumusic = this.sound.add('BGM',{volume: 0.3});                                 //add BGM
        this.menumusic.loop = true;
        this.menumusic.play();                                                                      //play BGM 
    }
    update(){
    }
}