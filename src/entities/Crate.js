import Phaser from 'phaser'

export default class Crate extends Phaser.Sprite {
  constructor ({game, x, y, asset}) {
    super(game, x, y, asset)
    this.game = game
    this.game.physics.p2.enable(this)
  }

  update () {

  }

  setHorizontalSpeed (angle) {
    this.radAngle = Phaser.Math.degToRad(angle)
    this.speed = Math.cos(this.radAngle) * -600
  }

  checkDestory () {
    if (this.body.position.x < -200) {
      this.kill()
      this.destroy()
    } else {
      this.applySpeed()
    }
  }

  applySpeed () {
    this.body.velocity.x = this.speed * this.game.scaleFactor.x
  }
}
