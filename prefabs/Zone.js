class Zone extends Phaser.GameObjects.Zone {
    constructor(scene, x, y, width, height){
        super(scene, x, y, width, height);
        
        let custom_body = new Phaser.Physics.Arcade.Body(scene.physics.world, this)     
        this.body = custom_body;                                                                                                     
        this.body.setAllowGravity(false);  
        scene.add.existing(this);                                             //add to current scene
        scene.physics.add.existing(this);                                     //add object to existing scene
    }
    update(){
        let touching = this.body.touching;                                    //reserve variables for overlapping vent
        let wasTouching = this.body.wasTouching;                                   
        if (touching.none && !wasTouching.none) {                             //if not touching vent, set to leavezone                    
          this.emit('leavezone');
        }
        else if (!touching.none && wasTouching.none) {                        //else if touching, set to enterzone
          this.emit('enterzone');
        } 
    }
}