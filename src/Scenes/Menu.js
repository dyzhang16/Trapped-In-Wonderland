class Menu extends Phaser.Scene{
    constructor(){
            super('menuScene');
    }

    preload(){
        this.load.audio('BGM','./assets/soundFX/backgroundMusic.mp3');              //https://www.fesliyanstudios.com/royalty-free-music/download/too-crazy/307
        this.load.audio('eatFX','./assets/soundFX/eating.wav');                     //http://soundbible.com/976-Eating.html
        this.load.audio('drinkFX','./assets/soundFX/drinking.wav');                 //http://soundbible.com/1502-Slurping-2.html
    }
    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.text(centerX,centerY, 'Press space to start!',{ fontSize: '22px', color: '#FFF' }).setOrigin(0.5);
        this.menumusic = this.sound.add('BGM',{volume: 0.3});
        this.menumusic.loop = true;   
        this.menumusic.play();
        this.eatingFX = this.sound.add('eatFX',{volume: 0.1});
        this.drinkingFX = this.sound.add('drinkFX',{volume: 0.1});
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){           //left Click transition to next scene
            this.scene.start('levelOneScene');
        }
    }    
}    