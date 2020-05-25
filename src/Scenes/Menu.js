class Menu extends Phaser.Scene{
    constructor(){
            super('menuScene');
    }

    preload(){
        this.load.image('GameTitle','./assets/TitleScreen/Alice.png');
        this.load.spritesheet('Play','./assets/TitleScreen/PlayButton.png',{frameWidth: 234, frameHeight: 72, startFrame:0 , endFrame: 1});
        this.load.spritesheet('Controls','./assets/TitleScreen/ControlsButton.png',{frameWidth: 184, frameHeight: 77, startFrame:0 , endFrame: 1});
        this.load.spritesheet('Credits','./assets/TitleScreen/CreditsButton.png',{frameWidth: 353/2, frameHeight: 72, startFrame:0 , endFrame: 1});
        
    }
    create(){
        this.title = this.add.image(centerX, centerY - textSpacer * 3, 'GameTitle').setOrigin(0.5).setScale(1.5);
        let play = this.add.image(centerX, centerY + textSpacer, 'Play', 0).setOrigin(0.5).setScale(0.5);
        let controls = this.add.image(centerX, centerY + textSpacer * 2, 'Controls').setOrigin(0.5).setScale(0.5);
        let credits = this.add.image(centerX, centerY + textSpacer * 3, 'Credits').setOrigin(0.5).setScale(0.5);
        play.setInteractive();
        controls.setInteractive();
        credits.setInteractive();
        play.on('pointerover', () => play.setFrame(1));
        play.on("pointerout", () => play.setFrame(0));
        play.on('pointerup', () => {this.scene.start('levelOneScene');});
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