/* globals __DEV__ */
import Phaser from 'phaser'
import Spaceship from '../entities/Spaceship'
import Debris from '../entities/Debris';
import IndestructibleDebris from '../entities/IndestructibleDebris';
import DestructibleDebris from '../entities/DestructibleDebris';
import HudButtons from '../HUD/HudButtons'
import Background from '../entities/Background'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    thie.time.advancedTiming = true;
    this.createBackground(); 
    this.createSpaceship();    
    
    this.game.add.existing(this.background);
    this.game.add.existing(this.spaceship);
    this.debrisgroup = this.add.group();
    this.debrisgroup.enableBody = true;

    this.debrisTime = 0;
    this.debrisInterval = 2.0;

    this.createHudButtons();    
  }

  update(){
    this.game.debug.text(game.time.fps || '--', 50, 55, "#00ff00");
    this.debrisCreation();
    this.setDebrisSpeeds();
    this.setBackgroundSpeed();
    this.checkGameOver();
    game.physics.arcade.collide(this.spaceship, this.debrisgroup, this.after_collision);
    console.log("holas")
  }

  createBackground(){
    this.background = new Background({
      game: this.game,
      x: 0,
      y: 0
    });
  }

  createSpaceship(){
    this.spaceship = new Spaceship({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'spaceship'
    });
  }

  createHudButtons(){
    this.hudButtons = new HudButtons({
      game: this.game,
      spaceship: this.spaceship
    });
    this.hudButtons.createButtons();
  }

  debrisCreation(){
    if (this.isCreationTime()) {
      this.debrisTime = 0;
      this.addDebris();
    }
  }

  isCreationTime(){
    this.debrisTime += this.game.time.physicsElapsed;
    if (this.debrisTime > this.debrisInterval)
      return true;
    else
      return false;
  }

  createDebris(){
    this.typeOfDebris = this.game.rnd.integerInRange(0,1);
    if(this.typeOfDebris==0)
      return this.debris = new DestructibleDebris({
        game: this.game,
        x: 0,
        y: 0,
        asset: 'destructibledebris'
      });
    else
      return this.debris = new IndestructibleDebris({
        game: this.game,
        x: 0,
        y: 0,
        asset: 'indestructibledebris'
      });
        
  }

  addDebris(){
    let debris = this.debrisgroup.getFirstExists(false);
    if (!debris) {
      debris = this.createDebris();
      this.debrisgroup.add(debris);
    }
  }

  setDebrisSpeeds(){
    let angle=this.spaceship.angle
    this.debrisgroup.forEach(function (m, p) {
          m.setHorizontalSpeed(angle);
    });
  }

  setBackgroundSpeed(){
    let angle=this.spaceship.angle
    this.background.setHorizontalSpeed(angle);
  }

  checkGameOver(){
    if(this.spaceship.checkGameOver())
      this.game.state.start("Menu", true, false);
  }

  after_collision(){
    game.state.start("Menu", true, false);
  }

}
