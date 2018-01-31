import 'pixi'
import 'p2'
import Phaser from 'phaser'

import MenuState from './states/Menu'
import PreloadState from './states/Preload'
import PlayState from './states/Game'

import config from './config'

class Game extends Phaser.Game {
  constructor () {
    super(window.innerWidth, window.innerHeight, Phaser.AUTO);
    this.scaleFactor = {x: window.innerWidth/1920, y:window.innerHeight/1080}; 
    this.state.add('Preload', PreloadState, false)
    this.state.add('Menu', MenuState, false)
    this.state.add('Game', PlayState, false)

    this.state.start('Preload')
  }

}
window.game = new Game()
