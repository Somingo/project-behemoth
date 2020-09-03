import {Layer} from './Layer';
import {IsometricTile} from './IsometricTile';
import {randomENSW} from './IsometricMapEditor/IsometricMapEditor';
import {Dimension, Point} from './Rectangle';

export interface SerializableIsometricTileDescriptor extends Point {
    id: string;
}
export interface SerializableIsometricLayerDescriptor extends Dimension{
    tiles: SerializableIsometricTileDescriptor[];
}

export class IsometricLayer extends Layer {

    sprites:IsometricTile[] = [];

    constructor(public width: number, public height: number, public tileWidth = 256, public tileHeight = 128) {
        super(0, 0, width / 2 * tileWidth, height * tileHeight, 0.2);
    }

    getDescriptor():SerializableIsometricLayerDescriptor {
        return {w: this.width, h:this.height, tiles: this.sprites.map(tile=> ({id:tile.id, x:tile.x, y:tile.y}))};
    }

    static getEmptyLayer(id:string = 'empty', width: number,  height: number,  tileWidth = 256,  tileHeight = 128) {
        let isometricLayer = new IsometricLayer(width, height, tileWidth, tileHeight);
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                isometricLayer.sprites.push(new IsometricTile(id, j, i));
            }
        }
        return isometricLayer;
    }

    static loadLayer(layer:SerializableIsometricLayerDescriptor): IsometricLayer {
        let isometricLayer = new IsometricLayer(layer.w, layer.h);
        isometricLayer.sprites = layer.tiles.map(tile=>new IsometricTile(tile.id, tile.x, tile.y));
        return isometricLayer;
    }

}
