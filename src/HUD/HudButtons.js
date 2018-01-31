import Phaser from 'phaser'
import Spaceship from '../entities/Spaceship'

export default class {

	constructor({ game, spaceship }) {
        this.game = game;
        this.spaceship = spaceship;
    }

    createButtons(){
    	this.buttonup = new Phaser.Button(
          this.game,
          0,
          0,
          "upbutton"
        );
        this.buttonup.scale.setTo(this.game.scaleFactor.x, this.game.scaleFactor.y);
        this.buttondown = new Phaser.Button(
          this.game,
          0,
          this.game.height - (200*this.game.scaleFactor.y),
          "downbutton"
        );
        this.buttondown.scale.setTo(this.game.scaleFactor.x, this.game.scaleFactor.y);
        this.menuPanel = this.game.add.group();
        this.menuPanel.add(this.buttonup);
        this.menuPanel.add(this.buttondown);
        this.addListeners();
    }

    addListeners(){
    	this.buttonup.onInputUp.add(()=>{
	    	this.spaceship.rotateUp();
	    });
	    this.buttondown.onInputUp.add(()=>{
	    	this.spaceship.rotateDown();
	    });
	}

}