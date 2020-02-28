import { Level } from "./Level";
import { Actor } from "./Actor";

export class State {
    constructor(public level: Level, public actors: Actor[], public status) { }

    static start(level: Level) {
        return new State(level, level.startActors, 'playing');
    }

    get player() {
        return this.actors.find(a => a.type === 'player');
    }
}
