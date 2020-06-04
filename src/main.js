let config = {                                                      //set configuration for phaser game
    type: Phaser.CANVAS,                                            //game window is 896 by 512
    render: {
        pixelArt: true
    },
    width: 896, 
    height: 512,
    scene:[Loading, Menu, Instructions, LevelOneIntro, LevelOne, LevelTwo, LevelThree, LevelFour, LevelFive, Credits],
    physics:{                                                       //include arcadePhysics for phaser game
        default: "arcade",
        arcade:{
            gravity:{ y : 150},                                     //include gravity with a velocityY of 150
            debug: true
        }
    }
}

let game = new Phaser.Game(config);

let keySPACE, keyQ, keyE, keyR;                                     //reserve key variables
let cursors;                                                        //reserve arrow keys
                        
let centerX = game.config.width/2;                                  //reserve variables for text and spacing
let centerY = game.config.height/2;
const textSpacer = 36;
let seconds = 0;                                                    //tracks time

let currentScale = 1;                                               //tracks ingame variables and states
let drugsTaken = 0;
let cookieObtained = false;
let drinkObtained = false;
let pickedUpBox1 = false;
let pickedUpBox2 = false;
let pickedUpBox3 = false;
let holdingBox = false;
let inSmallVent = false;
let inMedVent = false;

let onButton1 = false;
let onButton2 = false;
let onButton3 = false;

let Ventzone1;                                                      //allocate variables for creating vents and buttons
let Ventzone2;
let Ventzone3;
let Ventzone4;
let Ventzone5;
let Ventzone6;
let Ventzone7;
let Ventzone8;
let Ventzone9;
let Ventzone10;
let Ventzone11;
let Ventzone12;

let buttonzone1;
let buttonzone2;
let buttonzone3;
