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
        browserName: 'chrome',
        'goog:chromeOptions': {
        // to run chrome headless the following flags are required
        // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
            args: [
                    'headless', 
                    'version', 'start-maximized', 'incognito' , 'disable-gpu', 
                    'disable-extensions', 'disable-popup-blocking', 'disable-infobars'
                ],
        }
        //
        // Parameter to ignore some or all default flags
        // - if value is true: ignore all DevTools 'default flags' and Puppeteer 'default arguments'
        // - if value is an array: DevTools filters given default arguments
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    },
];


config.services = [
        'rerun',
        'chromedriver',
        ['ms-teams', {
            webhookURL: "https://magenic365.webhook.office.com/webhookb2/3ca2f0b2-1a0e-412b-a1c4-95ae1de2bbf3@0938e32f-3ac8-42db-8afc-037070df5145/IncomingWebhook/0d718eb7e8774492a14dd015f1791d02/169c2c80-2d2f-4bb7-866b-062825d990ec",
            failingTestsOnly: true,
        }]
];

exports.config = config;