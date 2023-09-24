import { Button } from './button';
export class RunawayButton extends Button {
    speed;
    constructor(config) {
        super(config);
        this.setCollideWorldBounds(true);
        this.speed = 100;
        this.setVelocity(this.speed, this.speed);
        this.setBounce(1, 1);
        this.setDepth(1000);
    }
    update(...args) {
        // if ()
        super.update();
    }
}
//# sourceMappingURL=runawayButton.js.map