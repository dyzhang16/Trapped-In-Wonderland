class LevelOne extends Phaser.Scene{
    constructor(){
            super('levelOneScene');
    }

    preload(){
    }
    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.text(centerX,centerY, 'this is level one',{ fontSize: '22px', color: '#FFF' }).setOrigin(0.5);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){           //left Click transition to next scene
            this.scene.start('levelTwoScene');
        }
    }    
}    