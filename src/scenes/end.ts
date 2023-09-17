import * as Phaser from 'phaser';

export default class End extends Phaser.Scene {
    constructor() {
        super({ key: 'End' })
    }

    preload() {
        this.load.glsl('stars', 'shaders/starfields.glsl.js')
        this.load.image('button', 'assets/images/button.png')
    }


    create() {
        // place closing text
        let centreX = this.cameras.main.centerX
        let offset = 100
        this.add.shader('Retro Starfield', 0, 0, screen.width, screen.height).setOrigin(0);
        this.add.text(centreX, offset + 40, 'Player 1', {
            fontFamily: 'Wingdings'
        }).setOrigin(1,0.5)
        this.add.text(centreX,offset + 40, ' you are the best!').setOrigin(0, 0.5)
        this.add.text(centreX,offset + 80, 'Collect your prize!').setOrigin(0.5,0)
        // add button and link out
        const exit = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 100, 'button').setOrigin(.5,.5)
        exit.setInteractive({ useHandCursor: true });
        exit.on('pointerdown', () => {
            window.location.href = 'https://www.youtube.com/watch?v=eBGIQ7ZuuiU'
            console.log('hi mom');
            
        })
        

    }

    update() {

    }
}