import * as Phaser from 'phaser';

export default class End extends Phaser.Scene {
    constructor() {
        super({ key: 'End' })
    }

    preload() {
        this.load.glsl('stars', 'shaders/starfields.glsl.js')
        this.load.image('button', 'assets/images/button.png')
        this.load.image('5_star', 'assets/images/5_star.png')
        this.load.image('empty_star', 'assets/images/empty_star.png')
        this.load.audio('clap', 'public/assets/sounds/clap.mp3');
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
        
        //5 star review
        const canvasWidth = this.scale.width; // Get the width of the game canvas
        const canvasHeight = this.scale.height; // Get the height of the game canvas
        let empty_star = "empty_star"
        let five_star = "5_star"

        let starImage = this.add.image(canvasWidth / 2, canvasHeight, "empty_star").setOrigin(0.5,1).setScale(0.5);

        //Rate Us
        this.add
        .text(
            starImage.x + starImage.width / 2 - 850, // Adjusted horizontal position
            starImage.y - starImage.height / 2 + 50, // Align with the top of the "5_star" image
          "Rate Us",
          {
            fontSize: "20px",
          }
        )
        //Thank you text
        const thanksText = this.add
        .text(
            starImage.x + starImage.width / 2 - 200, // Adjusted horizontal position
            starImage.y - starImage.height / 2 + 50, // Align with the top of the "5_star" image
          "Thank you for the 5-star rating!",
          {
            fontSize: "20px",
          }
        )
        .setOrigin(0, 0) // Set the origin to the top-left corner
        .setVisible(false);     

        // Add a click event to the image
        starImage.setInteractive();
        starImage.on("pointerdown", () => {
        starImage.setTexture("5_star");

          // Display the "thank you" message
  thanksText.setVisible(true);

        //Play thank you sound
        let sound = this.sound.add('clap', { volume: 1 });
        sound.play();
    });
 
    }
    update() {

    }
}