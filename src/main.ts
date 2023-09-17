import Start from './scenes/start'
import Game from './scenes/game'
import End from './scenes/end'

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  pixelArt: true,
  scale: {
    parent: 'game-container',
    width: '100%',
    height: '100%',
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  backgroundColor: '#d3d3d3',
  scene: [Start, Game, End],
};

const game = new Phaser.Game(gameConfig);