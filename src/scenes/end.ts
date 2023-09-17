import * as Phaser from 'phaser';

export default class End extends Phaser.Scene {
    constructor() {
        super({ key: 'End' })
    }

    preload() {
        this.load.glsl('stars', 'shaders/starfields.glsl.js');
    }

    create() {
        this.add.shader('Warp Speed', 0, 0, '100%', '100%').setOrigin(0);

        // add logo

        // add button
    }

    update() {

    }
}