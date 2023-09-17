import { Button } from "./button";

export class ClickableButton extends Button{
    constructor(config){
        super(config);
        this.active = true;
        // config.key.fill(0xFF0000);
    }

}