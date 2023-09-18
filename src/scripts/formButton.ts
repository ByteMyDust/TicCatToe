import { Button } from "./button";

export class formButton extends Button {
    constructor(config) {
        super(config);
    }
    click(): void {
        super.click()
        console.log(document.getElementById("shitform"))
        document.getElementById("shitform").style.display = "inline";
        document.getElementById("game-container").style.display = "none";

    }
    update(...args: any[]): void {
        super.update()
        let loginForm = document.getElementById("loginForm");
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            document.getElementById("shitform").style.display = "none";
            document.getElementById("game-container").style.display = "inline";
            return
            // handle submit
        });
    }
}