import * as Phaser from 'phaser';

export default class Start extends Phaser.Scene {

    constructor() {
        super({ key: 'Start' });
    }

    preload() {
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('start-button', 'assets/images/start_button.png');
        this.load.glsl('stars', 'assets/shaders/starfields.glsl.js');
        this.load.audio('yeah-boy', 'assets/sounds/yeah-boy.mp3');
        this.load.audio('soundtrack', 'assets/sounds/soundtrack.mp3');
    }

    create() {
        this.add.shader('Warp Speed', 0, 0, screen.width, screen.height).setOrigin(0);

        const logo = this.add.image(this.cameras.main.centerX, 100, 'logo');
        logo.scale = 0.5;

        const text = this.add.text(this.cameras.main.centerX, this.cameras.main.height - 20, 'ByteMyDust presents...').setOrigin(.5, 1)

        this.tweens.add({
            targets: logo,
            y: 350,
            scale: 0.02,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });

        const music = this.sound.add('soundtrack', { volume: 0.2 });
        music.play({ loop: true });


        // create a button object
        const startButton = this.add.image(this.cameras.main.centerX, 550, 'start-button').setOrigin(0.5, 0);
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
