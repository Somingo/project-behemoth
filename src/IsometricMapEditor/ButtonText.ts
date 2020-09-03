import {Button} from './Button';
import {RenderEvent} from '../RenderEvent';

export class ButtonText extends Button {
    constructor(public text:string, id: string, idHover: string, x: number, y: number, w: number, h: number) {
        super(id, idHover, x,y,w,h);
    }

    render(event: RenderEvent) {
        event.context.font = '24px arial';
        if (this.hover || this.active) {
            this.imageHover.render(event);
            event.context.fillStyle = '#ffff00';
        } else {
            this.image.render(event);
            event.context.fillStyle = '#ffffff';
        }
        event.context.textAlign = 'center';
        event.context.textBaseline = 'middle';
        event.context.fillText(this.text, this.x+this.w/2, this.y+this.h/2);
    }
}
