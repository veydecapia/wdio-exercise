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
            args: [ 'headless', 'version', 'start-maximized', 'incognito' , 'disable-gpu', 
                    'disable-extensions', 'disable-popup-blocking', 'disable-infobars'],
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

exports.config = config;