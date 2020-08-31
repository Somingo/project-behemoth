import {ImageSprite} from './ImageSprite';
import {Sprite} from './Sprite';
import {RenderEvent} from './RenderEvent';
import {UpdateEvent} from './UpdateEvent';

export class IsometricTile implements Sprite {
    image: ImageSprite;
    hover = false;

    width = 256;
    height = 128;
    cX: number;
    cY: number;

    constructor(id: string, public x: number, public y: number) {
        this.cX = this.width * x + this.width / 2 * (y % 2);
        this.cY = this.height / 2 * y;
        this.image = new ImageSprite(id, this.cX, this.height / 2 * y);
    }

    render(event: RenderEvent): void {
        this.image.render(event);
        if (this.hover) {
            event.context.fillStyle = 'rgba(0,0,255,0.5)';
            event.context.fillRect(this.image.dx, this.image.dy, this.image.dw, this.image.dh);
        }
    }

    update(event: UpdateEvent): void {
        this.image.update(event);
        const vy = event.mouseState.y;
        const vx = event.mouseState.x;
        const vy1 = this.image.dy + this.image.dh - 128;
        const vym = vy1 + 64;
        const vx1 = this.image.dx;
        const vx2 = this.image.dx + this.image.dw;
        this.hover =
            vy - vym < 0.5 * (vx2 - vx) &&
            vy - vym > 0.5 * (vx1 - vx) &&
            vy - vym > -0.5 * (vx2 - vx) &&
            vy - vym < -0.5 * (vx1 - vx);
    }
}
