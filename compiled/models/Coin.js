import { Vector } from './Vector';
import { Actor } from './Actor';
export class Coin extends Actor {
    constructor(pos, basePos, wobble) {
        super('coin', new Vector(0.6, 0.6), pos);
        this.basePos = basePos;
        this.wobble = wobble;
    }
    static create(pos) {
        let basePos = pos.plus(new Vector(0.2, 0.1));
        return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
    }
}
