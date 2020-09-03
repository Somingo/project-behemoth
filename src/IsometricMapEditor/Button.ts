import {Sprite} from '../Sprite';
import {Rectangle} from '../Rectangle';
import {RenderEvent} from '../RenderEvent';
import {UpdateEvent} from '../UpdateEvent';
import {ImageSprite} from '../ImageSprite';

export class Button implements Sprite, Rectangle {
    h: number;
    w: number;
    x: number;
    y: number;
    hover = false;
    active = false;

    image: ImageSprite;
    imageHover: ImageSprite;

    constructor(id: string, idHover: string, x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = new ImageSprite(id, x, y, w, h);
        this.imageHover = new ImageSprite(idHover, x, y, w, h);
    }

    render(event: RenderEvent): void {
        if (this.hover || this.active) {
            this.imageHover.render(event);
        } else {
            this.image.render(event);
        }
    }

    update(event: UpdateEvent): void {
        this.hover = event.mouseState.x > this.x && event.mouseState.x < this.x + this.w && event.mouseState.y > this.y && event.mouseState.y < this.y + this.h;
    }

}
