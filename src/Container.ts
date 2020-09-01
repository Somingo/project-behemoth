import {Sprite} from './Sprite';
import {RenderEvent} from './RenderEvent';
import {UpdateEvent} from './UpdateEvent';

export class Container implements Sprite {
    sprites: Sprite[] = [];

    renderSprites(event: RenderEvent): void {
        this.sprites.forEach(sprite => sprite.render(event));
    };

    updateSprites(event: UpdateEvent): void {
        this.sprites.forEach(sprite => sprite.update(event));
    };

    render(event: RenderEvent): void {
        this.renderSprites(event);
    };

    update(event: UpdateEvent): void {
        this.updateSprites(event);
    };

}
