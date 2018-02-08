import Phaser from 'phaser'

export default class Crate extends Phaser.Sprite {
  constructor (game) {
    super(game)
  }

  update () {

  }

  setPosition (x) {
    this.x = x
  }
}
