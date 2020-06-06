class Zone extends Phaser.GameObjects.Zone {
    constructor(scene, x, y, width, height){
        super(scene, x, y, width, height);
        //setting up Player Class
        let custom_body = new Phaser.Physics.Arcade.Body(scene.physics.world, this)     
        this.body = custom_body;                                                                                                     
        this.body.setAllowGravity(false);  
        scene.add.existing(this);                                               //add to current scene
        scene.physics.add.existing(this);                                       //add object to existing scene
    }
    update(){
        let Vtouching = this.body.touching;                                //reserve variables for overlapping vent
        let VwasTouching = this.body.wasTouching;                                   
        if (Vtouching.none && !VwasTouching.none) {                             //if not touching vent, set to leavezone                    
          this.emit('leavezone');
        }
        else if (!Vtouching.none && VwasTouching.none) {                        //else if touching, set to enterzone
          this.emit('enterzone');
        } 
    }
}