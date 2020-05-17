let config = {                                                      //set configuration for phaser game
    type: Phaser.CANVAS,                                            //game window is 640 by 480
    width: 896, 
    height: 512,
    scene:[Loading, Menu, LevelOne, LevelTwo, Credits],
    physics:{                                                       //include arcadePhysics for phaser game
        default: "arcade",
        arcade:{
            gravity:{ y : 150},
            debug: false
        }
    }
}

let game = new Phaser.Game(config);

let keySPACE, keyQ, keyE;
let currentScale = 1;
let cursors;
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let seconds = 0;
let cookieObtained = false;
let drinkObtained = false;
const textSpacer = 36;
let pickedUpBox = false;
let inVent = false;
let Ventzone;
let buttonzone1;
let buttonzone2;
let onButton1 = false;
let onButton2 = false;