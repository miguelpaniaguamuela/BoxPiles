import Phaser from 'phaser'

export default class Ground extends Phaser.Sprite {
  constructor ({game, x, y, asset, collisionGroup}) {
    super(game, x, y, asset)
    this.game = game
    this.collisionGroup = collisionGroup
    this.game.physics.p2.enable(this)
    this.body.static = true
    this.body.setCollisionGroup(this.collisionGroup)
    this.body.collides(this.collisionGroup)
  }
}
