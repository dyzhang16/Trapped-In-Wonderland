class Credits extends Phaser.Scene{
    constructor(){
            super('creditScene');
    }
    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.text(centerX,centerY - textSpacer, 'Congratulations you escaped the facility!',{ fontSize: '22px', color: '#FFF' }).setOrigin(0.5);
        this.add.text(centerX,centerY, 'Thanks for playing!',{ fontSize: '22px', color: '#FFF' }).setOrigin(0.5);
        this.add.text(centerX,centerY + textSpacer, 'created by SDC Collective',{ fontSize: '22px', color: '#FFF' }).setOrigin(0.5);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start('menuScene');
        }
    }
  }    
  