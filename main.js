import { plans } from './plan/levels-plans.js';
import { Level } from './models/models.export.js';

const level = new Level(plans.simpleLevelPlan);

console.log(JSON.stringify(level));