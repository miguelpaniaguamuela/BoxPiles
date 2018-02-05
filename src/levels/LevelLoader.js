import Crate from '../entities/Crate'

export default class {
  constructor ({game, group, collisionGroup}) {
    this.game = game
    this.crateGroup = group
    this.collisionGroup = collisionGroup
  }

  readLevel () {
    this.uno = this.game.level_1.split('\n')
    this.columns = this.uno[0]
    this.floors = Number.parseInt(this.uno[1], [ 10 ]) + 1
    this.buildStructure()
  }

  buildStructure () {
    for (var i = 0; i < this.columns; i++) {
      for (var j = this.floors; j >= 2; j--) {
        var fallingCrate = this.createBox(j, i)
        if (fallingCrate) {
          fallingCrate.body.reset(this.game.cratesSpawn.x + fallingCrate.width + (fallingCrate.width) * i, this.game.cratesSpawn.y - fallingCrate.height * (this.floors + 1 - j))
          this.crateGroup.add(fallingCrate)
        }
      }
    }
  }

  createBox (j, i) {
    if (this.uno[j][i] !== ' ') {
      var box = new Crate({
        game: this.game, x: 0, y: 0, asset: 'crate', collisionGroup: this.collisionGroup
      })
      return box
    }
  }
}
