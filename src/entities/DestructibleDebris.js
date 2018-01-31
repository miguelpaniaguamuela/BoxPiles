import Phaser from 'phaser'
import Debris from '../entities/Debris';

export default class DestructibleDebris extends Debris{

	constructor( game,x,y,asset) {
        super(game,x,y,asset);
        this.inputEnabled = true;
        this.input.useHandCursor = true;
        this.events.onInputDown.add(this.onDown, this);
        
    }

    onDown(sprite, pointer) {
        this.kill();
        this.destroy();
    }

}