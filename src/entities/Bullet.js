import Phaser from 'phaser'

export default class Bullet extends Phaser.Sprite {
  constructor ({game, x, y, asset, collisionGroup}) {
    super(game, x, y, asset)
    this.scale.setTo(this.game.scaleFactor.x, this.game.scaleFactor.x)
    this.game = game
    this.collisionGroup = collisionGroup
    this.game.physics.p2.enable(this)
    this.body.setCollisionGroup(this.collisionGroup)
    this.body.collides(this.collisionGroup)
    this.body.damping = (0.9999)
    this.body.applyImpulse(223,0,0)
  }

  update () {
    console.log(this.body.x)
  }

  setPosition (x) {
    this.x = x
  }
}
