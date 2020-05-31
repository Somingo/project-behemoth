import {Container} from './Container';
import {RenderEvent} from './RenderEvent';
import {Rectangle} from './Rectangle';

export class Layer extends Container implements Rectangle {

    constructor(public x: number,
                public y: number,
                public w: number,
                public h: number, public scale = 1) {
        super();
    }

    render = (event: RenderEvent) => {
        event.context.scale(this.scale, this.scale);
        this.renderSprites(event);
        event.context.resetTransform();
    };


}
