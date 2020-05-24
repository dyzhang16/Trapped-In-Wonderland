class Menu extends Phaser.Scene{
    constructor(){
            super('menuScene');
    }

    preload(){
        this.load.image('menuScreen','./assets/initialTitleScreen.png');
    }
    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);                //reserve Space key input
        this.menu = this.add.tileSprite(0,0,896,512,'menuScreen').setOrigin(0,0);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){           //Space to transition to Level 1
            this.scene.start('levelOneScene');
        }
    }    
}    