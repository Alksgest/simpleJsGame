const { Vec } = require("./Vec");
class Lava {
    constructor(pos, speed, reset) {
        this.pos = pos;
        this.speed = speed;
        this.reset = reset;
    }
    get type() { return 'lava'; }
    static create(pos, ch) {
        const holder = {
            '=': () => new Lava(pos, new Vec(2, 0)),
            '|': () => new Lava(pos, new Vec(0, 2)),
            'v': () => new Lava(pos, new Vec(0, 3), pos)
        };
        return holder[ch];
    }
}

Lava.prototype.size = new Vec(1, 1);

exports.Lava = Lava;
