class Instructions extends Phaser.Scene{
    constructor(){
            super('instructionScene');
    }

    preload(){
        this.load.image('Instructions','./assets/initialControlsScreen.png');
    }
    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);                //reserve Space key input
        this.Instructions = this.add.tileSprite(0,0,896,512,'Instructions').setOrigin(0,0);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){           //Space to transition to Level 1
            this.scene.start('menuScene');
        }
    }
}  