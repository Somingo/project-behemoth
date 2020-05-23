import {UpdateEvent} from "./UpdateEvent";
import {RenderEvent} from "./RenderEvent";

export interface Sprite {
    update(event: UpdateEvent): void;

    render(event: RenderEvent): void;
}
