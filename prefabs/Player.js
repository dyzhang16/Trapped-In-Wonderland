class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        //setting up Player Class
        let custom_body = new Phaser.Physics.Arcade.Body(scene.physics.world, this)     //https://phaser.discourse.group/t/character-class/4184/4
        this.body = custom_body;                                                                                                   
        this.setBounce(0);                                                    //bounce when hitting other object    
        this.setImmovable();                                                    //cannot be pushed by other objects
        this.destroyed = false;                                                 //variables for player state
        this.setCollideWorldBounds(true);                                       //bound by game window
        scene.add.existing(this);                                               //add to current scene
        scene.physics.add.existing(this);                                       //add object to existing scene
    }
    update(){ 
        if(currentScale == 1){
            if (cursors.left.isDown) {              
                this.setVelocityX(-150);
                if (this.body.onFloor()) {
                    this.anims.play('p1Walk', true);
                }
            } else if (cursors.right.isDown) {
                this.setVelocityX(150);
                if(this.body.onFloor()) {
                    this.anims.play('p1Walk', true);
                }   
            } else { 
                this.setVelocityX(0);
                if (this.body.onFloor()) {
                  this.anims.play('p1Idle',true);
                }
            }
            if (cursors.up.isDown && this.body.onFloor()) {
                //console.log('jump');
                this.setVelocityY(-150);
                this.anims.play('p1Jump',true);
            }   
        } else if(currentScale == 2){
            if (cursors.left.isDown) {              
                this.setVelocityX(-125);
                if (this.body.onFloor()) {
                    this.anims.play('p1Walk', true);
                }
            } else if (cursors.right.isDown) {
                this.setVelocityX(125);
                if (this.body.onFloor()) {
                  this.anims.play('p1Walk', true);
                }
            } else {
                this.setVelocityX(0);
                if (this.body.onFloor()) {
                  this.anims.play('p1Idle',true);
                }
            }
            if (cursors.up.isDown && this.body.onFloor()) {
                this.setVelocityY(-175);
                this.anims.play('p1Jump',true);
            }
        } else if(currentScale == 4){
            if (cursors.left.isDown) {              
                this.setVelocityX(-100);
                if (this.body.onFloor()) {
                    this.anims.play('p1Walk', true);
                }
            } else if (cursors.right.isDown) {
                this.setVelocityX(100);
                if (this.body.onFloor()) {
                    this.anims.play('p1Walk', true);
                }
            } else {
                this.setVelocityX(0);
                if (this.body.onFloor()) {
                    this.anims.play('p1Idle',true);
                }
            }
            if (cursors.up.isDown && this.body.onFloor()) {
                this.setVelocityY(-200);
                this.anims.play('p1Jump',true);
            }
        } else if(currentScale == 0.5){
            if (cursors.left.isDown) {              
                this.setVelocityX(-175);
                if (this.body.onFloor()) {
                    this.anims.play('p1Walk', true);
                }
            } else if (cursors.right.isDown) {
                this.setVelocityX(175);
                if (this.body.onFloor()) {
                    this.anims.play('p1Walk', true);
                }
            } else {
                this.setVelocityX(0);
                if (this.body.onFloor()) {
                    this.anims.play('p1Idle',true);
                }
            }
            if (cursors.up.isDown && this.body.onFloor()) {
                this.setVelocityY(-125);
                this.anims.play('p1Jump',true);
            }
        }  
        if (this.body.velocity.x > 0) {
            this.setFlipX(false);
        } else if (this.body.velocity.x < 0) {
            // otherwise, make them face the other side
            this.setFlipX(true);
        }
        if(cookieObtained == true && this.body.onFloor()){
            if(Phaser.Input.Keyboard.JustDown(keyE) && currentScale < 4 && inVent == false){
                this.setScale(2*currentScale);
                currentScale = 2*currentScale;
                //this.eatingFX.play();
                //this.play('p1SizeUp');
                //console.log('CurrentScale is:', currentScale);
            }
        }
        if(drinkObtained == true && this.body.onFloor()){
            if(Phaser.Input.Keyboard.JustDown(keyQ) && currentScale > 0.5){
                this.setScale(currentScale * 0.5);
                currentScale = 0.5*currentScale;
                //this.drinkingFX.play();
                //this.play('p1SizeDown');
                //console.log('CurrentScale is:', currentScale);
            }
        }
    }   
}