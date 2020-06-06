let config = {                                                      //set configuration for phaser game
    type: Phaser.CANVAS,                                            //game window is 896 by 512
    render: {
        pixelArt: true
    },
    width: 896, 
    height: 512,
    scene:[Audio, Loading, Menu, Instructions, LevelOneIntro, LevelOne, LevelTwoIntro ,LevelTwo, LevelThreeIntro, LevelThree, 
        LevelFourIntro, LevelFour, LevelFiveIntro, LevelFive, ExitLevelIntro, ExitLevel, EndingOne, EndingTwo, Credits],
    physics:{                                                       //include arcadePhysics for phaser game
        default: "arcade",
        arcade:{
            gravity:{ y : 150},                                     //include gravity with a velocityY of 150
            debug: true,
        }
    }
}

let game = new Phaser.Game(config);

let keySPACE, keyQ, keyE, keyR;                                     //reserve key variables
let cursors;                                                        //reserve arrow keys
                        
let centerX = game.config.width/2;                                  //reserve variables for text and spacing
let centerY = game.config.height/2;
const textSpacer = 36;
//variables for time and ingame states
let seconds = 0;                    //time
let currentScale = 1;               //currentSize of player                                     
let drugsTaken = 0;                 //number of drugs taken for puzzleSolver()
let breakingglass = 0;              //number of times glass broken for hidden ending
let cookieObtained = true;         //tracks if players have obtained the drug
let drinkObtained = true;          //to scale up or down
//boolean box variables
let pickedUpBox1 = false;           
let pickedUpBox2 = false;
let pickedUpBox3 = false;
let holdingBox = false;
let smallOn1 = false;
let smallOn2 = false;
let smallOn3 = false;
let smallOn4 = false;
let smallOn5 = false;
let smallOn6 = false;
let medOn1 = false;

let miniZone1 = false;                                               //variables for smaller vent for box overlap
let miniZone2 = false;
let miniZone3 = false;
let miniZone4 = false;
let miniZone5 = false;
let miniZone6 = false;
let miniZone7 = false;
//boolean vent variables
let inSmallVent = false;
let inMedVent = false;
//boolean button variables
let buttonPressed1 = false;
let buttonPressed2 = false;
let buttonPressed3 = false;
//variables for creating ventZones
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
//variables for creating buttonZones
let buttonzone1;
let buttonzone2;
let buttonzone3;
//variables for creating textZones      
let textVent4 = false;                                               //variable for texts bubble vents
let textVent5 = false;




