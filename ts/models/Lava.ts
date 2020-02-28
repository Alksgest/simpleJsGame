import { Vector } from "./Vector";
import { Actor } from "./Actor";

export class Lava extends Actor {
    constructor(pos: Vector, public speed: Vector, public reset?) {
        super('lava', new Vector(1, 1), pos);
    }

    static create(pos: Vector, ch: any) {
        const holder = {
            '=': () => new Lava(pos, new Vector(2, 0)),
            '|': () => new Lava(pos, new Vector(0, 2)),
            'v': () => new Lava(pos, new Vector(0, 3), pos)
        };
        return holder[ch];
    }
}
