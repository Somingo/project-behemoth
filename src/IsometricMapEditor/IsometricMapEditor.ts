import {Scene} from '../Scene';
import {Layer} from '../Layer';
import {Game} from '../Game';
import {MouseMonitor} from '../mouse/MouseMonitor';
import {IsometricLayer, SerializableIsometricLayerDescriptor} from '../IsometricLayer';
import {UpdateEvent} from '../UpdateEvent';
import {Keys} from '../keyboard/Keys';
import {TileList} from './TileList';
import {MouseHandler} from '../mouse/MouseHandler';
import {ImageSprite} from '../ImageSprite';
import {Button} from './Button';
import {ButtonText} from './ButtonText';

const RANDOM_ESNW = ['E', 'S', 'N', 'W'];

export function randomENSW(): string {
    return RANDOM_ESNW[Math.floor(Math.random() * 4)];
}

const MAP_ID = 'MAP_V1';

export class IsometricMapEditor extends Scene {
    gameLayers: IsometricLayer[] = [];
    tileList: TileList | null = null;
    menuButton: Button | null = null;
    loadMapButton: Button | null = null;
    saveMapButton: Button | null = null;
    hud: Layer | null = null;
    layerSelectorButtons: ButtonText[] = [];
    activeLayer = 0;

    constructor() {
        super();
    }

    spriteList = (): string[] => ['assets/desert_ground.json', 'assets/desert_objects.json', 'assets/ui.json'];

    init(): void {
        const groundLayer = IsometricLayer.getEmptyLayer('dirt_E', 40, 20);
        const floorLayer = IsometricLayer.getEmptyLayer('empty', 40, 20);
        this.gameLayers.push(groundLayer);
        this.gameLayers.push(floorLayer);
        this.layerSelectorButtons.push(new ButtonText('1', 'btn_Icon', 'btn_Icon', 1500, 90, 50, 50));
        this.layerSelectorButtons.push(new ButtonText('2', 'btn_Icon', 'btn_Icon', 1550, 90, 50, 50));
        this.layerSelectorButtons[0].active = true;
        this.tileList = new TileList();
        this.createHud();
        this.applyLayers();
    };

    createHud() {
        this.hud = new Layer(0, 0, Game.getInstance().width, Game.getInstance().height);
        this.hud.sprites.push(new MouseMonitor());
        this.menuButton = new Button('btn_Menu', 'btn_Menu_hover', 1500, 20, 50, 50);
        this.loadMapButton = new Button('btn_Replay', 'btn_Replay_hover', 1550, 20, 50, 50);
        this.saveMapButton = new Button('btn_Ok', 'btn_Ok_hover', 1600, 20, 50, 50);
        this.hud.sprites.push(this.menuButton);
        this.hud.sprites.push(this.loadMapButton);
        this.hud.sprites.push(this.saveMapButton);
        this.layerSelectorButtons.forEach(button=> this.hud?.sprites.push(button));
    }

    applyLayers():void {
        this.layers = [];
        this.gameLayers.forEach(layer => this.layers.push(layer));
        if (this.tileList)this.layers.push(this.tileList);
        if (this.hud)this.layers.push(this.hud);
    }

    saveMap() {
        const mapToSave = JSON.stringify(this.gameLayers.map(x=>x.getDescriptor()));
        window.localStorage.setItem(MAP_ID, mapToSave);
        console.log('Map Saved', mapToSave);
    }

    loadMap() {
        const mapString = window.localStorage.getItem(MAP_ID);
        if (mapString) {
            console.log('MAP', mapString);
            const map:SerializableIsometricLayerDescriptor[] = JSON.parse(mapString) as SerializableIsometricLayerDescriptor[];
            console.log('mapped map', map);
            this.gameLayers = map.map<IsometricLayer>(x=>IsometricLayer.loadLayer(x));
            this.layerSelectorButtons = [];
            map.forEach((layer, index)=> this.layerSelectorButtons.push(new ButtonText(''+(index+1), 'btn_Icon', 'btn_Icon', 1500+index*50, 90, 50, 50)));
            this.createHud();
            this.applyLayers();
            console.log('loaded', this);
        }
    }

    update(event: UpdateEvent): void {
        super.update(event);
        if (event.mouseState.mouseButtonDown[MouseHandler.buttons.LEFT]) {
            /* Load Map */
            if (event.mouseState.hasMouseButtonUpdated[MouseHandler.buttons.LEFT] && this.loadMapButton?.hover) {
                this.loadMap();
            }
            /* Save Map */
            if (event.mouseState.hasMouseButtonUpdated[MouseHandler.buttons.LEFT] && this.saveMapButton?.hover) {
                this.saveMap();
            }
            /* Place Tile */
            const target = this.gameLayers[0].sprites.find(x =>  x.hover);
            if (target) {
                const newId = this.tileList?.selection?.selectedTileId || 'empty';
                target.image = new ImageSprite(newId, target.cX, target.cY);
                target.id = newId;
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
