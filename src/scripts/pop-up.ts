// Annoying Browser Pop-up Class

export class PopUp extends Phaser.GameObjects.Sprite {
    constructor(config: { scene: any; x: any; y: any; }) {
        super(config.scene, config.x, config.y, "button");
        config.scene.add.existing(this);
        this.setInteractive()
        this.on('pointerdown', this.click, this)
    }
    click() {
        if (confirm("Click confirm if you're a fool") == true) {
            this.click();
        } else {
            return;
        }
    }
}