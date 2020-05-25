import {Container} from "./Container";
import {RenderEvent} from "./RenderEvent";
import {Rectangle} from "./Rectangle";

export class Layer extends Container implements Rectangle {

    constructor(public x: number,
                public y: number,
                public w: number,
                public h: number) {
        super();
    }

    render = (event: RenderEvent) => {
        this.renderSprites(event);
    };


}
