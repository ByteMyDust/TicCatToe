import * as Phaser from 'phaser';

export class Button extends Phaser.GameObjects.Sprite{
    private clicked : boolean;
    constructor(config){
        super(config.scene, config.x, config.y, config.key);
        config.scene.add.existing(this);
        this.setInteractive()
        this.on('pointerdown',this.click, this )
        this.on('pointerup',this.clickup, this )
        this.scale = 0.3;
        
        this.clicked = false;
        
    }
    clickup(){
        this.clicked = false;
    }
    //on 
    click(){
        this.clicked = true;

    }
    update(...args: any[]): void {
        // this.x += 1;
        if (this.clicked){
            //add on click held functionality
        }
    }
}   