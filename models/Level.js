import { Coin, Lava, Player, Vec } from './models.export.js';

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

export class Level {
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
