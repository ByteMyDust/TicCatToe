import * as Phaser from 'phaser';
import TicTacToe from '../tic-tac-toe';
// import { Button } from './scripts/button';
import { RunawayButton } from '../scripts/runawayButton';
import { Button } from '../scripts/button';
import { PopUp } from '../scripts/pop-up';
// import { CatPaw } from '../scripts/catPaw';
const SPRITE_ASSET_KEY = 'SPRITE_ASSET_KEY';


export default class Game extends Phaser.Scene {
  private ticTacToe: TicTacToe;
  // private button: Button;
  private runawayButton: RunawayButton;
  private popupButton: Button;
  private formButton: Button;
  private buttons : [Button,Button,RunawayButton];
  // private catpaw : CatPaw
  private curButtonIdx : number;


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
    this.curButtonIdx = Math.floor(Math.random()*3);
    console.log(this.curButtonIdx)
    this.popupButton = new Button({ scene: this, x: 100, y: 100,key:"button" });
    this.formButton = new Button({ scene: this, x: 100, y: 100,key:"button" });
    this.runawayButton = new RunawayButton({ scene: this, x: 100, y: 100, key: "button" });
    this.buttons = [this.popupButton, this.formButton, this.runawayButton]
    this.buttons[this.curButtonIdx].toggleActive();
    // let popup = new PopUp({ scene: this, x: 100, y: 100 });

    this.ticTacToe = new TicTacToe(this);
    this.ticTacToe.create()

  }

  update(time: number, delta: number): void {
    // this.button.update();
    for (let i; i < 3; i++){
      this.buttons[i].update();
    }
    this.ticTacToe.update(this.buttons[this.curButtonIdx].clicked)
  }
}
