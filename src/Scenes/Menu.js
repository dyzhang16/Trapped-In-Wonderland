class Menu extends Phaser.Scene{
    constructor(){
            super('menuScene');
    }

    preload(){
        this.load.audio('BGM','./assets/soundFX/backgroundMusic.mp3');              //https://www.fesliyanstudios.com/royalty-free-music/download/too-crazy/307
        this.load.audio('eatFX','./assets/soundFX/eating.wav');                     //http://soundbible.com/976-Eating.html
        this.load.audio('drinkFX','./assets/soundFX/drinking.wav');                 //http://soundbible.com/1502-Slurping-2.html
        this.load.image('menuScreen','./assets/initialTitleScreen.png');
    }
    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);                //reserve Space key input
        this.menu = this.add.tileSprite(0,0,896,512,'menuScreen').setOrigin(0,0);
        this.menumusic = this.sound.add('BGM',{volume: 0.3});                                       //add BGM
        this.menumusic.loop = true;                                                                 //loop music
        this.menumusic.play();                                                                      //play BGM
        this.eatingFX = this.sound.add('eatFX',{volume: 0.1});                                      //add soundFX for eating and drinking(not implemented yet)
        this.drinkingFX = this.sound.add('drinkFX',{volume: 0.1});
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){           //Space to transition to Level 1
            this.scene.start('levelOneScene');
        }
    }    
}    