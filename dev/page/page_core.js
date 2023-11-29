/* Page frameword core */
/* Authors:
    - Sascha Leib <ad@hominem.info>
 */
/* This project is licensed under the terms of the MIT license. */
let $p = {

	/* shadow init function */
	_init: function() {
		//console.info('$p._init()');
		
		/* call sub-sections, as they were added: */
		$p._callPreInit($p);

		/* call user init, if it exists: */
		if ($p.init) $p.init();
	}, 
	
	_callPreInit: function(obj) {
		//console.info('$p._callPreInit()');
		
		/* call _init on each sub-object: */
		Object.keys(obj).forEach( (key,i) => {
			let sub = obj[key];
			if (typeof sub === 'object' && sub._init) {
				sub._init();
			}
		});

	}
}
/* load when DOM is ready: */
document.onReady($p._init);