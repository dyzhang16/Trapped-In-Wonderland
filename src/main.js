/*                                          Trapped in Wonderland by SDC Collective 
                                    Collaborators: Shui Lau, Daniel Zhang, Carl Erez
                                              Date Completed May 7th, 2020
            For our Scale and Distortion Game, we chose to utilize scale as our main theme to focus with a little bit of distortion on 
        as a side theme. Our game's main mechanic focuses on scaling the size of Alice by taking drugs so that she can access certain 
        parts of the map to solve the puzzle and escape the facility. Alice can shrink smaller to enter vents or grow bigger to move 
        heavier boxes. The distortion theme is featured as taking too many drugs will cause Alice to hallucinate, allowing her to see 
        mythical creatures and phenomenons as well as hints to passing each level. */
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
            debug: false,
        }
    }
}

let game = new Phaser.Game(config);
//reserve key variables
let keySPACE, keyQ, keyE, keyR;
//reserve arrow keys                                     
let cursors;                                                        
//reserve variables for text and spacing                        
let centerX = game.config.width/2;                                  
let centerY = game.config.height/2;
const textSpacer = 36;
//variables for time and ingame states
let seconds = 0;                    //time
let currentScale = 1;               //currentSize of player                                     
let drugsTaken = 0;                 //number of drugs taken for puzzleSolver()
let breakingglass = 0;              //number of times glass broken for hidden ending
let cookieObtained = false;          //tracks if players have obtained the drug
let drinkObtained = false;           //to scale up or down
//boolean box variables
let pickedUpBox1 = false;           //tracks specific box picked up
let pickedUpBox2 = false;
let pickedUpBox3 = false;
let holdingBox = false;             //tracks if you are holding a box
let smallOn1 = false;               //tracks if a specific box is on a specific button
let smallOn2 = false;
let smallOn3 = false;
let smallOn4 = false;
let smallOn5 = false;
let smallOn6 = false;
let medOn = false;                 
//boolean vent variables
let inSmallVent = false;
let inMedVent = false;
//boolean button variables
let buttonPressed1 = false;
let buttonPressed2 = false;
let buttonPressed3 = false;
//boolean text display variables      
let intextZone = false;                                               




