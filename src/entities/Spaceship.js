import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.scale.setTo(this.game.scaleFactor.x, this.game.scaleFactor.y);
    this.anchor.setTo(0.5)
    this.isRotatingDown = false;
    this.isRotatingUp = false;
    this.game.physics.arcade.enable(this);
  }

  update () {
    this.checkAngle();
    this.setVerticalSpeed();
  }

   rotateUp(){
   	this.isRotatingUp = false;
   	this.isRotatingDown = true;
  }

  rotateDown(){
  	this.isRotatingUp = true;
    this.isRotatingDown = false;
  }

  setVerticalSpeed(){
    this.radAngle = Phaser.Math.degToRad(this.angle);
    this.body.velocity.y = Math.sin(this.radAngle)*900*this.game.scaleFactor.x;
  }

  checkAngle(){
     if(this.isRotatingUp==true)
      this.angle += 1;
    else if(this.isRotatingDown==true)
      this.angle -= 1;
  }

  checkGameOver(){
    if(this.body.position.y<0 || this.body.position.y>(game.world.height))
      return true;
    else
      return false;
  }
}
