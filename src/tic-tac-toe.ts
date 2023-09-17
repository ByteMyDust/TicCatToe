import * as Phaser from 'phaser';

type Cell = 'X' | 'O' | '';
enum Player {
  X = 'X',
  O = 'O',
}
type GameWinner = undefined | 'X' | 'O' | 'DRAW';
const SPRITE_ASSET_KEY = 'SPRITE_ASSET_KEY';

export default class TicTacToe extends Phaser.GameObjects.Graphics {
  #board: Cell[][] = [];
  #currentPlayerTurn: Player = Player.X;
  #gameWinner: GameWinner = undefined;
  #isGameOver = false;
  scene: Phaser.Scene;
  #playerTurnTextGameObject!: Phaser.GameObjects.Text;
  private selectedPiece;
  private allSelectedPieces : Set<[]>;
  // public scale: number;
  public pieceSize : number;

  constructor(scene) {
    super(scene)
    scene.add.existing(this);
    console.log(this.x,this.y)
    this.x = 200  
    this.y = 200
    this.pieceSize = 96;
    // this.scale = 0.5
    this.scene = scene;
    this.selectedPiece = [];
    this.allSelectedPieces = new Set()

    this.#initializeBoard();
  }

  create() {
    // this.scene.add
    //   .text(240, 50, 'Tic-Tac-Toe', {
    //     color: 'purple',
    //     fontFamily: 'Verdana',
    //     fontSize: '42px',
    //   })
    //   .setOrigin(0.5);

    this.#playerTurnTextGameObject = this.scene.add
      .text(240, 600, 'X turn', {
        color: 'white',
        fontFamily: 'Verdana',
        fontSize: '22px',
      })
      .setOrigin(0.5);

    this.lineStyle(6, 0xffffff);
    //left vertical
    this.lineBetween(this.pieceSize*5/4, 0, this.pieceSize*5/4, this.pieceSize*4);
    //right vertical
    this.lineBetween(this.pieceSize*11/4, 0, this.pieceSize*11/4, this.pieceSize*4);
    //top horizontal
    this.lineBetween(0, this.pieceSize*5/4, this.pieceSize*4, this.pieceSize*5/4);
    //bottom horizontal
    this.lineBetween(0, this.pieceSize*11/4, this.pieceSize*4, this.pieceSize*11/4);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.#addGamePiece(i, j);

      }
    }

  }
  update(submitClicked : boolean){
    if (this.selectedPiece.length !== 0 && submitClicked && !this.allSelectedPieces.has(this.selectedPiece)){
      this.selectPiece(...this.selectedPiece)
      this.allSelectedPieces.add(this.selectedPiece)
      this.selectedPiece = []
    }
  }
  click(piece, x, y) {
    this.selectedPiece = [piece, x, y]
    // this.selectPiece(piece,x,y)
  }
  selectPiece(piece, x, y) {
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
      this.scene.scene.start('End'); console.log("Clicked")
      return;
    }
    if (this.isGameOver) {
      this.#playerTurnTextGameObject.setText(this.gameWinner as string);
      this.scene.scene.start('End'); console.log("Clicked")
      return;
    }

    this.#playerTurnTextGameObject.setText(`${this.currentPlayerTurn} turn`);
  }

  #addGamePiece(x: number, y: number): void {
    const pieceSize = 96;
    const xPos = this.x + ((pieceSize + pieceSize / 2) * x);
    const yPos = this.y + ((pieceSize + pieceSize / 2) * y);
    const piece = this.scene.add.image(xPos, yPos, SPRITE_ASSET_KEY, 2).setScale(6).setOrigin(0).setInteractive();

    piece.once(Phaser.Input.Events.POINTER_DOWN as string, () => this.click(piece, x, y));
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
