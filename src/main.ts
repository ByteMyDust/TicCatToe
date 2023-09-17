import Phaser from 'phaser';
import TicTacToe from './tic-tac-toe';
// import { Button } from './scripts/button';
import { RunawayButton } from './scripts/runawayButton';
import { PopUp } from './scripts/pop-up';
import { ClickableButton } from './scripts/clickratebutton';

const SPRITE_ASSET_KEY = 'SPRITE_ASSET_KEY';

class Game extends Phaser.Scene {
  #ticTacToe!: TicTacToe;
  #playerTurnTextGameObject!: Phaser.GameObjects.Text;
  // private button: Button;
  private runawayButton: RunawayButton;
  private clickableButton: ClickableButton;
  private button_tex : Phaser.GameObjects.RenderTexture


  constructor() {
    super({ key: 'Game' });
  
  }

  preload(): void {
    this.load.spritesheet(SPRITE_ASSET_KEY, 'assets/images/blocks.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image("button", "assets/images/button.png");
    this.button_tex = this.add.renderTexture(200,200,200,100);
  }
  
  create(): void {
    // this.button = new Button({ scene: this, x: 100, y: 100,key:"button" });
    this.runawayButton = new RunawayButton({ scene: this, x: 100, y: 100, key:"button" });
    this.clickableButton = new ClickableButton({ scene: this, x: 100, y: 100,key:this.button_tex});
    // let popup = new PopUp({ scene: this, x: 100, y: 100 });
    this.#ticTacToe = new TicTacToe();

    this.add
      .text(240, 50, 'Tic-Tac-Toe', {
        color: 'purple',
        fontFamily: 'Verdana',
        fontSize: '42px',
      })
      .setOrigin(0.5);

    this.#playerTurnTextGameObject = this.add
      .text(240, 600, 'X turn', {
        color: 'black',
        fontFamily: 'Verdana',
        fontSize: '22px',
      })
      .setOrigin(0.5);

    const graphics = this.add.graphics();
    graphics.lineStyle(12, 0x3e3e3e);
    graphics.lineBetween(170, 120, 170, 540);
    graphics.lineBetween(314, 120, 314, 540);
    graphics.lineBetween(30, 258, 450, 258);
    graphics.lineBetween(30, 402, 450, 402);

    this.#addGamePiece(0, 0);
    this.#addGamePiece(0, 1);
    this.#addGamePiece(0, 2);

    this.#addGamePiece(1, 0);
    this.#addGamePiece(1, 1);
    this.#addGamePiece(1, 2);

    this.#addGamePiece(2, 0);
    this.#addGamePiece(2, 1);
    this.#addGamePiece(2, 2);
  }

  #addGamePiece(x: number, y: number): void {
    const pieceSize = 96;
    const xPos = 50 + (pieceSize + pieceSize / 2) * y;
    const yPos = 140 + (pieceSize + pieceSize / 2) * x;
    const piece = this.add.image(xPos, yPos, SPRITE_ASSET_KEY, 2).setScale(6).setOrigin(0).setInteractive();
    piece.once(Phaser.Input.Events.POINTER_DOWN as string, () => {
      if (this.#ticTacToe.isGameOver) {
        return;
      }
      const currentPlayer = this.#ticTacToe.currentPlayerTurn;
      this.#ticTacToe.makeMove(x, y);

      if (currentPlayer === 'X') {
        piece.setFrame(0);
      } else {
        piece.setFrame(1);
      }

      if (this.#ticTacToe.isGameOver && this.#ticTacToe.gameWinner !== 'DRAW') {
        this.#playerTurnTextGameObject.setText(`${currentPlayer} Won!!`);
        return;
      }
      if (this.#ticTacToe.isGameOver) {
        this.#playerTurnTextGameObject.setText(this.#ticTacToe.gameWinner as string);
        return;
      }

      this.#playerTurnTextGameObject.setText(`${this.#ticTacToe.currentPlayerTurn} turn`);
    });
  }
  update(time: number, delta: number): void {
    // this.button.update();
    this.runawayButton.update();
  }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.CANVAS,
  pixelArt: true,
  scale: {
    parent: 'game-container',
    width: 480,
    height: 640,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  backgroundColor: '#d3d3d3',
  scene: [Game],
};

const game = new Phaser.Game(gameConfig);
