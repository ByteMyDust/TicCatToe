import Phaser from 'phaser';
import TicTacToe from './tic-tac-toe';
import { Spinner } from "phaser3-rex-plugins/templates/spinner/spinner-components";

const SPRITE_ASSET_KEY = 'SPRITE_ASSET_KEY';

class Game extends Phaser.Scene {
  #ticTacToe!: TicTacToe;
  #playerTurnTextGameObject!: Phaser.GameObjects.Text;
  #clicked = new Set<[number,number]>;
  #spinner: Spinner | undefined;
  constructor() {
    super({ key: 'Game' });
  }

  preload(): void {
    this.load.spritesheet(SPRITE_ASSET_KEY, 'assets/images/blocks.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.#ticTacToe = new TicTacToe();
    this.#spinner = new Spinner(this, {
      x: 1000,
      y: 1000,
      width: 64,
      height: 64,
      color: 0xffffff,
    });
  
    this.#spinner?.setVisible(true); // Hide the spinner
    this.add.existing(this.#spinner); // Add the spinner to the scene  
  }

  create(): void {
    
    // this.#spinner?.start();
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
  
    // Create a Set to keep track of clicked pieces
    const clickedPieces = new Set();
  
    piece.on(Phaser.Input.Events.POINTER_DOWN as string, () => {
       
      this.#spinner?.start();
      this.#spinner?.setVisible(true); // Show the spinner
      console.log(this.#spinner?.isRunning);
      if (this.#ticTacToe.isGameOver) {
        return;
      }
      // Check if the piece has already been clicked
      if (!clickedPieces.has(`${x}-${y}`)) {
       
        
        const currentPlayer = this.#ticTacToe.currentPlayerTurn;
        setTimeout(()=> {this.#ticTacToe.makeMove(x, y);
  
        if (currentPlayer === 'X') {
          piece.setFrame(0);
        } else {
          piece.setFrame(1);
        }},1000);
        
  
        if (this.#ticTacToe.isGameOver && this.#ticTacToe.gameWinner !== 'DRAW') {
          this.#playerTurnTextGameObject.setText(`${currentPlayer} Won!!`);
          return;
        }
        if (this.#ticTacToe.isGameOver) {
          this.#playerTurnTextGameObject.setText(this.#ticTacToe.gameWinner as string);
          return;
        }
  
        // Mark the piece as clicked
        clickedPieces.add(`${x}-${y}`);
        this.#playerTurnTextGameObject.setText(`${this.#ticTacToe.currentPlayerTurn} turn`);
      } else {
        console.log('Already clicked');
      }
    });
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
  backgroundColor: '#d3d3d3',
  scene: [Game],
};

const game = new Phaser.Game(gameConfig);
