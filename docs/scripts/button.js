import * as Phaser from 'phaser';
export class Button extends Phaser.Physics.Arcade.Sprite {
    clicked;
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        this.active = false;
        this.alpha = 0;
        this.setInteractive();
        this.on('pointerdown', this.click, this);
        this.on('pointerout', this.clickup, this);
        this.scale = 0.3;
        this.clicked = false;
    }
    getClicked() { return this.clicked; }
    clickup() {
        if (this.active) {
            this.clicked = false;
        }
    }
    //on 
    click() {
        if (this.active) {
            this.clicked = true;
        }
    }
    toggleActive() {
        this.active = !this.active;
        // this.alpha = !this.alpha;
    }
    update(...args) {
        // this.x += 1;
        if (this.active) {
            this.alpha = 1;
        }
        else {
            this.alpha = 0;
        }
    }
}
//# sourceMappingURL=button.js.map