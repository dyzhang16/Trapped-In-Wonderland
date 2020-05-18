class Box extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        //setting up Player Class
        let custom_body = new Phaser.Physics.Arcade.Body(scene.physics.world, this)     
        this.body = custom_body;                                                                                                   
        this.body.setDragX(100000);                                             //sets frictions on boxes so they do not slide
        this.setCollideWorldBounds(true);                                       //bound by game window
        scene.add.existing(this);                                               //add to current scene
        scene.physics.add.existing(this);                                       //add object to existing scene   
    }
    update(){
      
    }   
}