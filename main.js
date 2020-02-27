const plans = require('./levels-plans').plans;
const Level = require('./Level').Level;

const level = new Level(plans.simpleLevelPlan);

console.log(JSON.stringify(level));