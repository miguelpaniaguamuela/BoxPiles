import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}

  create () {
    this.drawSky()
    this.chargeInfo()

    this.game.input.onDown.add(this.reload, this)
  }

  chargeInfo () {
    this.gameOverText = this.game.add.bitmapText(this.game.width / 2, this.game.height / 5, 'font', 'GAME OVER', 200 * this.game.scaleFactor.x)
    this.gameOverText.x -= this.gameOverText.width / 2

    this.scoreText = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2, 'font', 'HIGH SCORE', 100 * this.game.scaleFactor.x)
    this.scoreText.x -= this.scoreText.width / 2
    this.scoreDisplayText = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2 + this.scoreText.height * 4 / 3, 'font', this.game.score.toString(), 100 * this.game.scaleFactor.x)
    this.scoreDisplayText.x -= this.scoreDisplayText.width / 2
  }

  drawSky () {
    var sky = this.game.add.image(0, 0, 'sky')
    sky.width = this.game.width
    sky.height = this.game.height
  }

  reload () {
    this.game.state.start('PlayGame', true, false, 0, 0)
  }
}
