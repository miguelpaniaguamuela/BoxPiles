import Phaser from 'phaser'
import Ground from '../entities/Ground'
import LevelLoader from '../entities/LevelLoader'
import Cannon from '../entities/Cannon'
import Bullet from '../entities/Bullet'
import PowerBar from '../HUD/PowerBar'
import ContactMaterials from '../Physics/ContactMaterials'

export default class extends Phaser.State {
  init (map, score) {
    this.game.map = map
    this.game.score = score
  }
  preload () {}

  create () {
    this.game.time.advancedTiming = true

    this.game.hitSound = [this.game.add.audio('hit01'), this.game.add.audio('hit02'), this.game.add.audio('hit03')]

    this.drawSky()
    this.crateGroup = this.game.add.group()
    this.menuGroup = this.game.add.group()
    this.setPhysics()
    this.chargeLevel()

    this.game.input.onDown.add(this.fire, this)
    this.firstMouseDown = true
    this.secondMouseDown = true
  }

  update () {
    this.checkScore()
    this.checkChangeLevel()
  }

  setPhysics () {
    this.game.physics.startSystem(Phaser.Physics.P2JS)
    this.collisionGroup = this.game.physics.p2.createCollisionGroup()
    this.game.physics.p2.setImpactEvents(true)
    this.game.physics.p2.friction = 1
    this.game.physics.p2.gravity.y = this.game.gameOptions.gravity * this.game.scaleFactor.y

    this.contactManager = new ContactMaterials(this.game)
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
    this.createTexts()
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
    this.game.cannon.reset(this.game.cannonSpawn.x - this.game.cannon.width / 4, this.game.cannonSpawn.y - this.game.cannonSpawn.height / 1.5)
    this.game.add.existing(this.game.cannon)
  }

  createTexts () {
    this.scoreText = this.game.add.bitmapText(this.game.width / 2, this.game.height / 20, 'font', 'YOUR SCORE', 72 * this.game.scaleFactor.x)
    this.scoreText.x -= this.scoreText.width / 2

    this.scoreDisplayText = this.game.add.bitmapText(this.game.width / 2, this.game.height / 5, 'font', this.game.score.toString(), 72 * this.game.scaleFactor.x)
    this.scoreDisplayText.x -= this.scoreDisplayText.width / 2

    this.levelText = this.game.add.bitmapText(this.game.width / 40, this.game.height / 20, 'font', 'Level ' + (this.game.map + 1).toString(), 72 * this.game.scaleFactor.x)
  }

  readLevel () {
    var levelLoader = new LevelLoader(
      this.game, this.crateGroup, this.collisionGroup
    )
    levelLoader.readLevel()
  }

  fire () {
    if (this.secondMouseDown) {
      if (this.firstMouseDown) {
        this.firstMouseDown = false
        this.game.cannon.stopRotation()
        this.createPowerBar()
      } else {
        this.secondMouseDown = false
        this.game.powerBar.stopIncreasing()
        this.createBullet()
      }
    }
  }

  createPowerBar () {
    this.game.powerBar = new PowerBar({
      game: this.game, x: this.game.cannonSpawn.x - this.game.cannon.width, y: this.game.cannonSpawn.y, asset: 'borderPowerBar'
    })
    this.game.add.existing(this.game.powerBar)
  }

  createBullet () {
    this.game.radiands = Phaser.Math.degToRad(this.game.cannon.angle)
    this.game.bullet = new Bullet({
      game: this.game,
      x: this.game.cannon.body.x + this.game.cannon.width * Math.cos(-this.game.radiands),
      y: this.game.cannon.body.y + this.game.cannon.height / 2 + (this.game.cannon.height * Math.sin(this.game.radiands)),
      asset: 'bullet',
      collisionGroup: this.collisionGroup,
      power: this.game.powerBar.power,
      angle: this.game.cannon.angle
    })
    this.game.add.existing(this.game.bullet)
  }

  checkScore () {
    this.crateGroup.forEach(function (i) {
      if (i.y > this.game.height + i.height) {
        i.destroy()
        this.game.score += 1
        this.changeScore()
      }
    }, this)
  }

  changeScore () {
    this.scoreDisplayText.destroy()
    this.scoreDisplayText = this.game.add.bitmapText(this.game.width / 2, this.game.height / 5, 'font', this.game.score.toString(), 72 * this.game.scaleFactor.x)
    this.scoreDisplayText.x -= this.scoreDisplayText.width / 2
  }

  checkChangeLevel () {
    if (this.game.bullet && this.game.bullet.stopRotation) {
      this.waitForLevel(2)
    }
    if (this.game.bullet && this.game.bullet.destroyed && !this.game.bullet.stopRotation) {
      this.waitForLevel(1)
    }
  }

  waitForLevel (time) {
    this.game.changeLevel = true
    this.timer = this.game.time.create(false)
    this.game.time.events.add(Phaser.Timer.SECOND * time, this.changeLevel, this)
  }

  changeLevel () {
    this.game.bullet = null
    this.game.cannon = null
    if (this.game.map === this.game.levels.length - 1) {
      this.game.state.start('GameOver')
    } else {
      this.game.state.start('PlayGame', true, false, this.game.map + 1, this.game.score)
    }
  }
}
