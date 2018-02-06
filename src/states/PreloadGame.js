import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.game.load.image('ground', 'assets/sprites/ground.png')
    this.game.load.image('sky', 'assets/sprites/sky.png')
    this.game.load.image('crate', 'assets/sprites/crate.png')
    this.game.load.image('cannonWheels', 'assets/sprites/wheels.png')
    this.game.load.image('borderPowerBar', 'assets/sprites/powerBar.png')
    this.game.load.image('powerBar', 'assets/sprites/powerBarProgression.png')
    this.game.load.image('cannon', 'assets/sprites/cannon.png')
    this.game.load.image('bullet', 'assets/sprites/bullet.png')
    this.game.load.image('title', 'assets/sprites/title.png')
    this.game.load.image('tap', 'assets/sprites/tap.png')
    this.game.load.audio('hit01', ['assets/sounds/hit01.mp3', 'assets/sounds/hit01.ogg'])
    this.game.load.audio('hit02', ['assets/sounds/hit02.mp3', 'assets/sounds/hit02.ogg'])
    this.game.load.audio('hit03', ['assets/sounds/hit03.mp3', 'assets/sounds/hit03.ogg'])
    this.game.load.audio('remove', ['assets/sounds/remove.mp3', 'assets/sounds/remove.ogg'])
    this.game.load.audio('gameover', ['assets/sounds/gameover.mp3', 'assets/sounds/gameover.ogg'])
    this.game.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt')
    this.game.load.bitmapFont('smallfont', 'assets/fonts/smallfont.png', 'assets/fonts/smallfont.fnt')
    this.game.load.text('level_1', 'assets/levels/level_1.txt')
  }

  create () {
    this.game.global = {
      GROUNDHEIGHT: 0,
      CRATEHEIGHT: 0
    }
    this.game.gameOptions = {
      gravity: 1000,
      localStorageName: 'stackthecratesgame'
    }

    this.game.level_1 = this.game.cache.getText('level_1')
    this.game.GROUNDHEIGHT = this.game.cache.getImage('ground').height
    this.game.CRATEHEIGHT = this.game.cache.getImage('crate').height
    this.game.state.start('PlayGame')
  }
}
