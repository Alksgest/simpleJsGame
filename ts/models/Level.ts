import { Coin } from "./Coin";
import { Lava } from "./Lava";
import { Vector } from "./Vector";
import { Player } from "./Player";
import { Actor } from "./Actor";


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

    public height: number;
    public width: number;
    public startActors: Actor[];
    public rows: string[][];

    constructor(plan: string) {
        let rows = plan.split('\n').map(l => [...l.trim()]);
        this.height = rows.length;
        this.width = rows[0].length;
        this.startActors = [];

        this.rows = rows.map((row, y) => {
            return row.map((ch, x) => {
                let type = levelChars[ch];
                if (typeof type === 'string') {
                    return type;
                }
                this.startActors.push(type.create(new Vector(x, y), ch));
                return 'empty';
            });
        })
    }
}
