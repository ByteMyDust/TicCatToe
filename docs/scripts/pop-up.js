// Annoying Browser Pop-up Class
import { Button } from "./button";
export class PopUpButton extends Button {
    constructor(config) {
        super(config);
        config.scene.add.existing(this);
        this.setInteractive();
        this.on('pointerdown', this.click, this);
    }
    update(...args) {
        if (this.clicked) {
            let ans = confirm("Click confirm if you're not a fool");
            if (ans == true) {
                this.update();
            }
            else {
                return;
            }
        }
    }
}
//# sourceMappingURL=pop-up.js.map