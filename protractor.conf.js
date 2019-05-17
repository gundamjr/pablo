const { SpecReporter } = require('jasmine-spec-reporter');
const del = require('delete');
const AllureReporter = require('jasmine-allure-reporter');
const path = require('path');
const downloadsPath = path.resolve(__dirname, './downloads');
const fs = require('fs');

exports.config = {
  allScriptsTimeout: 90000,
  getPageTimeout: 12000,
  directConnect: true,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseurl: 'https://swgoh.gg/',
  suites:{
    login:[
      //  './e2e/swgoh/login/*.e2e-spec.ts',
    ],
    cadastro:[
      './e2e/swgoh/cadastro/*.e2e-spec.ts',
   ],
  },
  capabilities: {
    platform: 'LINUX',
    browserName: 'chrome',
    shardTestFiles:	true,
    maxInstances:	5,
    count: 1,
    'goog:chromeOptions': {
      args: [
        '--safebrowsing-disable-download-protection',
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
        '--no-sandbox',
        '--disable-gpu',
        '--start-maximized',
        '--allow-insecure-localhost',
        '--test-type=browser',
        // '--window-size=375,667'
        '--window-size=1920,1800'
      ],
      prefs: {
        'safebrowsing': {
          'enabled': true
        },
        'download': {
          'directory_upgrade': true,
          'prompt_for_download': false
        },
      },
    },
  },
  logLevel: 'INFO',
  framework: 'jasmine',
  jasmineNodeOpts: {

    isVerbose: true,
    showColors: true,
    showTiming: true,
    random: false,
    defaultTimeoutInterval: 600000,
    print: function() {}
  },
  beforeLaunch: function() {
    del(['allure-report', 'allure-results', downloadsPath]);
  },
  onPrepare:() =>{
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({
      suite: {
        displayNumber: true
      },
      spec: {
        displayStacktrace: true,
        displayErrorMessages: true,
        displayFailed: true,
        displayDuration: true
      },
      summary: {
        displayErrorMessages: true,
        displayStacktrace: false,
        displaySuccessful: true,
        displayFailed: true,
        displayDuration: true
      },
      colors: {
        enabled: true,
        successful: 'blue',
        failed: 'red',
        pending: 'yellow'
      },
      prefixes: {
        successful: '✓ ',
        failed: '✗ ',
        pending: '* '
      },
    }));

    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results'
    }));

    // jasmine.getEnv().afterEach(function(done){
    //   browser.takeScreenshot().then(function (png) {
    //     allure.createAttachment('Screenshot', function () {
    //       done();
    //       return new Buffer(png, 'base64')}, 'image/png')();
    //   })
    // });


  },
};

