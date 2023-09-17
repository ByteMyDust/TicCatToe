// Annoying Browser Pop-up Class

import { Button } from "./button";

export class PopUpButton extends Button {
    constructor(config) {
        super(config);
        config.scene.add.existing(this);
        this.setInteractive()
        this.on('pointerdown', this.click, this)
    }
    update(...args: any[]): void {
        if (this.clicked) {
            let ans = confirm("Click confirm if you're a fool")
            if (ans == true){
                this.update();

            }else {
            
                return;
            }
        } 
    }
}