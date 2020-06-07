class Menu extends Phaser.Scene{
    constructor(){
            super('menuScene');
    }

    preload(){
        this.load.image('GameTitle','./assets/ScreenUI/newTitleScreen.png');             //load all assets used in Menu
        this.load.spritesheet('Play','./assets/ScreenUI/PlayButton.png',{frameWidth: 234, frameHeight: 72, startFrame:0 , endFrame: 1});
        this.load.spritesheet('Controls','./assets/ScreenUI/ControlsButton.png',{frameWidth: 184, frameHeight: 77, startFrame:0 , endFrame: 1});
        this.load.spritesheet('Credits','./assets/ScreenUI/CreditsButton.png',{frameWidth: 353/2, frameHeight: 72, startFrame:0 , endFrame: 1});
        
    }
    create(){
        this.menu = this.add.image(centerX - textSpacer, centerY - textSpacer * 1, 'GameTitle').setOrigin(0.5).setScale(0.75);
        //creating text image that are interactables
        let play = this.add.image(centerX, centerY + textSpacer, 'Play').setOrigin(0.5).setScale(0.5);
        let controls = this.add.image(centerX, centerY + textSpacer * 2, 'Controls').setOrigin(0.5).setScale(0.5);
        let credits = this.add.image(centerX, centerY + textSpacer * 3, 'Credits').setOrigin(0.5).setScale(0.5);        //https://www.joshmorony.com/adding-custom-fonts-to-your-phaser-game/
        //sets those images to interactable
        play.setInteractive();                              //https://www.youtube.com/watch?v=OS7neDUUhPE
        controls.setInteractive();
        credits.setInteractive();
        //Over mouse hover, highlights the text, mouseclick transitions to different scene
        play.on('pointerover', () => play.setFrame(1));
        play.on("pointerout", () => play.setFrame(0));
        play.on('pointerup', () => {this.scene.start('levelOneIntroScene');});
        controls.on('pointerover', () => controls.setFrame(1));
        controls.on("pointerout", () => controls.setFrame(0));
        controls.on('pointerup', () => {this.scene.start('instructionScene');});
        credits.on('pointerover', () => credits.setFrame(1));
        credits.on("pointerout", () => credits.setFrame(0));
        credits.on('pointerup', () => {this.scene.start('creditScene');});
    }
    update(){
    } 
}    