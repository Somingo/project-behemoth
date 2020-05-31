import {Scene} from './Scene';
import {Layer} from './Layer';
import {Game} from './Game';
import {ImageSprite} from './ImageSprite';

const RANDOM_ESNW = ['E', 'S', 'N', 'W'];

function randomENSW(): string {
    return RANDOM_ESNW[Math.floor(Math.random() * 4)];
}

export class DummyScene extends Scene {
    constructor() {
        super();
    }

    spriteList = (): string[] => ['assets/dirt.json'];

    init = (): void => {
        const dummyLayer = new Layer(0, 0, Game.getInstance().width, Game.getInstance().height, .20);
        for (let i = 0; i < 40; i++) {
            for (let j = 0; j < 20; j++) {
                dummyLayer.sprites.push(new ImageSprite('dirt_' + randomENSW(), 256 * j + 128 * (i % 2), 64 * i));
            }
        }
        this.layers.push(dummyLayer);
    };
}
