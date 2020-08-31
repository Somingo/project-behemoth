import {Sprite} from '../Sprite';
import {RenderEvent} from '../RenderEvent';
import {UpdateEvent} from '../UpdateEvent';

export class MouseMonitor implements Sprite {

    stateText: string = '';

    render(event: RenderEvent): void {
        event.context.fillStyle = '#000000';
        event.context.font = '12px';
        event.context.fillText(this.stateText, 20,20);
    }

    update(event: UpdateEvent): void {
        this.stateText = `Mouse X:${event.mouseState.nativeXCoordinate} Y:${event.mouseState.nativeYCoordinate} B:${JSON.stringify(event.mouseState.mouseButtonDown)} ${JSON.stringify(event.mouseState.hasMouseButtonUpdated)}`;
    }

}
