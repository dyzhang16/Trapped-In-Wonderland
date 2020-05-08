class LevelTwo extends Phaser.Scene{
    constructor(){
            super('levelTwoScene');
    }

    preload(){
    }
    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.text(centerX,centerY, 'this is level two',{ fontSize: '22px', color: '#FFF' }).setOrigin(0.5);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){           //left Click transition to next scene
            this.scene.start('menuScene');
        }
    }    
}   