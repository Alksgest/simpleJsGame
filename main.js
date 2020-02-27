const { plans } = require('./plan/levels-plans');
const { Level } = require('./models/models.export');

const level = new Level(plans.simpleLevelPlan);

console.log(JSON.stringify(level));