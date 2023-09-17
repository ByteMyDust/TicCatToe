import * as Phaser from 'phaser';
import TicTacToe from '../tic-tac-toe';
// import { Button } from './scripts/button';
import { RunawayButton } from '../scripts/runawayButton';
import { Button } from '../scripts/button';
import { PopUpButton } from '../scripts/pop-up';
import { formButton } from '../scripts/formButton';
// import { CatPaw } from '../scripts/catPaw';
const SPRITE_ASSET_KEY = 'SPRITE_ASSET_KEY';


export default class Game extends Phaser.Scene {
  private ticTacToe: TicTacToe;
  // private button: Button;
  private runawayButton: RunawayButton;
  private popupButton: PopUpButton;
  private formButton: formButton;
  private buttons: [Button, Button, RunawayButton];
  // private catpaw : CatPaw
  private curButtonIdx: number;


  constructor() {
    super({ key: 'Game' });
  }

  preload(): void {

    this.load.image("catPaw", "assets/images/catpaw.png")
    this.load.spritesheet(SPRITE_ASSET_KEY, 'assets/images/blocks.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image("button", "assets/images/submit.png");
    this.load.image("kingcat", "assets/images/cat.png");
    this.load.audio("cat-1", "assets/sounds/cat-1.mp3");
    this.load.audio("cat-2", "assets/sounds/cat-2.mp3");
    this.load.audio("magic", "assets/sounds/magic.mp3");

  }

  create(): void {
    // this.button = new Button({ scene: this, x: 100, y: 100,key:"button" });
    this.runawayButton = new RunawayButton({ scene: this, x: 100, y: 100, key: "button" });
    this.runawayButton.active = true;
    // let popup = new PopUp({ scene: this, x: 100, y: 100 });

    this.ticTacToe = new TicTacToe(this);
    this.ticTacToe.create()

    this.curButtonIdx = Math.floor(Math.random() * 3);
    //! 
    // this.curButtonIdx = 1;
    let buttonConfig = { scene: this, x: this.ticTacToe.x + this.ticTacToe.pieceSize * 5, y: this.ticTacToe.y + this.ticTacToe.pieceSize * 2, key: "button" };
    this.popupButton = new PopUpButton(buttonConfig);
    this.formButton = new formButton(buttonConfig);
    this.runawayButton = new RunawayButton({ scene: this, x: 100, y: 100, key: "button" });
    this.buttons = [this.popupButton, this.formButton, this.runawayButton]
    this.buttons[this.curButtonIdx].toggleActive();

    const kingcat = this.add.image(this.ticTacToe.x - 200, this.ticTacToe.y, 'kingcat');
    kingcat.setScale(0.2);
    const textX = this.ticTacToe.x - 200; // Same X position as the cat
    const textY = kingcat.y + kingcat.displayHeight / 2 + 10; // Adjust the Y position to be below the cat

    // Create and position the text
    const hintText = this.add.text(textX, textY, "Click Me for a Hint!", {
      fontFamily: 'Arial',
      fontSize: '24px',
      fill: '#ffffff', // White text color
    });
    hintText.setOrigin(0.5); // Center the text horizontally

    let textBox: Phaser.GameObjects.Graphics;
    let text: Phaser.GameObjects.Text;

    let gameTipsMap = new Map([
      [1, "In Monopoly, always try to buy the 'Go' space; it's the best investment."],
      [2, "When playing Chess, move your pawns backward for a surprise attack."],
      [3, "In Scrabble, use all your vowels in the first turn for maximum confusion."],
      [4, "In Jenga, gently blow on the tower to make it more stable."],
      [5, "In Connect Four, try connecting five instead; it's called 'Connect Five.'"],
      [6, "In Risk, conquer Australia first for its strategic kangaroo reserves."],
      [7, "In Uno, play all your cards at once to assert dominance."],
      [8, "When playing Twister, wear socks on your hands for added grip."],
      [9, "In Battleship, guess random coordinates; it's more unpredictable."],
      [10, "In Candy Land, eat the game pieces for a sugary advantage."],
      [11, "In Clue, accuse yourself; it's the perfect alibi."],
      [12, "In Pictionary, draw abstract art for extra ambiguity."],
      [13, "In Sorry!, never apologize; it's a sign of weakness."],
      [14, "In Risk, form alliances and create a global peace treaty."],
      [15, "In Chutes and Ladders, use a ladder as a fashion accessory."],
      [16, "In Operation, use the tweezers to perform surgery on your opponent."],
      [17, "In Yahtzee, shout 'Bingo!' to assert dominance."],
      [18, "In Checkers, move your pieces in a circular pattern to confuse your opponent."],
      [19, "In Cranium, only answer in interpretive dance."],
      [20, "In Apples to Apples, use actual apples as cards."],
      [21, "In Scrabble, invent your own language for triple-word scores."],
      [22, "In Risk, declare yourself the 'King of the World' and demand tribute."],
      [23, "In Candy Land, hoard all the candy for yourself."],
      [24, "In Battleship, deploy submarines in your bathtub for a surprise attack."],
      [25, "In Uno, challenge the Wild Draw Four rule at every opportunity."],
      [26, "In Connect Four, build a pyramid instead."],
      [27, "In Chess, promote your pawns to kings as soon as possible."],
      [28, "In Jenga, use glue to make the tower indestructible."],
      [29, "In Twister, wear a suit of armor for added protection."],
      [30, "In Connect Four, connect three instead; it's called 'Connect Three.'"],
      [31, "In Chess, move your queen like a knight for added flair."],
      [32, "In Scrabble, spell your words backward to confuse opponents."],
      [33, "In Risk, declare war on the player with the nicest smile."],
      [34, "In Candy Land, insist on a 'No Sugar Tax' policy."],
      [35, "In Battleship, launch a missile at the kitchen sink."],
      [36, "In Sorry!, never say sorry, even when you should."],
      [37, "In Twister, recite the alphabet backward while playing."],
      [38, "In Monopoly, create a fake currency for a secret financial coup."],
      [39, "In Risk, start a 'Risk World Tour' YouTube series during the game."],
      [40, "In Candy Land, construct a gingerbread fortress for defense."],
      [41, "In Connect Four, connect one for a minimalist victory."],
      [42, "In Chess, play without a board; it's all about imagination."],
      [43, "In Monopoly, insist on paying rent with Monopoly money."],
      [44, "In Sorry!, say 'You're welcome!' when someone apologizes."],
      [45, "In Jenga, recite Shakespearean sonnets while playing."],
      [46, "In Clue, accuse the butler every time; it's always the butler."],
      [47, "In Uno, insist that all cards are wild cards."],
      [48, "In Twister, wear a blindfold for an extra challenge."],
      [49, "In Risk, form a United Nations alliance and discuss world issues."],
      [50, "In Pictionary, draw stick figures exclusively."]]);




    kingcat.setInteractive();
    kingcat.on('pointerdown', () => {
      let sound = this.sound.add('magic', { volume: 1 });
      sound.play();
      console.log("fuck you");
      if (textBox) {
        textBox.destroy();
        text.destroy();
      }

      textBox = this.add.graphics();
      textBox.fillStyle(0xae9fbc, 0.8); // Black color with 80% opacity
      const textBoxX = this.ticTacToe.x;
      const textBoxY = this.ticTacToe.y - 250;
      const textBoxWidth = 400;
      const textBoxHeight = 200;
      textBox.fillRect(textBoxX, textBoxY, textBoxWidth, textBoxHeight);

      // Create the text to display inside the hint box
      const randomnum = this.getRandomNum(1, 50);
      const message = gameTipsMap.get(Math.floor(randomnum));

      // Calculate text position to center it within the hint box
      const textX = textBoxX + textBoxWidth / 2;
      const textY = textBoxY + textBoxHeight / 2;

      text = this.add.text(textX, textY, message, {
        fontFamily: 'Arial',
        fontSize: '32px',
        fill: '#ffffff', // White text color
        wordWrap: { width: textBoxWidth - 40 }, // Wrap text within the hint box with some padding
        align: 'center', // Center-align the text
      });
      text.setOrigin(0.5); // Center the text both horizontally and vertically within the hint box

      textBox.setInteractive();
      text.setInteractive();

      setTimeout(() => {
        textBox.destroy();
        text.destroy();
      }, 3000);
    })
  }

  update(time: number, delta: number): void {
    // this.button.update();
    this.ticTacToe.update(this.buttons[this.curButtonIdx].clicked)
    for (let i = 0; i < 3; i++) {
      this.buttons[i].update();
    }
  }


  getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
  }
}
