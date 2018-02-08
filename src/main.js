import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootGame from './states/BootGame'
import PreloadGame from './states/PreloadGame'
import PlayGame from './states/PlayGame'
import GameOver from './states/GameOver'

class Game extends Phaser.Game {
  constructor () {
    super(window.innerWidth, window.innerHeight, Phaser.CANVAS)
    this.scaleFactor = {x: window.innerWidth / 1920, y: window.innerHeight / 1080}
    this.state.add('BootGame', BootGame, false)
    this.state.add('PreloadGame', PreloadGame, false)
    this.state.add('PlayGame', PlayGame, false)
    this.state.add('GameOver', GameOver, false)

    this.state.start('BootGame')
  }
}
window.game = new Game()
