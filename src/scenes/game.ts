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
  }

  create(): void {
    // this.button = new Button({ scene: this, x: 100, y: 100,key:"button" });
    this.runawayButton = new RunawayButton({ scene: this, x: 100, y: 100, key: "button" });
    this.runawayButton.active = true;
    // let popup = new PopUp({ scene: this, x: 100, y: 100 });

    this.ticTacToe = new TicTacToe(this);
    this.ticTacToe.create()

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
    this.ticTacToe.update(this.runawayButton.clicked)
  }
}
