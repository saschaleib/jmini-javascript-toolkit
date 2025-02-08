/* page console */
/* enables an in-page console as an alternative to the browser console
/* Authors:
    - Sascha Leib <ad@hominem.info>
 */
/* This project is licensed under the terms of the MIT license. */
$p.data = {

	/* shadow init function */
	_init: function(p) {
		//console.info('$p.data._init()');
		//console.log('this=', this);
		//console.log('parent=', p);
		
		/* call sub-sections' pre-inits, if any are added: */
		$p._callInit(this, true);
	},

	/* load Json data: */
	loadJson: async function(url, cb) {
		
		try {
			
			// try to establich the connection:
			const rp = await fetch(url);
			if (!rp.ok) {
				$p.data._error(`HTTP #${rp.status}: ${rp.statusText}`, url);
				return;
			}
			
			// fetch the actual json data:
			const json = await rp.json();

			let cb2 = cb.bind(this);
			cb2(json);
		} catch(err) {
			console.error(err);
		}

	},
	
	/* internal function to report an error to the caller: */
	_error: function(msg, url) {
		if (typeof $p.data.error == 'function') {
			$p.data.error(msg, url);
		} else if ($p.console) {
			$p.console.error(msg);
		} else {
			console.error(msg);
		}
	},
		
	/* data storage object: */
	_data: {},

	/* store data for later retrieval: */
	store: function(json, name) {
		$p.data._data[name] = json;
	}
}