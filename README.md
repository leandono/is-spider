# is-spider
Using differents rules, try to know if a user agent string comes from a spider.

**Note**: Internally, this module use [https://github.com/3rd-Eden/useragent](https://github.com/3rd-Eden/useragent)

# Install

```bash
npm install is-spider --save
```

# Usage

```js
var isSpider = require('is-spider');

isSpider('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', function(err, is){

	if (err) throw (err);
	
	if(is){
		console.log('Probably is a spider');
	} else {
		console.log('Probably no');
	}

});
```

## Configuration

```js
//Default use
isSpider(ua, callback);

//With configuration
isSpider(ua, configuration, callback);
```

### Options

- **uaBlackList**: A list of user agent strings to use as blacklist. Default: `['adbeat', 'bingbot']`.
- **deviceBlackList**: A list of [device definitions](https://github.com/3rd-Eden/useragent#devicetostring) to use as blacklist. Default: `['Spider']`.
- **isBrowser**: Check if the user string [comes from a web browser](https://github.com/3rd-Eden/useragent#useragentisuseragent-stringbrowsername). Default: `true`
- **customRules**: A list of custom rules to validate the user agent. Default: `[]`

### Example

```js

var ua = 'Mozilla/5.0 (Unknown; Linux x86_64) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.9.8 Safari/534.34';

var config = {
		uaBlackList: [
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:38.0) Gecko/20100101 Firefox/40.0',
			'PhantomJS'
		],
		deviceBlackList: [
			'Spider'
		],
		isBrowser: false,
		customRules: [
			function(ua, done) {
				done(ua.indexOf('Googlebot/2.1') > -1);
			}
		]
	};
	
isSpider(ua, config, function(err, is){
	
	if (err) throw (err);
	
	console.log(is); //-->True, for use "PhantomJS" in the uaBlackList
	
});	
	
```

More examples in `test.js`.

# Test

```bash
npm test
```


# License

MIT

