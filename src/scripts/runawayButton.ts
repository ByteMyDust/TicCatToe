
import * as Phaser from 'phaser';
import { Button } from './button';

export class RunawayButton extends Button {
    public speed: number;
    constructor(config) {
        super(config);
        this.setCollideWorldBounds(true);
        this.speed = 100
        this.setVelocity(this.speed, this.speed)
        this.setBounce(1, 1);
        this.setDepth(1000);
    }


    update(...args: any[]): void {
        // if ()
        super.update();
    }

}