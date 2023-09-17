import * as Phaser from 'phaser';

export default class Start extends Phaser.Scene {

    constructor() {
        super({ key: 'Start' });
    }

    preload() {
        this.load.image('logo', 'public/assets/images/logo.png');
        this.load.image('start-button', 'public/assets/images/start_button.png');
        this.load.glsl('stars', 'public/assets/shaders/starfields.glsl.js');
    }

    create() {
        this.add.shader('Warp Speed', 0, 0, screen.width, screen.height).setOrigin(0);

        const logo = this.add.image(600, 100, 'logo');
        logo.scale = 0.5;

        this.tweens.add({
            targets: logo,
            y: 350,
            scale: 0.02,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });

        // create a button object
        const startButton = this.add.image(600, 550, 'start-button');
        // make the button interactive
        startButton.setInteractive({ useHandCursor: true });
        // add a listener to the pointerdown event
        startButton.on('pointerdown', () => {
            // start the "Game" scene
            this.scene.start('Game'); console.log("Clicked")
        }, this)

        // add some effects to the button
        startButton.on('pointerover', () => {
            startButton.setScale(1.1);
        });
        startButton.on('pointerout', () => {
            startButton.setScale(1);
        });
        startButton.on('pointerup', () => {
            startButton.setTint(0x00ff00);
        });
    }
}
