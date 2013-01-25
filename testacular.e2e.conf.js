

files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  'test/vendor/*.js'
];

// list of files to exclude
exclude = [
  'test/e2e/testacular.e2e.conf.js'
];

autoWatch = true;

browsers = ['Chrome'];

singleRun = true;

proxies = {
  '/': 'http://localhost:3501/'
};
