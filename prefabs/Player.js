class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        //setting up Player Class
        let custom_body = new Phaser.Physics.Arcade.Body(scene.physics.world, this)     //https://phaser.discourse.group/t/character-class/4184/4
        this.body = custom_body;                                                                                                   
        this.setBounce(0);                                                      //bounce when hitting other object    
        this.setImmovable();                                                    //cannot be pushed by other objects
        this.destroyed = false;                                                 //variables for player state
        //this.setCollideWorldBounds(true);                                       //bound by game window
        scene.add.existing(this);                                               //add to current scene
        scene.physics.add.existing(this);                                       //add object to existing scene
    }
    update(){ 
        //character movement
        if(currentScale == 1){                                                  //movement for individual sizes
            if (cursors.left.isDown) {                                          //left movement
                this.setVelocityX(-150);                                        //varying speeds depending size
                if (this.body.onFloor()) {
                    this.anims.play('p1Walk', true);
                }
            } else if (cursors.right.isDown) {                                  //right movement
                this.setVelocityX(150);
                if(this.body.onFloor()) {
                    this.anims.play('p1Walk', true);
                }   
            } else {                                                            //idle
                this.setVelocityX(0);                                           //no movement
                if (this.body.onFloor()) {
                  this.anims.play('p1Idle',true);
                }
            }
            if (cursors.up.isDown && this.body.onFloor()) {                     //jumping movement
                //console.log('jump');
                this.setVelocityY(-150);                                        
                this.anims.play('p1Jump',true);
            }   
        } else if(currentScale == 2){                                           //slower but can jump higher
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
        } else if(currentScale == 0.5){                                        //walks faster, but jumps shorter
            if (cursors.left.isDown) {              
                this.setVelocityX(-200);
                if (this.body.onFloor()) {
                    this.anims.play('p1Walk', true);
                }
            } else if (cursors.right.isDown) {
                this.setVelocityX(200);
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
                this.setVelocityY(-100);
                this.anims.play('p1Jump',true);
            }
        }  
        if (this.body.velocity.x > 0) {                                         //flips character if turning the opposite direction
            this.setFlipX(false);
        } else if (this.body.velocity.x < 0) {
            // otherwise, make them face the other side
            this.setFlipX(true);
        }
        if(cookieObtained == true && this.body.onFloor()){                      //sizeUp upon eating cookie
            if(inSmallVent == true){
                //text dialogue for too small!
                console.log('Too Small!');
            }else if(inMedVent == true){
                if(Phaser.Input.Keyboard.JustDown(keyE) && currentScale < 1){   //can scale up to 2x original size
                    this.setScale(2*currentScale);                                  //but can only scale up provided not in a vent
                    currentScale = 2*currentScale;                                  //sets scale and keep track of current scale
                    drugsTaken += 1;
                    console.log(drugsTaken);
                    console.log('Medium Vent!');
                    //this.eatingFX.play();                                         //bugged eating sound
                    //this.play('p1SizeUp');                                        //bugged sizeUp animation
                    //console.log('CurrentScale is:', currentScale);
                }
            } else {
                if(Phaser.Input.Keyboard.JustDown(keyE) && currentScale < 2){   //can scale up to 2x original size
                this.setScale(2*currentScale);                                  //but can only scale up provided not in a vent
                currentScale = 2*currentScale;                                  //sets scale and keep track of current scale
                drugsTaken += 1;
                console.log(drugsTaken);
                //this.eatingFX.play();                                         //bugged eating sound
                //this.play('p1SizeUp');                                        //bugged sizeUp animation
                //console.log('CurrentScale is:', currentScale);
                }   
            }
        }
        if(drinkObtained == true && this.body.onFloor()){                       //sizeDown upon drinking drink
            if(Phaser.Input.Keyboard.JustDown(keyQ) && currentScale > 0.5){ //can shrink to half size
                this.setScale(currentScale * 0.5);                          //sets scale and keeps track of current scale
                currentScale = 0.5*currentScale;
                drugsTaken += 1;
                console.log(drugsTaken);        
                //this.drinkingFX.play();                                   //bugged drinking sound                        
                //this.play('p1SizeDown');                                  //bugged sizeDown animation
                //console.log('CurrentScale is:', currentScale);
            }
        }
    }   
}