import Phaser from 'phaser'
import Debris from '../entities/Debris';

export default class IndestructibleDebris extends Debris{

	constructor( game,x,y,asset) {
        super(game,x,y,asset);
    }

}