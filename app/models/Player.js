import { Vector } from './models.export.js.js';

export class Player {
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
    }

    get type() { return 'player'; }

    static create(pos) {
        return new Player(pos.plus(new Vector(0, -0.5), new Vector(0, 0)));
    }
}

Player.prototype.size = new Vector(0.8, 1.5);
