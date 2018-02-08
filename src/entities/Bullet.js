import Phaser from 'phaser'

export default class Bullet extends Phaser.Sprite {
  constructor ({game, x, y, asset, collisionGroup, power, angle}) {
    super(game, x, y, asset)
    this.scale.setTo(this.game.scaleFactor.x, this.game.scaleFactor.x)
    this.game = game
    this.collisionGroup = collisionGroup
    this.power = power
    this.lastSoundPlayed = Date.now()
    this.cannonAngle = Phaser.Math.degToRad(angle)
    this.game.physics.p2.enable(this)
    this.body.collideWorldBounds = true
    //console.log(this.game.bulletMaterial)
    this.body.setMaterial(this.game.normalMaterial)
    this.body.setCollisionGroup(this.collisionGroup)
    this.body.collides(this.collisionGroup, function (b, b2) {
      this.stopRotation = true
      var delay = Date.now() - this.lastSoundPlayed
      if (delay > 200) {
        this.lastSoundPlayed = Date.now()
        Phaser.ArrayUtils.getRandomItem(this.game.hitSound).play()
      }
    }, this)
    this.body.force.x = Math.cos(this.cannonAngle) * -this.power * 50000 * this.game.scaleFactor.x
    this.body.force.y = Math.sin(-this.cannonAngle) * this.power * 50000 * this.game.scaleFactor.y
    this.body.mass = 25
    this.stopRotation = false
    this.destroyed = false
  }

  update () {
    this.rotate()
    this.checkDestroyed()
  }

  rotate () {
    if (!this.stopRotation) {
      this.body.rotation = Math.atan(this.body.velocity.y / this.body.velocity.x)
    }
  }

  setPosition (x) {
    this.x = x
  }

  getRotationState () {
    return this.stopRotation
  }

  checkDestroyed () {
    if (!this.destroyed && this.body.y > this.game.height) {
      this.destroyed = true
    }
  }
}
