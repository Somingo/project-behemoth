export interface Point {
    x: number;
    y: number;
}

export interface Dimension {
    w: number;
    h: number;
}

export interface Rectangle extends Point, Dimension {

}
