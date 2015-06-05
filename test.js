/* eslint handle-callback-err: 0 */

'use strict';

/**
 * Global modules
 */
var assert = require('assert');
var _ = require('lodash');
var isSpider = require('./index');

/**
 * Private variables
 */
var uaList = {
	'googlebot': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
	'adsbot': 'AdsBot-Google (+http://www.google.com/adsbot.html)',
	'bingbot': 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
	'adbeat': 'Mozilla/5.0 (X11; U; Linux x86; en-US) adbeat.com/policy Gecko/20100423 Ubuntu/10.04 (lucid) Firefox/3.6.3 AppleWebKit/532.4 Safari/532.4',
	'firefox': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:38.0) Gecko/20100101 Firefox/38.0',
	'android': 'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
	'phantomjs': 'Mozilla/5.0 (Unknown; Linux x86_64) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.9.8 Safari/534.34',
	'unknown': 'MozPhoneKit/13.9',
	'empty': ''
};

/**
 * Init the test
 */
function init() {

	var config = {};

	//Basic
	isSpider(uaList.googlebot, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, true);
	});
	isSpider(uaList.adsbot, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, true);
	});
	isSpider(uaList.bingbot, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, true);
	});
	isSpider(uaList.adbeat, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, true);
	});
	isSpider(uaList.firefox, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, false);
	});
	isSpider(uaList.android, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, false);
	});
	isSpider(uaList.phantomjs, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, false);
	});
	isSpider(uaList.unknown, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, true);
	});
	isSpider(uaList.empty, function(err, is) {
		assert.equal(_.isError(err), true);
		assert.equal(is, null);
	});

	//Empty configuration
	isSpider(uaList.googlebot, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, true);
	});
	isSpider(uaList.unknown, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, true);
	});
	isSpider(uaList.adsbot, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, true);
	});
	isSpider(uaList.bingbot, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, true);
	});
	isSpider(uaList.adbeat, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, true);
	});
	isSpider(uaList.firefox, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, false);
	});
	isSpider(uaList.android, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, false);
	});
	isSpider(uaList.phantomjs, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, false);
	});
	isSpider(uaList.empty, config, function(err, is) {
		assert.equal(_.isError(err), true);
		assert.equal(is, null);
	});

	//Disable all rules
	config = {
		uaBlackList: false,
		deviceBlackList: false,
		isBrowser: false,
		customRules: false
	};

	isSpider(uaList.googlebot, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, false);
	});
	isSpider(uaList.unknown, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, false);
	});
	isSpider(uaList.adsbot, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, false);
	});
	isSpider(uaList.bingbot, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, false);
	});
	isSpider(uaList.adbeat, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, false);
	});
	isSpider(uaList.firefox, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, false);
	});
	isSpider(uaList.android, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, false);
	});
	isSpider(uaList.phantomjs, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, false);
	});
	isSpider(uaList.empty, config, function(err, is) {
		assert.equal(_.isError(err), true);
		assert.equal(is, null);
	});

	//Only UA black list
	config = {
		uaBlackList: [
			'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:38.0) Gecko/20100101 Firefox/38.0',
			'PhantomJS'
		],
		deviceBlackList: false,
		isBrowser: false,
		customRules: false
	};
	isSpider(uaList.googlebot, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, true);
	});
	isSpider(uaList.firefox, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, true);
	});
	isSpider(uaList.phantomjs, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, true);
	});

	//Only Device black list
	config = {
		uaBlackList: false,
		deviceBlackList: [
			'Other',
			'Spider'
		],
		isBrowser: false,
		customRules: false
	};
	isSpider(uaList.googlebot, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, true);
	});
	isSpider(uaList.firefox, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, true);
	});

	//Only Is Browser
	config = {
		uaBlackList: false,
		deviceBlackList: false,
		isBrowser: true,
		customRules: false
	};
	isSpider(uaList.googlebot, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, true);
	});
	isSpider(uaList.firefox, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, false);
	});
	isSpider(uaList.phantomjs, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, false);
	});

	//Only Custom rules
	config = {
		uaBlackList: false,
		deviceBlackList: false,
		isBrowser: false,
		customRules: [
			function(ua, done) {
				done(ua.indexOf('Firefox/38.0') > -1);
			},
			function(ua, done) {
				done(ua.indexOf('Googlebot/2.1') > -1);
			},
			function(ua, done) {
				done(ua.indexOf('MozPhoneKit/13.9') > -1);
			}
		]
	};
	isSpider(uaList.googlebot, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, true);
	});
	isSpider(uaList.firefox, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, true);
	});
	isSpider(uaList.unknown, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, true);
	});

	//Empty arrays
	config = {
		uaBlackList: [],
		deviceBlackList: [],
		customRules: []
	};
	isSpider(uaList.googlebot, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, true);
	});
	isSpider(uaList.firefox, config, function(err, is) {
		assert.equal(err, null);
		assert.equal(is, false);
	});

}

init();
