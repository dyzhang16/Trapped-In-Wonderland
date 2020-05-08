let config = {                                                      //set configuration for phaser game
    type: Phaser.CANVAS,                                            //game window is 640 by 480
    width: 880, 
    height: 480,
    scene:[Loading, Menu, LevelOne, LevelTwo],
}

let game = new Phaser.Game(config);

let keySPACE;
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let seconds = 0;