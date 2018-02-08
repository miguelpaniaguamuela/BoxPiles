import Phaser from 'phaser'
import Crate from '../entities/Crate'

export default class PinkCrate extends Crate {
  constructor (game, collisionGroup) {
    super(game)
    this.loadTexture('pinkCrate')
    this.scale.setTo(this.game.scaleFactor.x, this.game.scaleFactor.x)
    this.game = game
    this.collisionGroup = collisionGroup
    this.game.physics.p2.enable(this)
    this.body.setMaterial(this.game.bounceMaterial)
    this.body.static = true
    this.body.collideWorldBounds = true
    this.body.setCollisionGroup(this.collisionGroup)
    this.body.collides(this.collisionGroup)
  }
}