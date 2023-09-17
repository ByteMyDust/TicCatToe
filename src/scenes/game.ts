import * as Phaser from 'phaser';
import TicTacToe from '../tic-tac-toe';
// import { Button } from './scripts/button';
import { RunawayButton } from '../scripts/runawayButton';
import { PopUp } from '../scripts/pop-up';
// import { CatPaw } from '../scripts/catPaw';
const SPRITE_ASSET_KEY = 'SPRITE_ASSET_KEY';


export default class Game extends Phaser.Scene {
  private ticTacToe: TicTacToe;
  // private button: Button;
  private runawayButton: RunawayButton;
  // private catpaw : CatPaw


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
  }

  create(): void {
    // this.button = new Button({ scene: this, x: 100, y: 100,key:"button" });
    this.runawayButton = new RunawayButton({ scene: this, x: 100, y: 100, key: "button" });
    this.runawayButton.active = true;
    // let popup = new PopUp({ scene: this, x: 100, y: 100 });
    const kingcat = this.add.image(500,400,'kingcat');
    kingcat.setScale(0.2);
    const textX = 500; // Same X position as the cat
    const textY = kingcat.y + kingcat.displayHeight / 2 + 10; // Adjust the Y position to be below the cat

    // Create and position the text
    const hintText = this.add.text(textX, textY, "Click Me for Hint!", {
      fontFamily: 'Arial',
      fontSize: '24px',
      fill: '#ffffff', // White text color
    });
    hintText.setOrigin(0.5); // Center the text horizontally
    this.ticTacToe = new TicTacToe(this);
    this.ticTacToe.create()
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
    kingcat.on('pointerdown',()=>{
      console.log("fuck you");
          if (textBox) {
            textBox.destroy();
            text.destroy();
        }

        // Create the rectangular textbox
        textBox = this.add.graphics();
        textBox.fillStyle(0x000000, 0.8); // Black color with 80% opacity
        textBox.fillRect(200, 300, 400, 200); // Define the position and size of the textbox

        // Create the text to display inside the textbox
        let randomnum = this.getRandomNum(1, 50);
        let message = gameTipsMap.get(Math.floor(randomnum));
        console.log(message);
        
        text = this.add.text(300, 350, message, {
            fontFamily: 'Arial',
            fontSize: '24px',
            fill: '#ffffff', // White text color
            wordWrap: { width: 360 }, // Wrap text within the textbox
        });

        // Set the text origin to the top-left corner of the textbox
        text.setOrigin(0);

        // Make the textbox and text interactive so that they can be clicked or interacted with
        textBox.setInteractive();
        text.setInteractive();

        

      // Set a timeout to remove the message after 5 seconds (5000 milliseconds)
      setTimeout(() => {
          textBox.destroy();
          text.destroy();
      }, 3000);
        // Listen for a click event on the textbox to remove it when clicked
        
    })




    // this.add
    //   .text(240, 50, 'Tic-Tac-Toe', {
    //     color: 'purple',
    //     fontFamily: 'Verdana',
    //     fontSize: '42px',
    //   })
    //   .setOrigin(0.5);

    // this.#playerTurnTextGameObject = this.add
    //   .text(240, 600, 'X turn', {
    //     color: 'black',
    //     fontFamily: 'Verdana',
    //     fontSize: '22px',
    //   })
    //   .setOrigin(0.5);

    // const graphics = this.add.graphics();
    // graphics.lineStyle(12, 0x3e3e3e);
    // graphics.lineBetween(170, 120, 170, 540);
    // graphics.lineBetween(314, 120, 314, 540);
    // graphics.lineBetween(30, 258, 450, 258);
    // graphics.lineBetween(30, 402, 450, 402);

    // this.#addGamePiece(0, 0);
    // this.#addGamePiece(0, 1);
    // this.#addGamePiece(0, 2);

    // this.#addGamePiece(1, 0);
    // this.#addGamePiece(1, 1);
    // this.#addGamePiece(1, 2);

    // this.#addGamePiece(2, 0);
    // this.#addGamePiece(2, 1);
    // this.#addGamePiece(2, 2);

    // this.catpaw = new CatPaw({scene: this, x:100, y: 1000}) // update this so that its calculated. 
    // this.catpaw.setOrigin(0.5, 0)
  }

  // #addGamePiece(x: number, y: number): void {
  //   const pieceSize = 96;
  //   const xPos = 50 + (pieceSize + pieceSize / 2) * y;
  //   const yPos = 140 + (pieceSize + pieceSize / 2) * x;
  //   const piece = this.add.image(xPos, yPos, SPRITE_ASSET_KEY, 2).setScale(6).setOrigin(0).setInteractive();
  //   piece.once(Phaser.Input.Events.POINTER_DOWN as string, () => {
  //     if (this.#ticTacToe.isGameOver) {
  //       return;
  //     }

  //     // if ((Math.floor(Math.random() * 100) + 1) % 2) {
  //     //   console.log(`x: is ${x}. xPos is ${xPos}. y is ${y}. yPos is ${yPos}.`)
  //     //   const tweenManager = this.tweens
  //     //   const allTweens = tweenManager.getAllTweens()
  //       // const tweenOn = this.tweens.add({
  //       //   targets: this.catpaw,
  //       //   y: yPos,
  //       //   x: xPos,
  //       //   duration: 1000, 
  //       //   ease: 'Linear',
  //       //   paused: true
  //       // })

  //       // const tweenOff = this.tweens.add({
  //       //   targets: this.catpaw,
  //       //   y: 1000,
  //       //   x: 100,
  //       //   duration: 1000,
  //       //   ease: 'Linear',
  //       //   paused: true
  //       // })

  //       // tweenOn.play()
  //       // console.log(this.tweens.getAllTweens())
  //       // setTimeout(() => {
  //       //   tweenOff.play()
  //       // }, 3000)
  //       // return;
  //     // }

  //     const currentPlayer = this.#ticTacToe.currentPlayerTurn;
  //     this.#ticTacToe.makeMove(x, y);

  //     if (currentPlayer === 'X') {
  //       piece.setFrame(0);
  //     } else {
  //       piece.setFrame(1);
  //     }

  //     if (this.#ticTacToe.isGameOver && this.#ticTacToe.gameWinner !== 'DRAW') {
  //       this.#playerTurnTextGameObject.setText(`${currentPlayer} Won!!`);
  //       return;
  //     }
  //     if (this.#ticTacToe.isGameOver) {
  //       this.#playerTurnTextGameObject.setText(this.#ticTacToe.gameWinner as string);
  //       return;
  //     }

  //     this.#playerTurnTextGameObject.setText(`${this.#ticTacToe.currentPlayerTurn} turn`);
  //   });
  // }
  update(time: number, delta: number): void {
    // this.button.update();
    this.runawayButton.update();
    this.ticTacToe.update(this.runawayButton.getClicked())
  }


  getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
  }
}
