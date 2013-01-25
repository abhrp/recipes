
files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  'indexScenario.js',
  'loginScenario.js',
  'favouritesScenario.js',
  'createScenario.js',
  'viewScenario.js',
  'editScenario.js'
];

// list of files to exclude
exclude = [
  'test/e2e/testacular.e2e.conf.js'
];

urlRoot = '/__testacular/';

autoWatch = true;

browsers = ['Chrome'];

singleRun = true;

proxies = {
  '/': 'http://localhost:3501/'
};
