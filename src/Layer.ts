import {Container} from './Container';
import {RenderEvent} from './RenderEvent';
import {Rectangle} from './Rectangle';
import {UpdateEvent} from './UpdateEvent';

export class Layer extends Container implements Rectangle {
    visible = true;

    constructor(public x: number,
                public y: number,
                public w: number,
                public h: number, public scale = 1) {
        super();
    }

    update(event: UpdateEvent): void {
        if (!this.visible) return;
        event.mouseState.x = (-this.x * this.scale + event.mouseState.nativeXCoordinate) / this.scale;
        event.mouseState.y = (-this.y * this.scale + event.mouseState.nativeYCoordinate) / this.scale;
        this.updateSprites(event);
    }

    render(event: RenderEvent) {
        if (!this.visible) return;
        event.context.scale(this.scale, this.scale);
        event.context.translate(this.x, this.y);
        this.renderSprites(event);
        event.context.resetTransform();
    };


}
