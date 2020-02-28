import { Level } from '../models/Level';
import { Actor } from '../models/Actor';
import { State } from '../models/State';

export class DOMDisplay {

    public element: HTMLElement;
    public actorLayer: HTMLElement;

    constructor(parent: HTMLElement, level: Level) {
        this.element = createDOMElement('div', { class: 'game' }, drawGrid(level));
        parent.appendChild(this.element);
    }

    clear() {
        this.element.remove();
    }
}

function createDOMElement(name: string, attrs, ...children: HTMLElement[]): HTMLElement {
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

function drawGrid(level: Level): HTMLElement {
    return createDOMElement('table', {
        class: 'background',
        style: `width: ${level.width * scale}px`
    }, ...level.rows.map(row => createDOMElement('tr', { style: `height: ${scale}px` },
        ...row.map(type => createDOMElement('td', { class: type })))));
}

function drowActors(actors: Actor[]): HTMLElement {
    return createDOMElement('div', {}, ...actors.map(actor => {
        let rect = createDOMElement('div', { class: `actor ${actor.type}` });
        rect.style.width = `${actor.size.x * scale}`;
        rect.style.height = `${actor.size.y * scale}`;
        rect.style.left = `${actor.pos.x * scale}`;
        rect.style.top = `${actor.pos.y * scale}`;
        return rect;
    }));
}

DOMDisplay.prototype['syncState'] = function (state: State): void {
    if (this.actorLayer) this.actorLayer.remove();
    this.actorLayer = drowActors(state.actors);
    this.element.appendChild(this.actorLayer);
    this.element.className = `game ${state.status}`;
    this.scrollPlayerIntoView(state);
}

DOMDisplay.prototype['scrollPlayerIntoView'] = function (state: State): void {
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