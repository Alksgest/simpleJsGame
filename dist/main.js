const plans = {
    simpleLevelPlan: 
    `........................
    ..#.................#...
    ..#.........o.o.....#..
    ..#........#####....#..
    ..#.@...............#..
    ..#####.............#..
    ......#+++++++++++++#..
    ......###############..
    .......................`
}


class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    times(factor) {
        return new Vector(this.x * factor, this.y * factor);
    }

}

class Coin {
    constructor(pos, basePos, wobble) {
        this.pos = pos;
        this.basePos = basePos;
        this.wobble = wobble;
    }

    get type() { return 'coin'; }

    static create(pos) {
        let basePos = pos.plus(new Vector(0.2, 0.1));
        return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
    }

}

    Coin.prototype.size = new Vector(0.6, 0.6);

class Lava {
    constructor(pos, speed, reset) {
        this.pos = pos;
        this.speed = speed;
        this.reset = reset;
    }

    get type() { return 'lava'; }

    static create(pos, ch) {
        const holder = {
            '=': () => new Lava(pos, new Vector(2, 0)),
            '|': () => new Lava(pos, new Vector(0, 2)),
            'v': () => new Lava(pos, new Vector(0, 3), pos)
        };
        return holder[ch];
    }
}

    Lava.prototype.size = new Vector(1, 1);

class Player {
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
        console.log(rows);
        this.height = rows.length;
        this.width = rows[0].length;
        this.startActors = [];

        this.rows = rows.map((row, y) => {
            return row.map((ch, x) => {
                let type = levelChars[ch];
                if (typeof type === 'string') return type;
                this.startActors.push(type.create(new Vector(x, y), ch));
                return 'empty';
            });
        })
    }
}

class State {
    constructor(level, actors, status) {
        this.level = level;
        this.actors = actors;
        this.status = status;
    }
    static start(level) {
        return new State(level, level.startActors, 'playing');
    }
    get player() {
        return this.actors.find(a => a.type === 'player');
    }
}

class DOMDisplay {
    constructor(parent, level) {
        this.element = createDOMElement('div', { class: 'game' }, drawGrid(level));
        this.actorLayer = undefined;
        parent.appendChild(this.element);
    }

    clear() {
        this.element.remove();
    }
}

function createDOMElement(name, attrs, ...children) {
    let element = document.createElement(name);
    for (const attr of Object.keys(attrs)) {
        element.setAttribute(attr, attrs[attr]);
    }
    for (let child of children) {
        element.append(child);
    }
    return element;
}

const scale = 20;

function drawGrid(level) {
    return createDOMElement('table', {
        class: 'background',
        style: `width: ${level.width * scale}px`
    }, ...level.rows.map(row => createDOMElement('tr', { style: `height: ${scale}px` },
        ...row.map(type => createDOMElement('td', { class: type })))));
}

function drowActors(actors) {
    return createDOMElement('div', {}, ...actors.map(actor => {
        let rect = createDOMElement('div', { class: `actor ${actor.type}` });
        rect.style.width = `${actor.size.x * scale}`;
        rect.style.height = `${actor.size.y * scale}`;
        rect.style.left = `${actor.pos.x * scale}`;
        rect.style.top = `${actor.pos.y * scale}`;
        return rect;
    }));
}

DOMDisplay.prototype.syncState = function (state) {
    if (this.actorLayer) this.actorLayer.remove();
    this.actorLayer = drowActors(state.actors);
    this.element.appendChild(this.actorLayer);
    this.element.className = `game ${state.status}`;
    this.scrollPlayerIntoView(state);
}

DOMDisplay.prototype.scrollPlayerIntoView = function (state) {
    let width = this.element.clientWidth;
    let height = this.element.clientHeight;
    let margin = width / 3;

    let left = this.element.scrollLeft;
    let right = left + width;

    let top = this.element.scrollTop;
    let bottom = top + height;

    let player = state.player;
    let center = player.pos.plus(player.size.times(0.5)).times(scale);

    if (center.x < left + margin) {
        this.element.scrollLeft = center.x - margin;
    } else if (center.x > right - margin) {
        this.element.scrollLeft = center.x + margin - width;
    }

    if (center.y < top + margin) {
        this.element.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
        this.element.scrollTop = center.y + margin - height;
    }
}


const level = new Level(plans.simpleLevelPlan);
const display = new DOMDisplay(document.body, level);
display.syncState(State.start(level));