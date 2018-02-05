import Phaser from 'phaser'
import Crate from '../entities/Crate'
import Ground from '../entities/Ground'
import LevelLoader from '../levels/LevelLoader'
import Cannon from '../entities/Cannon'
import PowerBar from '../HUD/PowerBar'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.drawSky()
    this.crateGroup = this.game.add.group()
    this.setPhysics()
    this.chargeLevel()
    this.game.input.onDown.add(this.fire, this)
    this.firstMouseDown = true
  }

  update () {
    this.crateGroup.forEach(function (i) {
      if (i.y > this.game.height + i.height) {
        i.destroy()
      }
    }, this)
  }

  setPhysics () {
    this.game.physics.startSystem(Phaser.Physics.P2JS)
    this.collisionGroup = this.game.physics.p2.createCollisionGroup()
    this.game.physics.p2.setImpactEvents(true)
    this.game.physics.p2.friction = 1
    this.game.physics.p2.gravity.y = this.game.gameOptions.gravity
  }

  drawSky () {
    var sky = this.game.add.image(0, 0, 'sky')
    sky.width = this.game.width
    sky.height = this.game.height
  }

  chargeLevel () {
    this.createGround()
    this.createCannonGround()
    this.createCannon()
    this.readLevel()
  }

  createGround () {
    var ground = new Ground({
      game: this.game, x: 0, y: 0, asset: 'ground', collisionGroup: this.collisionGroup
    })
    ground.body.reset(this.game.width - ground.width, this.game.height - ground.height / 2)
    this.game.cratesSpawn = {
      x: this.game.width - ground.width * 3 / 2,
      y: this.game.height - ground.height / 2
    }
    this.game.add.existing(ground)
  }

  createCannonGround () {
    var ground = new Ground({
      game: this.game, x: 0, y: 0, asset: 'ground', collisionGroup: this.collisionGroup
    })
    ground.body.reset(ground.width, this.game.height - ground.height / 2)
    this.game.cannonSpawn = {
      x: ground.body.x,
      y: ground.body.y,
      width: ground.width,
      height: ground.height
    }
    this.game.add.existing(ground)
  }

  createCannon () {
    this.game.cannon = new Cannon({
      game: this.game, x: this.game.cannonSpawn.x, y: this.game.cannonSpawn.y - this.game.cannonSpawn.height, asset: 'cannon', collisionGroup: this.collisionGroup
    })
    this.game.add.existing(this.game.cannon)
  }

  readLevel () {
    var levelLoader = new LevelLoader({
      game: this.game, group: this.crateGroup, collisionGroup: this.collisionGroup
    })
    levelLoader.readLevel()
  }

  createPowerBar () {
    this.game.powerBar = new PowerBar({
      game: this.game, x: this.game.cannonSpawn.x - this.game.cannon.width, y: this.game.cannonSpawn.y, asset: 'borderPowerBar'
    })
    this.game.add.existing(this.game.powerBar)
  }

  fire () {
    if (this.firstMouseDown) {
      this.firstMouseDown = false
      this.game.cannon.stopRotation()
      this.game.cannon.stopRotation()
      this.createPowerBar()
    } else {
      this.firstMouseDown = true
      this.game.powerBar.stopIncreasing()
    }
  }
}
