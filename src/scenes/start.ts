import * as Phaser from 'phaser';

export default class Start extends Phaser.Scene {
    constructor() {
        super({ key: 'start' })
    }

    preload() {
        console.log(window.location.pathname);
        this.load.image('button', 'assets/images/submit.png')
        // this.load.glsl('stars', 'shaders/starfields.glsl.js');
    }

    create() {
        let button = this.add.image(250,250, 'button')
        console.log('in create method');
        
        setTimeout(() => {
            this.scene.start('Game')
        }, 1000)

        // button.on('onpointerdown', () => {
        //     console.log('go to next scene');
            
            
        // })

        // this.add.shader('Warp Speed', 0, 0, 640, 480).setOrigin(0);

        // add logo

        // add button
    }

    update() {

    }
}