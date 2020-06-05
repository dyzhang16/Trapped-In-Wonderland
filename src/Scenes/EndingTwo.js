class EndingTwo extends Phaser.Scene{
    constructor(){
            super('EndingTwoScene');
    }
    preload(){
        this.load.image('endingTwo','./assets/ScreenUI/returnText.png');
    }
    create(){                                                                       //end credits
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        game.scale.resize(896,512);
        this.endingTwo = this.add.tileSprite(0,0,896,512,'endingTwo').setOrigin(0,0);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start('levelOneIntroScene');
        }
    }
  }    