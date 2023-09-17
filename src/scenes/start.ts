import * as Phaser from 'phaser';

export default class Start extends Phaser.Scene {

    constructor() {
        super({ key: 'Start' });
    }

    preload() {
        this.load.image('logo', 'public/assets/images/logo.png');
        this.load.image('start-button', 'public/assets/images/start_button.png');
        this.load.glsl('stars', 'public/assets/shaders/starfields.glsl.js');
        this.load.audio('yeah-boy', 'public/assets/sounds/yeah-boy.mp3');
        this.load.audio('soundtrack', 'public/assets/sounds/soundtrack.mp3');
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

        const music = this.sound.add('soundtrack', { volume: 0.3 });
        music.play({ loop: true });


        // create a button object
        const startButton = this.add.image(600, 550, 'start-button');
        // make the button interactive
        startButton.setInteractive({ useHandCursor: true });
        // add a listener to the pointerdown event
        startButton.on('pointerdown', () => {

            // add the sound
            let sound = this.sound.add('yeah-boy', { volume: 1 });

            // play the sound
            sound.play();

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
