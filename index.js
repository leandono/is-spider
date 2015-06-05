'use strict';

/**
 * Global modules
 */
var useragent = require('useragent');
var async = require('async');
var _ = require('lodash');

/**
 * Default configuration
 */
var _defaultConfig = {
	uaBlackList: [
		'AdsBot',
		'adbeat',
		'bingbot'
	],
	deviceBlackList: [
		'Spider'
	],
	customRules: [],
	isBrowser: true
};

/**
 * Try to know if the user agent string come from a bot using differents rules
 * @param {string} ua The user-agent string
 * @param {object} customConfig Custom configuration
 * @param {function} callback Callback function
 */
function detect(ua, customConfig, callback) {

	var cb;
	var config;

	//Params overload
	if (_.isFunction(customConfig)) {

		config = _defaultConfig;
		cb = customConfig;

	} else {

		config = _.assign(_defaultConfig, customConfig);
		cb = callback;

	}

	//Run the steps in serie
	async.series([

		//Zero rule: Check is the UA is empty
		//Some false requests come without user-agent
		function(next) {

			//Continue if exists
			if (ua) {

				next();

			} else {

				next(true);

			}

		},

		//First rule: Check the UA in the uaBlackList
		function(next) {

			var blacklist = config.uaBlackList;

			//Check config
			if (blacklist.length) {

				//Check if exists in the blacklist
				if (ua.match(blacklist.join('|'))) {

					next(true);

				} else {

					next();

				}

			} else {

				next();

			}

		},

		//Second rule: Check device blacklist
		function(next) {

			var blacklist = config.deviceBlackList;

			//Check config
			if (blacklist.length) {

				var device = useragent.parse(ua).device.toString();

				//Check if exists in the blacklist
				if (blacklist.indexOf(device) > -1) {

					next(true);

				} else {

					next();

				}

			} else {

				next();

			}

		},

		//Third rule: Check custom rules
		function(next) {

			var rules = config.customRules;

			//Check config
			if (rules.length) {

				//Process each rule
				async.each(rules, function(rule, done) {

					if (_.isFunction(rule)) {

						rule(done);

					} else {

						done();

					}

				}, function(is) {

					next(is);

				});

			} else {

				next();

			}

		},

		//Four rule: Check if is a browser
		function(next) {

			//Check config
			if (config.isBrowser === true) {

				//Check if is a valid browser
				var browsers = useragent.is(ua);

				//Detele the prop version
				delete browsers.version;

				//Remove null results
				var results = _.pick(browsers, _.identity);

				//Continue
				next(_.isEmpty(results));

			} else {

				next();

			}

		}

	], function(exit) {

		cb(exit ? true : false);

	});

}

/**
 * Public methods exported
 */
module.exports = detect;
