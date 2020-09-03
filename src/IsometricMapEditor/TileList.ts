import {Layer} from '../Layer';
import {Game} from '../Game';
import {UpdateEvent} from '../UpdateEvent';
import {MouseHandler} from '../mouse/MouseHandler';
import {IsometricTile} from '../IsometricTile';
import {RenderEvent} from '../RenderEvent';
import {Sprite} from '../Sprite';

export class Selection implements Sprite {
    selectedTileId = 'empty';
    selectedId = 16;

    render(event: RenderEvent): void {
        event.context.fillStyle = 'rgba(255,255,255,0.5)';
        event.context.fillRect(256 + this.selectedId * 256, -64, 256, 512);
    }

    update(event: UpdateEvent): void {
    }

}

export class TileList extends Layer {
    mouseX = 0;
    startX = 0;
    selection = new Selection();

    constructor() {
        super(0, 0, 0, 0, 0.15);
        Array.from(Game.getInstance().scene.spriteLoader.imageDescriptors.keys())
            .forEach((id, index) => this.sprites.push(new IsometricTile(id, index + 1, 7)))

        this.sprites.push(this.selection);
    }

    update(event: UpdateEvent) {
        super.update(event);
        const newY = Game.getInstance().height / this.scale - 512;
        const resize = newY !== this.y;
        if (resize) {
            this.y = newY;
        }
        const hover = event.mouseState.y > 0;
        if (hover && event.mouseState.mouseButtonDown[MouseHandler.buttons.LEFT]) {
            if (event.mouseState.hasMouseButtonUpdated[MouseHandler.buttons.LEFT]) {
                this.mouseX = event.mouseState.x;
                this.startX = this.x;
            }
            this.x = this.startX + (event.mouseState.x - this.mouseX);
        }
        if (hover && !event.mouseState.mouseButtonDown[MouseHandler.buttons.LEFT] &&
            event.mouseState.hasMouseButtonUpdated[MouseHandler.buttons.LEFT]) {
            this.selection.selectedId = Math.floor(event.mouseState.x / (256)) - 1;
            this.selection.selectedTileId = (this.sprites[this.selection.selectedId] as IsometricTile).image.descriptor.id;
            console.log((this.selection.selectedId));
        }
    }

    render(event: RenderEvent) {
        super.render(event);


    }

}
