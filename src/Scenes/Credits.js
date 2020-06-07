class Credits extends Phaser.Scene{
    constructor(){
            super('creditScene');
    }
    preload(){
        this.load.image('credits','./assets/ScreenUI/creditsScreen.png');
    }
    create(){                                                                      
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.credits = this.add.tileSprite(0,0,896,512,'credits').setOrigin(0,0);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){                                   //space to return to menu
            this.scene.start('menuScene');
        }
    }
  }    
  