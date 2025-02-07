/* Page frameword core */
/* Authors:
    - Sascha Leib <ad@hominem.info>
 */
/* This project is licensed under the terms of the MIT license. */
let $p = {

	/* shadow init function */
	_init: function() {
		console.info('$p._init()');
		
		/* call sub-sections' pre-inits: */
		$p._callInit($p, true);
		
		/* Now call the actual inits: */
		$p._callInit($p);
		if ($p.init) $p.init($p);
	}, 
	
	/* initialize sub-items of an object: */
	_callInit: function(obj, pre = false) {
		//console.info('$p._callInit(obj=',obj,', pre=',pre,')');

		/* call init / _init on each sub-object: */
		Object.keys(obj).forEach( (key,i) => {
			const sub = obj[key];
			let init = null;
			if (typeof sub === 'object') {
				if (pre && sub._init) {
					init = sub._init;
				} else if (!pre && sub.init) {
					init = sub.init;
				}

				// bind to object
				if (typeof init == 'function') {
					const init2 = init.bind(sub);
					init2(obj);
				}
			}
		});

	}
}
/* call pre-init when the file is loaded */
document.addEventListener('DOMContentLoaded', $p._init);