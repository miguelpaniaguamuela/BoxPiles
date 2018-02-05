import Phaser from 'phaser'

export default class PowerBar extends Phaser.Sprite {
  constructor ({game, x, y, asset}) {
    super(game, x, y, asset)
    this.scale.setTo(this.game.scaleFactor.x, this.game.scaleFactor.x)
    this.game = game
    this.game.physics.arcade.enable(this)
    this.anchor.setTo(0.5)
    this.power = 0
    this.powerIncreased = 1
    this.powerIncreasing = true
    this.drawBorder()
  }

  update () {
    this.checkPower()
    this.addPower()
    this.powerBar.height = (this.power / 100) * this.height
  }

  checkPower () {
    if (this.power === -100) {
      this.powerIncreased = this.powerIncreased * -1
    } else if (this.power === 0) {
      this.powerIncreased = this.powerIncreased * -1
    }
  }

  drawBorder () {
    this.powerBar = this.game.add.sprite(this.x - this.width / 2, this.y - this.height / 2, 'powerBar')
    this.anchor.setTo(0.5, 1.48)
    this.powerBar.scale.setTo(this.game.scaleFactor.x, this.game.scaleFactor.x)
  }

  addPower () {
    if (this.powerIncreasing) {
      this.power += this.powerIncreased
    }
  }
  stopIncreasing () {
    this.powerIncreasing = false
  }
}
