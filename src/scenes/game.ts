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

  }

  update(time: number, delta: number): void {
    // this.button.update();
    this.runawayButton.update();
    this.ticTacToe.update(this.runawayButton.getClicked())
  }
}
