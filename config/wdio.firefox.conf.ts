import { config } from './wdio.shared.conf';

// ============
// Specs
// ============
config.specs = [
    './test/specs/exercise.spec.ts',
];

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
    {
        // maxInstances can get overwritten per capability. So if you have an in house Selenium
        // grid with only 5 firefox instance available you can make sure that not more than
        // 5 instance gets started at a time.
        maxInstances: 5,
        browserName: 'firefox',
        'moz:firefoxOptions': {
          // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
          args: ['-headless']
        },
        // If outputDir is provided WebdriverIO can capture driver session logs
        // it is possible to configure which logTypes to exclude.
        // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Parameter to ignore some or all Puppeteer default arguments
        // ignoreDefaultArgs: ['-foreground'], // set value to true to ignore all default arguments
    },
];


config.services = [
        // 'rerun',
        // 'chromedriver',
        ['selenium-standalone', { drivers: { firefox: true, chrome: 'latest', chromiumedge: 'latest' } }],
        ['ms-teams', {
            webhookURL: "https://magenic365.webhook.office.com/webhookb2/3ca2f0b2-1a0e-412b-a1c4-95ae1de2bbf3@0938e32f-3ac8-42db-8afc-037070df5145/IncomingWebhook/0d718eb7e8774492a14dd015f1791d02/169c2c80-2d2f-4bb7-866b-062825d990ec",
            failingTestsOnly: true,
        }]
];

exports.config = config;