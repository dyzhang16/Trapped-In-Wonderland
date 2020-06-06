class Credits extends Phaser.Scene{
    constructor(){
            super('creditScene');
    }
    preload(){
        this.load.image('credits','./assets/ScreenUI/creditsScreen.png');
    }
    create(){                                                                       //end credits
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        game.scale.resize(896,512);
        this.credits = this.add.tileSprite(0,0,896,512,'credits').setOrigin(0,0);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start('menuScene');
        }
    }
  }    
  