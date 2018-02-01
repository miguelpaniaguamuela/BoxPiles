/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    if (!Phaser.Device.desktop) {
      this.game.scale.forceOrientation(false, true)
      this.game.scale.enterIncorrectOrientation.add(function () {
        this.game.paused = true
        document.querySelector('canvas').style.display = 'none'
        document.getElementById('wrongorientation').style.display = 'block'
      })
      this.game.scale.leaveIncorrectOrientation.add(function () {
        this.game.paused = false
        document.querySelector('canvas').style.display = 'block'
        document.getElementById('wrongorientation').style.display = 'none'
      })
    }
    this.lastSoundPlayed = Date.now()
    this.savedData = localStorage.getItem(this.game.gameOptions.localStorageName) == null ? {score: 0} : JSON.parse(localStorage.getItem(this.game.gameOptions.localStorageName))
    this.hitSound = [this.game.add.audio('hit01'), this.game.add.audio('hit02'), this.game.add.audio('hit03')]
    this.gameOverSound = this.game.add.audio('gameover')
    this.removeSound = this.game.add.audio('remove')
    this.score = 0
    this.firstCrate = true
    var sky = this.game.add.image(0, 0, 'sky')
    sky.width = this.game.width
    sky.height = this.game.height
    this.timeText = this.game.add.bitmapText(this.game.width / 2, this.game.height / 5 + 140, 'font', this.game.gameOptions.timeLimit.toString(), 144)
    this.timeText.alpha = 0.5
    this.timeText.anchor.set(0.5)
    this.timeText.visible = false
    this.cameraGroup = this.game.add.group()
    this.crateGroup = this.game.add.group()
    this.cameraGroup.add(this.crateGroup)
    this.game.physics.startSystem(Phaser.Physics.P2JS)
    this.collisionGroup = this.game.physics.p2.createCollisionGroup()
    this.game.physics.p2.setImpactEvents(true)
    this.game.physics.p2.friction = 1
    this.game.physics.p2.gravity.y = this.game.gameOptions.gravity
    this.canDrop = true
    var ground = this.game.add.sprite(this.game.width / 2, this.game.height, 'ground')
    ground.y = this.game.height - ground.height / 2
    this.movingCrate = this.game.add.sprite((this.game.width - this.game.gameOptions.crateHorizontalRange) / 2, this.game.height - game.GROUNDHEIGHT - game.gameOptions.fallingHeight, 'crate')
    this.movingCrate.anchor.set(0.5)
    this.cameraGroup.add(this.movingCrate)
    var crateTween = this.game.add.tween(this.movingCrate).to({
      x: (this.game.width + this.game.gameOptions.crateHorizontalRange) / 2
    }, this.game.gameOptions.crateSpeed, Phaser.Easing.Linear.None, true, 0, -1, true)
    this.game.physics.p2.enable(ground)
    ground.body.static = true
    ground.body.setCollisionGroup(this.collisionGroup)
    ground.body.collides(this.collisionGroup)
    this.cameraGroup.add(ground)
    this.game.input.onDown.add(this.dropCrate, this)
    this.menuGroup = this.game.add.group()
    var tap = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'tap')
    tap.anchor.set(0.5)
    this.menuGroup.add(tap)
    var title = this.game.add.image(this.game.width / 2, tap.y - 470, 'title')
    title.anchor.set(0.5, 0)
    this.menuGroup.add(title)
    var hiScoreText = this.game.add.bitmapText(this.game.width / 2, this.game.height - 74, 'smallfont', 'BEST SCORE', 24)
    hiScoreText.anchor.set(0.5)
    this.menuGroup.add(hiScoreText)
    var hiScore = this.game.add.bitmapText(this.game.width / 2, this.game.height - 20, 'font', this.savedData.score.toString(), 72)
    hiScore.anchor.set(0.5)
    this.menuGroup.add(hiScore)
    var tapTween = this.game.add.tween(tap).to({
      alpha: 0
    }, 150, Phaser.Easing.Cubic.InOut, true, 0, -1, true)
  }

  dropCrate () {
    if (this.firstCrate) {
      this.firstCrate = false
      this.menuGroup.destroy()
      this.timer = 0
      this.timerEvent = this.game.time.events.loop(Phaser.Timer.SECOND, this.tick, this)
      this.timeText.visible = true
    }
    if (this.canDrop && this.timer <= this.game.gameOptions.timeLimit) {
      this.canDrop = false
      this.movingCrate.alpha = 0
      var fallingCrate = this.game.add.sprite(this.movingCrate.x, this.movingCrate.y, 'crate')
      fallingCrate.hit = false
      this.game.physics.p2.enable(fallingCrate)
      this.crateGroup.add(fallingCrate)
      fallingCrate.body.setCollisionGroup(this.collisionGroup)
      fallingCrate.body.collides(this.collisionGroup, function (b, b2) {
        var delay = Date.now() - this.lastSoundPlayed
        if (delay > 200 && this.timer <= this.game.gameOptions.timeLimit) {
          this.lastSoundPlayed = Date.now()
          Phaser.ArrayUtils.getRandomItem(this.hitSound).play()
        }
        if (!b.sprite.hit) {
          b.sprite.hit = true
          this.getMaxHeight()
        }
      }, this)
    }
  }

  update () {
    this.crateGroup.forEach(function (i) {
      if (i.y > game.height + i.height) {
        if (!i.hit) {
          this.getMaxHeight()
        }
        i.destroy()
      }
    }, this)
  }

  scaleCamera (cameraScale) {
    var moveTween = this.game.add.tween(this.cameraGroup).to({
      x: (this.game.width - this.game.width * cameraScale) / 2,
      y: this.game.height - this.game.height * cameraScale
    }, 200, Phaser.Easing.Quadratic.IN, true)
    var scaleTween = this.game.add.tween(this.cameraGroup.scale).to({
      x: cameraScale,
      y: cameraScale
    }, 200, Phaser.Easing.Quadratic.IN, true)
    scaleTween.onComplete.add(function () {
      this.canDrop = true
      this.movingCrate.alpha = 1
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
    var newHeight = this.game.height + this.game.CRATEHEIGHT * maxHeight
    var ratio = this.game.height / newHeight
    this.scaleCamera(ratio)
  }
  tick () {
    this.timer++
    this.timeText.text = (this.game.gameOptions.timeLimit - this.timer).toString()
    if (this.timer > this.game.gameOptions.timeLimit) {
      this.game.time.events.remove(this.timerEvent)
      this.movingCrate.destroy()
      this.timeText.destroy()
      this.game.time.events.add(Phaser.Timer.SECOND * 2, function () {
        this.crateGroup.forEach(function (i) {
          i.body.static = true
        }, true)
        this.removeEvent = this.game.time.events.loop(Phaser.Timer.SECOND / 10, this.removeCrate, this)
      }, this)
    }
  }

  removeCrate () {
    if (this.crateGroup.children.length > 0) {
      var tempCrate = this.crateGroup.getChildAt(0)
      var height = Math.round((this.game.height - this.game.GROUNDHEIGHT - tempCrate.y - this.game.CRATEHEIGHT / 2) / this.game.CRATEHEIGHT) + 1
      this.score += height
      this.removeSound.play()
      var crateScoreText = this.game.add.bitmapText(tempCrate.x, tempCrate.y, 'smallfont', height.toString(), 36)
      crateScoreText.anchor.set(0.5)
      this.cameraGroup.add(crateScoreText)
      tempCrate.destroy()
    } else {
      this.game.time.events.remove(this.removeEvent)
      this.gameOverSound.play()
      var scoreText = this.game.add.bitmapText(this.game.width / 2, this.game.height / 5, 'font', 'YOUR SCORE', 72)
      scoreText.anchor.set(0.5)
      var scoreDisplayText = this.game.add.bitmapText(this.game.width / 2, this.game.height / 5 + 140, 'font', this.score.toString(), 144)
      scoreDisplayText.anchor.set(0.5)
      localStorage.setItem(this.game.gameOptions.localStorageName, JSON.stringify({
        score: Math.max(this.score, this.savedData.score)
      }))
      this.game.time.events.add(Phaser.Timer.SECOND * 5, function () {
        this.game.state.start('PlayGame')
      }, this)
    }
  }
}
