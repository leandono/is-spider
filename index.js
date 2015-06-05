'use strict';

/**
 * Global modules
 */
var useragent = require('useragent');
var async = require('async');
var _ = require('lodash');

/**
 * Using differents rules, try to know if a user agent string come from a spider
 * @param {string} ua The user-agent string
 * @param {object} customConfig Custom configuration
 * @param {function} callback Callback function
 */
function detect(ua, customConfig, callback) {

	var cb;
	var config;
	var defaultConfig = {

		//Some UA that 'useragent' can't detect as spider
		uaBlackList: [
			'adbeat',
			'bingbot'
		],

		//Default device detected as spider by 'useragent'
		deviceBlackList: [
			'Spider'
		],

		//Check if the UA comes from a personal browser
		isBrowser: true,

		//Custom validation rules
		customRules: []

	};

	//Params overload
	if (_.isFunction(customConfig)) {

		config = defaultConfig;
		cb = customConfig;

	} else {

		config = _.assign(defaultConfig, customConfig);
		cb = callback;

	}

	//Check if the UA exists
	if (!ua) {

		cb(new Error('The user-agent is null or empty'));

	} else {

		async.parallel([
			async.apply(_uaBlackList, ua, config),
			async.apply(_deviceBlackList, ua, config),
			async.apply(_isBrowser, ua, config),
			async.apply(_customRules, ua, config)
		], function(exit) {

			if (_.isError(exit)) {

				cb(exit, true);

			} else {

				cb(null, exit ? true : false);

			}

		});

	}

}

/**
 * Execute custom rules of validation
 * @param  {string} ua User Agent
 * @param  {object} config Configuration
 * @param  {Function} next Async callback
 */
function _customRules(ua, config, next) {

	var rules = config.customRules;

	//Check config
	if (_.isEmpty(rules) === false) {

		//Process each rule
		async.each(rules, function(rule, done) {

			if (_.isFunction(rule)) {

				rule(ua, done);

			} else {

				done();

			}

		}, function(is) {

			next(is);

		});

	} else {

		next();

	}

}

/**
 * Check if the UA exists in the uaBlackList
 * @param  {string} ua User Agent
 * @param  {object} config Configuration
 * @param  {Function} next Async callback
 */
function _uaBlackList(ua, config, next) {

	var blacklist = config.uaBlackList;

	//Check config
	if (_.isEmpty(blacklist) === false) {

		//Escape string for regex
		blacklist = _regexerize(blacklist);

		//Check if exists in the blacklist
		next(ua.match(blacklist.join('|')));

	} else {

		next();

	}

}

/**
 * Check if the UA belongs to a spider device
 * @param  {string} ua User Agent
 * @param  {object} config Configuration
 * @param  {Function} next Async callback
 */
function _deviceBlackList(ua, config, next) {

	var blacklist = config.deviceBlackList;

	//Check config
	if (_.isEmpty(blacklist) === false) {

		var device = useragent.parse(ua).device.toString();

		//Escape string for regex
		blacklist = _regexerize(blacklist);

		//Check if exists in the blacklist
		next(device.match(blacklist.join('|')));

	} else {

		next();

	}

}

/**
 * Check if the UA belongs to a web browser
 * @param  {string} ua User Agent
 * @param  {object} config Configuration
 * @param  {Function} next Async callback
 */
function _isBrowser(ua, config, next) {

	//Check config
	if (config.isBrowser === true) {

		//Check if is a valid browser
		var browsers = useragent.is(ua);

		//Detele the prop version
		delete browsers.version;

		//Remove null results
		var is = _.isEmpty(_.pick(browsers, _.identity));

		next(is ? true : null);

	} else {

		next();

	}

}

/**
 * Escape a list of strings to use in a regex definition
 * @see http://stackoverflow.com/a/3561711
 * @param  {array} list List of strings to change
 * @return  {array} The list changed
 */
function _regexerize(list) {

	return _.map(list, function(str) {
		return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	});

}

/**
 * Public methods exported
 */
module.exports = detect;
