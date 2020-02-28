import { Vector } from "./Vector";
import { Actor } from "./Actor";
export class Player extends Actor {
    constructor(pos, speed) {
        super('player', new Vector(0.8, 1.5), pos);
        this.speed = speed;
    }
    static create(pos) {
        return new Player(pos.plus(new Vector(0, -0.5)), new Vector(0, 0));
    }
}
