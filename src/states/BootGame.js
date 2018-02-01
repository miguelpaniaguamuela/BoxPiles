import Phaser from 'phaser'

export default class extends Phaser.State {
  create () {
    this.game.scale.pageAlignHorizontally = true
    this.game.scale.pageAlignVertically = true
    this.game.stage.disableVisibilityChange = true
    this.game.state.start('PreloadGame')
  }
}
