/* globals __DEV__ */
import Phaser from 'phaser'
import Crate from '../entities/Crate'
import Ground from '../entities/Ground'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.crateGroup = this.game.add.group()

    this.game.physics.startSystem(Phaser.Physics.P2JS)
    this.collisionGroup = this.game.physics.p2.createCollisionGroup()
    this.game.physics.p2.setImpactEvents(true)
    this.game.physics.p2.friction = 1
    this.game.physics.p2.gravity.y = this.game.gameOptions.gravity
    var ground = new Ground({
      game: this.game, x: this.game.width / 2, y: this.game.height, asset: 'ground', collisionGroup: this.collisionGroup
    })
    this.game.add.existing(ground)
    ground.y = this.game.height - ground.height
    this.movingCrate = this.game.add.sprite((this.game.width - this.game.gameOptions.crateHorizontalRange) / 2, this.game.height - game.GROUNDHEIGHT - game.gameOptions.fallingHeight, 'crate')
    this.movingCrate.anchor.set(0.5)
    this.game.add.tween(this.movingCrate).to({
      x: (this.game.width + this.game.gameOptions.crateHorizontalRange) / 2
    }, this.game.gameOptions.crateSpeed, Phaser.Easing.Linear.None, true, 0, -1, true)
    this.game.input.onDown.add(this.dropCrate, this)
  }

  dropCrate () {
    this.movingCrate.alpha = 0
    var fallingCrate = new Crate({
      game: this.game, x: this.movingCrate.x, y: this.movingCrate.y, asset: 'crate'
    })
    fallingCrate.hit = false
    this.game.physics.p2.enable(fallingCrate)
    this.crateGroup.add(fallingCrate)
    fallingCrate.body.setCollisionGroup(this.collisionGroup)
    fallingCrate.body.collides(this.collisionGroup, function (b, b2) {
      if (!b.sprite.hit) {
        b.sprite.hit = true
        this.getMaxHeight()
      }
    }, this)
  }

  update () {
    this.crateGroup.forEach(function (i) {
      if (i.y > this.game.height + i.height) {
        if (!i.hit) {
          this.getMaxHeight()
        }
        i.destroy()
      }
    }, this)
  }

  getMaxHeight () {
    var maxHeight = 0
    this.crateGroup.forEach(function (i) {
      if (i.hit) {
        var height = Math.round((this.game.height - this.game.GROUNDHEIGHT - i.y - this.game.CRATEHEIGHT / 2) / this.game.CRATEHEIGHT) + 1
        maxHeight = Math.max(height, maxHeight)
      }
    }, this)
    this.movingCrate.y = this.game.height - this.game.GROUNDHEIGHT - maxHeight * this.game.CRATEHEIGHT - this.game.gameOptions.fallingHeight
  }
}
