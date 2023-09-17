import * as Phaser from 'phaser';

export class Button extends Phaser.GameObjects.Sprite{
    constructor(config){
        super(config.scene, config.x, config.y, "button");
        config.scene.add.existing(this);
        // this.width = 16;
        // this.height = 16;
        this.setInteractive()
        this.on('pointerdown',this.click, this )
    }
    click(){
        this.alpha -= .1;
        // console.log("click")
    }
    update(...args: any[]): void {
        this.x += 1;
    }
}   