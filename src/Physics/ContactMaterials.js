export default class {
  constructor (game) {
    this.game = game
    this.createMaterials()
  }

  createMaterials () {
    this.game.normalMaterial = this.game.physics.p2.createMaterial('normalBoxMaterial')
    this.game.bounceMaterial = this.game.physics.p2.createMaterial('bulletMaterial')
    this.BounceVSNormal()
    this.NormalVSNormal()
    this.BounceVSBounce()
  }

  BounceVSNormal () {
    var contactMaterial = this.game.physics.p2.createContactMaterial(this.game.bounceMaterial, this.game.normalMaterial)
    contactMaterial.friction = 1
    contactMaterial.restitution = 3
  }

  NormalVSNormal () {
    var contactMaterial = this.game.physics.p2.createContactMaterial(this.game.normalMaterial, this.game.normalMaterial)
    contactMaterial.friction = 1
    contactMaterial.restitution = 0.2
  }

  BounceVSBounce () {
    var contactMaterial = this.game.physics.p2.createContactMaterial(this.game.bounceMaterial, this.game.bounceMaterial)
    contactMaterial.friction = 1
    contactMaterial.restitution = 3
  }
}
