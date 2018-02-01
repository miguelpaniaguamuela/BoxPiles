import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.game.load.image('ground', 'assets/sprites/ground.png')
    this.game.load.image('sky', 'assets/sprites/sky.png')
    this.game.load.image('crate', 'assets/sprites/crate.png')
    this.game.load.image('title', 'assets/sprites/title.png')
    this.game.load.image('tap', 'assets/sprites/tap.png')
    this.game.load.audio('hit01', ['assets/sounds/hit01.mp3', 'assets/sounds/hit01.ogg'])
    this.game.load.audio('hit02', ['assets/sounds/hit02.mp3', 'assets/sounds/hit02.ogg'])
    this.game.load.audio('hit03', ['assets/sounds/hit03.mp3', 'assets/sounds/hit03.ogg'])
    this.game.load.audio('remove', ['assets/sounds/remove.mp3', 'assets/sounds/remove.ogg'])
    this.game.load.audio('gameover', ['assets/sounds/gameover.mp3', 'assets/sounds/gameover.ogg'])
    this.game.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt')
    this.game.load.bitmapFont('smallfont', 'assets/fonts/smallfont.png', 'assets/fonts/smallfont.fnt')
  }

  create () {
    this.game.global = {
      GROUNDHEIGHT: 0,
      CRATEHEIGHT: 0
    }
    this.game.gameOptions = {
      gameWidth: 640,
      gameHeight: 960,
      timeLimit: 60,
      gravity: 2000,
      crateSpeed: 500,
      crateHorizontalRange: 540,
      fallingHeight: 700,
      localStorageName: 'stackthecratesgame'
    }

    this.game.GROUNDHEIGHT = this.game.cache.getImage('ground').height
    this.game.CRATEHEIGHT = this.game.cache.getImage('crate').height
    this.game.state.start('PlayGame')
  }
}