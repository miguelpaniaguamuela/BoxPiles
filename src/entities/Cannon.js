import Phaser from 'phaser'

export default class Cannon extends Phaser.Sprite {
  constructor ({game, x, y, asset, collisionGroup}) {
    super(game, x, y, asset)
    this.scale.setTo(this.game.scaleFactor.x, this.game.scaleFactor.x)
    this.game = game
    this.collisionGroup = collisionGroup
    this.game.physics.arcade.enable(this)
    this.anchor.setTo(0.5)
    this.rotateDirection = 0.75
    this.rotationMove = false
    this.drawWheels()
  }

  update () {
    this.checkRotation()
  }

  drawWheels () {
    var wheels = this.game.add.sprite(this.x - this.width / 2, this.y - this.height / 2, 'cannonWheels')
    this.anchor.setTo(0.5)
    wheels.scale.setTo(this.game.scaleFactor.x, this.game.scaleFactor.x)
  }

  checkRotation () {
    if (!this.rotationMove) {
      if (this.angle < -90) {
        this.rotateDirection = this.rotateDirection * -1
      } else if (this.angle > 0) {
        this.rotateDirection = this.rotateDirection * -1
      }
      this.angle += this.rotateDirection
    }
  }

  stopRotation () {
    this.rotationMove = true
  }

  runRotation () {
    this.rotationMove = false
  }
}
