let config = {                                                      //set configuration for phaser game
    type: Phaser.CANVAS,                                            //game window is 896 by512
    width: 896, 
    height: 512,
    scene:[Loading, Menu, LevelOne, LevelTwo, Credits],
    physics:{                                                       //include arcadePhysics for phaser game
        default: "arcade",
        arcade:{
            gravity:{ y : 150},                                     //include gravity with a velocityY of 150
            debug: true
        }
    }
}

let game = new Phaser.Game(config);

let keySPACE, keyQ, keyE;                                           //reserve key variables
let cursors;                                                        //reserve arrow keys
                        
let centerX = game.config.width/2;                                  //reserve variables for text and spacing
let centerY = game.config.height/2;
const textSpacer = 36;

let seconds = 0;                                                    //tracks time

let currentScale = 1;                                               //tracks ingame variables and states
let cookieObtained = false;
let drinkObtained = false;
let pickedUpBox = false;
let inVent = false;
let Ventzone;
let buttonzone1;
let buttonzone2;
let onButton1 = false;
let onButton2 = false;