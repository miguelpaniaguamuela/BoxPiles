import NormalCrate from '../entities/NormalCrate'
import GreyCrate from '../entities/GreyCrate'
import PinkCrate from '../entities/PinkCrate'

export default class {
  constructor (game, group, collisionGroup) {
    this.game = game
    this.crateGroup = group
    this.collisionGroup = collisionGroup
  }

  readLevel () {
    this.readed = this.game.levels[this.game.map].split('\n')
    this.columns = this.readed[0]
    this.floors = Number.parseInt(this.readed[1], [ 10 ]) + 1
    this.buildStructure()
  }

  buildStructure () {
    for (var i = 0; i < this.columns; i++) {
      for (var j = this.floors; j >= 2; j--) {
        var fallingCrate = this.createBox(j, i)
        if (fallingCrate) {
          fallingCrate.body.reset(this.game.cratesSpawn.x + fallingCrate.width + (fallingCrate.width) * i, this.game.cratesSpawn.y - fallingCrate.height / 2 - fallingCrate.height * (this.floors + 1 - j))
          this.crateGroup.add(fallingCrate)
        }
      }
    }
  }

  createBox (j, i) {
    if (this.readed[j][i] !== ' ') {
      if (this.readed[j][i] === 'x') {
        var box = new NormalCrate(
          this.game, this.collisionGroup
        )
      } else if (this.readed[j][i] === 'o') {
        var box = new GreyCrate(
          this.game, this.collisionGroup
        )
      } else if (this.readed[j][i] === 'b') {
        var box = new PinkCrate(
          this.game, this.collisionGroup
        )
      }
      return box
    }
  }
}
