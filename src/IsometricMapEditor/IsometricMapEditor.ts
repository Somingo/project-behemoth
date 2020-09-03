import {Scene} from '../Scene';
import {Layer} from '../Layer';
import {Game} from '../Game';
import {MouseMonitor} from '../mouse/MouseMonitor';
import {IsometricLayer} from '../IsometricLayer';
import {UpdateEvent} from '../UpdateEvent';
import {Keys} from '../keyboard/Keys';
import {TileList} from './TileList';
import {MouseHandler} from '../mouse/MouseHandler';
import {IsometricTile} from '../IsometricTile';
import {ImageSprite} from '../ImageSprite';

const RANDOM_ESNW = ['E', 'S', 'N', 'W'];

export function randomENSW(): string {
    return RANDOM_ESNW[Math.floor(Math.random() * 4)];
}

export class IsometricMapEditor extends Scene {
    gameLayers: Layer[] = [];
    tileList: TileList | null = null;

    constructor() {
        super();
    }

    spriteList = (): string[] => ['assets/desert_ground.json', 'assets/desert_objects.json', 'assets/ui.json'];

    init(): void {
        const groundLayer = new IsometricLayer(40, 20);
        this.gameLayers.push(groundLayer);
        this.tileList = new TileList();
        const hud = new Layer(0, 0, Game.getInstance().width, Game.getInstance().height);
        hud.sprites.push(new MouseMonitor());
        this.layers.push(groundLayer);
        this.layers.push(this.tileList);
        this.layers.push(hud);
    };

    update(event: UpdateEvent): void {
        super.update(event);
        if (event.mouseState.mouseButtonDown[MouseHandler.buttons.LEFT]) {
            const target = this.gameLayers[0].sprites.find(x => (x instanceof IsometricTile) ? x.hover : false);
            if (target instanceof IsometricTile) {
                target.image = new ImageSprite(this.tileList?.selection?.selectedTileId || 'empty', target.cX, target.cY);
            }
        }
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
