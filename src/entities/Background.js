import Phaser from 'phaser'

export default class Background extends Phaser.Sprite{

	constructor({ game, x, y }) {
        super(game, x, y);
        this.bg = this.game.add.tileSprite(x, y, game.width, game.height, 'background');
        this.speed=10;
    }

    update(){
        this.bg.tilePosition.x -= this.speed*this.game.scaleFactor.x;
    }

    setHorizontalSpeed(angle){
        this.radAngle = Phaser.Math.degToRad(angle);
        this.speed = Math.cos(this.radAngle)*10;
    }


}