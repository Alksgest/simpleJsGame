const { Coin, Lava, Player, Vec } = require('./models.export');
const s = require('./models.export');

// const { Coin } = require("./Coin");
// const { Lava } = require("./Lava");
// const { Player } = require("./Player");
// const { Vec } = require("./Vec");

console.log(Coin);

const levelChars = {
    '.': 'empty',
    '#': 'wall',
    '+': 'lava',
    '@': Player,
    'o': Coin,
    '=': Lava,
    '|': Lava,
    'v': Lava
}

class Level {
    constructor(plan) {
        let rows = plan.split('\n').map(l => [...l.trim()]);
        this.height = rows.length;
        this.width = rows[0].length;
        this.startActors = [];

        this.rows = rows.map((row, y) => {
            return row.map((ch, x) => {
                let type = levelChars[ch];
                if (typeof type === 'string') return type;
                this.startActors.push(type.create(new Vec(x, y), ch));
                return 'empty';
            });
        })
    }
}

exports.Level = Level;