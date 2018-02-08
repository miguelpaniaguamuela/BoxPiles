import Phaser from 'phaser'
import Crate from '../entities/Crate'

export default class GreyCrate extends Crate {
  constructor (game, collisionGroup) {
    super(game)
    this.loadTexture('greyCrate')
    this.scale.setTo(this.game.scaleFactor.x, this.game.scaleFactor.x)
    this.game = game
    this.collisionGroup = collisionGroup
    this.game.physics.p2.enable(this)
    this.body.setMaterial(this.game.normalMaterial)
    this.body.static = true
    this.body.setCollisionGroup(this.collisionGroup)
    this.body.collides(this.collisionGroup)
  }
}