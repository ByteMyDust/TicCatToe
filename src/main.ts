import Start from './scenes/start'
import Game from './scenes/game'
import End from './scenes/end'

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
      debug: true
    }
  },
  backgroundColor: '#d3d3d3',
  scene: [Start, Game, End],
};

const game = new Phaser.Game(gameConfig);