import * as Phaser from 'phaser';

export class Button extends Phaser.GameObjects.Sprite{
    private clicked : boolean;
    private config;
    constructor(config){
        super(config.scene, config.x, config.y, "button");
        this.config = config;
        config.scene.add.existing(this);
        this.clicked = false;
        this.setInteractive()
        this.on('pointerdown',this.click, this )
        this.scale = 0.3;
    }
    click(){
        this.alpha -= .1;
        this.clicked = true;
        // console.log("click")
    }
    update(...args: any[]): void {
        this.x += 1;
        this
    }
}   