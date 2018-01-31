import Phaser from 'phaser'

export default class extends Phaser.State {

  create () {

    this.start = new Phaser.Button(
        this.game,
        this.game.world.centerX,
        this.game.world.centerY, 
        "button"
    );
    this.start.scale.setTo(this.game.scaleFactor.x, this.game.scaleFactor.y);
    this.start.onInputUp.add(()=>{
        this.state.start('Game');
    });

    this.game.add.existing(this.start);


    }
}

