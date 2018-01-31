import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.load.image('spaceship', 'assets/images/nave.png');
    this.load.image('destructibledebris', 'assets/images/DestructibleDebris.png');
    this.load.image('indestructibledebris', 'assets/images/IndestructibleDebris.png');
    this.load.image('button', 'assets/images/button.png');
    this.load.image('upbutton', 'assets/images/button_up.png');
    this.load.image('downbutton', 'assets/images/button_down.png');
    this.load.image('background', 'assets/images/space.jpg')
  }

  create () {
    this.state.start('Menu')
  }
}