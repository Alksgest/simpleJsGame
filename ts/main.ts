import { DOMDisplay } from './drowing/drowing';
import { Level, State } from './models/models.export';
import { plans } from './plan/levels-plans';

const level = new Level(plans.simpleLevelPlan);
const display = new DOMDisplay(document.body, level);
display['syncState'](State.start(level));


