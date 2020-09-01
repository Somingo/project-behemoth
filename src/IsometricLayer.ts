import {Layer} from './Layer';
import {IsometricTile} from './IsometricTile';
import {randomENSW} from './DummyScene';

export class IsometricLayer extends Layer {

    constructor(public width: number, public height: number, public tileWidth = 256, public tileHeight = 128) {
        super(0, 0, width / 2 * tileWidth, height * tileHeight, 0.2);
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                this.sprites.push(new IsometricTile('dirt_' + randomENSW(), j, i));
            }
        }
    }

}
