import { Vector } from "./Vector";
import { Actor } from "./Actor";

export class Player extends Actor {
    constructor(pos: Vector, public speed: Vector) {
        super('player', new Vector(0.8, 1.5), pos)
    }

    get type() { return 'player'; }

    static create(pos: Vector) {
        return new Player(pos.plus(new Vector(0, -0.5)), new Vector(0, 0));
    }
}
