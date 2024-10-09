exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2e/**/*.e2e-spec.ts'],
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  onPrepare: () => {
    require('ts-node').register({
      project: 'tsconfig.e2e.json'
    });
  }
};