import Phaser from "phaser";
type Cell = 'X' | 'O' | '';
enum Player {
  X = 'X',
  O = 'O',
}
type GameWinner = undefined | 'X' | 'O' | 'DRAW';
const SPRITE_ASSET_KEY = 'SPRITE_ASSET_KEY';

export default class TicTacToe extends Phaser.GameObjects.Graphics{
  #board: Cell[][] = [];
  #currentPlayerTurn: Player = Player.X;
  #gameWinner: GameWinner = undefined;
  #isGameOver = false;
  scene: Phaser.Scene;
  #playerTurnTextGameObject!: Phaser.GameObjects.Text;

  constructor(scene) {
    super(scene)
    scene.add.existing(this);

    this.scene = scene;

    this.#initializeBoard();
  }

  create(){
    this.scene.add
      .text(240, 50, 'Tic-Tac-Toe', {
        color: 'purple',
        fontFamily: 'Verdana',
        fontSize: '42px',
      })
      .setOrigin(0.5);

    this.#playerTurnTextGameObject = this.scene.add
      .text(240, 600, 'X turn', {
        color: 'black',
        fontFamily: 'Verdana',
        fontSize: '22px',
      })
      .setOrigin(0.5);

    this.lineStyle(12, 0x3e3e3e);
    this.lineBetween(170, 120, 170, 540);
    this.lineBetween(314, 120, 314, 540);
    this.lineBetween(30, 258, 450, 258);
    this.lineBetween(30, 402, 450, 402);
    
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
    const piece = this.scene.add.image(xPos, yPos, SPRITE_ASSET_KEY, 2).setScale(6).setOrigin(0).setInteractive();
    
    piece.once(Phaser.Input.Events.POINTER_DOWN as string, () => {
      if (this.isGameOver) {
        return;
      }

      const currentPlayer = this.currentPlayerTurn;
      this.makeMove(x, y);

      if (currentPlayer === 'X') {
        piece.setFrame(0);
      } else {
        piece.setFrame(1);
      }

      if (this.isGameOver && this.gameWinner !== 'DRAW') {
        this.#playerTurnTextGameObject.setText(`${currentPlayer} Won!!`);
        return;
      }
      if (this.isGameOver) {
        this.#playerTurnTextGameObject.setText(this.gameWinner as string);
        return;
      }

      this.#playerTurnTextGameObject.setText(`${this.currentPlayerTurn} turn`);
    });
  }

  get currentPlayerTurn(): Player {
    return this.#currentPlayerTurn;
  }

  get isGameOver(): boolean {
    return this.#isGameOver;
  }

  get gameWinner(): GameWinner {
    return this.#gameWinner;
  }

  public makeMove(x: number, y: number): void {
    if (this.#board[x][y] !== '') {
      return;
    }

    if (this.#currentPlayerTurn === Player.O) {
      this.#board[x][y] = Player.O;
    } else {
      this.#board[x][y] = Player.X;
    }
    if (this.#currentPlayerTurn === Player.O) {
      this.#currentPlayerTurn = Player.X;
    } else {
      this.#currentPlayerTurn = Player.O;
    }

    this.#checkForGameEnd();
  }

  #checkForGameEnd(): void {
    if (
      this.#board[0][0] !== '' &&
      this.#board[0][0] === this.#board[0][1] &&
      this.#board[0][0] === this.#board[0][2]
    ) {
      this.#gameWinner = this.#board[0][0];
    } else if (
      this.#board[1][0] !== '' &&
      this.#board[1][0] === this.#board[1][1] &&
      this.#board[1][0] === this.#board[1][2]
    ) {
      this.#gameWinner = this.#board[1][0];
    } else if (
      this.#board[2][0] !== '' &&
      this.#board[2][0] === this.#board[2][1] &&
      this.#board[2][0] === this.#board[2][2]
    ) {
      this.#gameWinner = this.#board[2][0];
    } else if (
      this.#board[0][0] !== '' &&
      this.#board[0][0] === this.#board[1][0] &&
      this.#board[0][0] === this.#board[2][0]
    ) {
      this.#gameWinner = this.#board[0][0];
    } else if (
      this.#board[0][1] !== '' &&
      this.#board[0][1] === this.#board[1][1] &&
      this.#board[0][1] === this.#board[2][1]
    ) {
      this.#gameWinner = this.#board[0][1];
    } else if (
      this.#board[0][2] !== '' &&
      this.#board[0][2] === this.#board[1][2] &&
      this.#board[0][2] === this.#board[2][2]
    ) {
      this.#gameWinner = this.#board[0][2];
    } else if (
      this.#board[0][0] !== '' &&
      this.#board[0][0] === this.#board[1][1] &&
      this.#board[0][0] === this.#board[2][2]
    ) {
      this.#gameWinner = this.#board[0][0];
    } else if (
      this.#board[0][2] !== '' &&
      this.#board[0][2] === this.#board[1][1] &&
      this.#board[0][2] === this.#board[2][0]
    ) {
      this.#gameWinner = this.#board[0][2];
    }

    if (this.#gameWinner !== undefined) {
      this.#isGameOver = true;
      return;
    }

    const isBoardFilled = this.#board.every((row) => row.every((cell) => cell !== ''));
    if (isBoardFilled) {
      this.#isGameOver = true;
      this.#gameWinner = 'DRAW';
    }
  }

  #initializeBoard(): void {
    this.#board = [];
    for (let i = 0; i < 3; i += 1) {
      this.#board.push([]);
      for (let j = 0; j < 3; j += 1) {
        this.#board[i].push('');
      }
    }
    this.#currentPlayerTurn = Player.X;
    this.#gameWinner = undefined;
    this.#isGameOver = false;
  }
}
