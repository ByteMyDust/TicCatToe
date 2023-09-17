
import * as Phaser from 'phaser';
import { Button } from './button';

export class RunawayButton extends Button{

    constructor(config){
        super(config);
        this.setCollideWorldBounds(true);
        let speed = 100 
        this.setVelocity(speed,speed)
        this.setBounce(1,1);
        this.setDepth(1000);
    }


    update(...args: any[]): void {
        // if ()
        super.update();
    }

}