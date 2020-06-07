class EndingTwo extends Phaser.Scene{
    constructor(){
            super('EndingTwoScene');
    }
    preload(){
        this.load.image('endingTwo','./assets/ScreenUI/returnText.png');
    }
    create(){                                                                       
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.endingTwo = this.add.tileSprite(0,0,896,512,'endingTwo').setOrigin(0,0);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start('levelOneIntroScene');
        }
    }
  }    