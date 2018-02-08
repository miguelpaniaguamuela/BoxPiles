import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.game.load.image('ground', 'assets/sprites/ground.png')
    this.game.load.image('sky', 'assets/sprites/sky.png')
    this.game.load.image('crate', 'assets/sprites/crate.png')
    this.game.load.image('redCrate', 'assets/sprites/redCrate.png')
    this.game.load.image('greyCrate', 'assets/sprites/greyCrate.png')
    this.game.load.image('pinkCrate', 'assets/sprites/pinkCrate.png')
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

    this.game.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt')
    this.game.load.bitmapFont('smallfont', 'assets/fonts/smallfont.png', 'assets/fonts/smallfont.fnt')

    this.game.load.text('level_1', 'assets/levels/level_1.txt')
    this.game.load.text('level_2', 'assets/levels/level_2.txt')
    this.game.load.text('level_3', 'assets/levels/level_3.txt')
    this.game.load.text('level_4', 'assets/levels/level_4.txt')
    this.game.load.text('level_5', 'assets/levels/level_5.txt')
    this.game.load.text('level_6', 'assets/levels/level_6.txt')
    this.game.load.text('level_7', 'assets/levels/level_7.txt')
    this.game.load.text('level_8', 'assets/levels/level_8.txt')
    this.game.load.text('level_9', 'assets/levels/level_9.txt')
    this.game.load.text('level_10', 'assets/levels/level_10.txt')
    this.game.load.text('level_11', 'assets/levels/level_11.txt')
    this.game.load.text('level_12', 'assets/levels/level_12.txt')
    this.game.load.text('level_13', 'assets/levels/level_13.txt')
    this.game.load.text('level_14', 'assets/levels/level_14.txt')
    this.game.load.text('level_15', 'assets/levels/level_15.txt')
  }

  create () {
    this.game.global = {
      GROUNDHEIGHT: 0,
      CRATEHEIGHT: 0
    }
    this.game.gameOptions = {
      timeLimit: 60,
      gravity: 2000,
      localStorageName: 'stackthecratesgame'
    }

    this.game.levels = [
      this.game.cache.getText('level_1'),
      this.game.cache.getText('level_2'),
      this.game.cache.getText('level_3'),
      this.game.cache.getText('level_4'),
      this.game.cache.getText('level_5'),
      this.game.cache.getText('level_6'),
      this.game.cache.getText('level_7'),
      this.game.cache.getText('level_8'),
      this.game.cache.getText('level_9'),
      this.game.cache.getText('level_10'),
      this.game.cache.getText('level_11'),
      this.game.cache.getText('level_12'),
      this.game.cache.getText('level_13'),
      this.game.cache.getText('level_14'),
      this.game.cache.getText('level_15')
    ]
    this.game.GROUNDHEIGHT = this.game.cache.getImage('ground').height
    this.game.CRATEHEIGHT = this.game.cache.getImage('crate').height
    this.game.state.start('PlayGame', true, false, 0, 0)
  }
}
