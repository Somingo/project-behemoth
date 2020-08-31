import {Scene} from './Scene';
import {Layer} from './Layer';
import {Game} from './Game';
import {ImageSprite} from './ImageSprite';
import {MouseStateMonitor} from './mouse/MouseStateMonitor';
import {IsometricTile} from './IsometricTile';
import {IsometricLayer} from './IsometricLayer';

const RANDOM_ESNW = ['E', 'S', 'N', 'W'];

export function randomENSW(): string {
    return RANDOM_ESNW[Math.floor(Math.random() * 4)];
}

export class DummyScene extends Scene {
    constructor() {
        super();
    }

    spriteList = (): string[] => ['assets/dirt.json'];

    init = (): void => {
        const groundLayer = new IsometricLayer(40, 20);
        const hud = new Layer(0, 0, Game.getInstance().width, Game.getInstance().height);
        hud.sprites.push(new MouseStateMonitor());
        this.layers.push(groundLayer);
        this.layers.push(hud);
    };
}
