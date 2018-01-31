import Phaser from 'phaser'
import Spaceship from '../entities/Spaceship'

export default class Debris extends Phaser.Sprite{

	constructor({ game, x,y,asset}) {
        x = game.world.width;
        y = game.rnd.integerInRange(0, game.world.height);
        super(game, x, y, asset);
        this.scale.setTo(this.game.scaleFactor.x, this.game.scaleFactor.x);
        this.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this);
        this.speed=-600;
    }

    update(){
        this.angle += 1;
        this.checkDestory();
    }

    setHorizontalSpeed(angle){
        this.radAngle = Phaser.Math.degToRad(angle);
        this.speed = Math.cos(this.radAngle)*-600;
    }

    checkDestory(){
        if(this.body.position.x<-200){
            this.kill();
            this.destroy();
        }else
            this.applySpeed();
    }

    applySpeed(){
        this.body.velocity.x = this.speed*this.game.scaleFactor.x;
    }

}