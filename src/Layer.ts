import {Container} from './Container';
import {RenderEvent} from './RenderEvent';
import {Rectangle} from './Rectangle';
import {UpdateEvent} from './UpdateEvent';

export class Layer extends Container implements Rectangle {

    constructor(public x: number,
                public y: number,
                public w: number,
                public h: number, public scale = 1) {
        super();
    }

    update = (event: UpdateEvent) => {
        event.mouseState.x = (event.mouseState.nativeXCoordinate) * this.scale
        event.mouseState.y = (event.mouseState.nativeYCoordinate) * this.scale
        this.updateSprites(event);
    }

    render = (event: RenderEvent) => {
        event.context.scale(this.scale, this.scale);
        this.renderSprites(event);
        event.context.resetTransform();
    };


}
