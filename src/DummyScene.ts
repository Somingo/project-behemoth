import {Scene} from './Scene';
import {Layer} from './Layer';
import {Game} from './Game';
import {MouseMonitor} from './mouse/MouseMonitor';
import {IsometricLayer} from './IsometricLayer';
import {UpdateEvent} from './UpdateEvent';
import {Keys} from './keyboard/Keys';

const RANDOM_ESNW = ['E', 'S', 'N', 'W'];

export function randomENSW(): string {
    return RANDOM_ESNW[Math.floor(Math.random() * 4)];
}

export class DummyScene extends Scene {
    gameLayers: Layer[] = [];

    constructor() {
        super();
    }

    spriteList = (): string[] => ['assets/dirt.json'];

    init = (): void => {
        const groundLayer = new IsometricLayer(40, 20);
        this.gameLayers.push(groundLayer);
        const hud = new Layer(0, 0, Game.getInstance().width, Game.getInstance().height);
        hud.sprites.push(new MouseMonitor());
        this.layers.push(groundLayer);
        this.layers.push(hud);
    };

    update(event: UpdateEvent): void {
        super.update(event);
        if (event.keyState.keyDown[Keys.leftArrow]) {
            this.gameLayers.forEach(layer => layer.x -= 20);
        }
        if (event.keyState.keyDown[Keys.rightArrow]) {
            this.gameLayers.forEach(layer => layer.x += 20);
        }
        if (event.keyState.keyDown[Keys.upArrow]) {
            this.gameLayers.forEach(layer => layer.y -= 20);
        }
        if (event.keyState.keyDown[Keys.downArrow]) {
            this.gameLayers.forEach(layer => layer.y += 20);
        }
    }
}
