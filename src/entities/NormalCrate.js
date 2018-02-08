import Phaser from 'phaser'
import Crate from '../entities/Crate'

export default class NormalCrate extends Crate {
  constructor (game, collisionGroup) {
    super(game)
    this.loadTexture('crate')
    this.scale.setTo(this.game.scaleFactor.x, this.game.scaleFactor.x)
    this.game = game
    this.collisionGroup = collisionGroup
    this.game.physics.p2.enable(this)
    this.body.collideWorldBounds = true
    //console.log(this.game.normalBoxMaterial)
    this.body.setMaterial(this.game.normalMaterial)
    // this.game.physics.p2.setMaterial('normalBoxMaterial', this.body)
    // this.game.physics.p2.createMaterial('normalBoxMaterial', this.body)
    this.body.setCollisionGroup(this.collisionGroup)
    this.body.collides(this.collisionGroup)
  }

  update () {

  }
}
