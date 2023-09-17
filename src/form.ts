import Phaser from 'phaser';

export default class Form extends Phaser.Scene {
    constructor() {
        super({ key: 'Form' });
    }

    preload(): void {
        this.load.html('form', 'assets/text/form.html');
    }

    create(): void {
        const text: Phaser.GameObjects.Text = this.add.text(10, 10, 'Please login to play', {
            color: 'white',
            fontFamily: 'Arial',
            fontSize: '32px',
        });

        const element: Phaser.GameObjects.DOMElement = this.add.dom(480, 640).createFromCache('form');

        element.setPerspective(800);

        element.addListener('click');

        element.on('click', (event : any) => {
            if (event.target.name === 'loginButton') {
                const inputUsername: HTMLInputElement = element.getChildByName('username') as HTMLInputElement;
                const inputPassword: HTMLInputElement = element.getChildByName('password') as HTMLInputElement;
        
                // Have they entered anything?
                if (inputUsername.value !== '' && inputPassword.value !== '') {
                    // Turn off the click events
                    element.removeListener('click'); // Use element here
        
                    // Tween the login form out
                    this.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });
        
                    this.tweens.add({
                        targets: element,
                        scaleX: 2,
                        scaleY: 2,
                        y: 700,
                        duration: 3000,
                        ease: 'Power3',
                        onComplete: () => {
                            element.setVisible(false);
                        },
                    });
        
                    // Populate the text with whatever they typed in as the username!
                    text.setText(`Welcome ${inputUsername.value}`);
                } else {
                    // Flash the prompt
                    this.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                }
            }
        });
        

        this.tweens.add({
            targets: element,
            y: 300,
            duration: 3000,
            ease: 'Power3',
        });
    }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scale: {
        parent: 'form',
        width: 800,
        height: 600,
    },
    dom: {
        createContainer: true,
    },
    scene: Form,
};

const game = new Phaser.Game(gameConfig);
