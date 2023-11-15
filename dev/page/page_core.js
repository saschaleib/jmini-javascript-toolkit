/* Page frameword core */
/* Authors:
    - Sascha Leib <ad@hominem.info>
 */
/* This project is licensed under the terms of the MIT license. */
let $p = {

	/* shadow init function */
	_init: function() {
		console.info('$p._init()');
		
		/* call sub-sections, as they were added: */
		Object.keys($p).forEach( (key,index) => {
			let sub = $p[key];
			if (typeof sub === 'object' && sub._init) {
				sub._init();
			}
		});
		
		/* call user init, if it exists: */
		if ($p.init) $p.init();
	}
}
document.addEventListener("DOMContentLoaded", (e) => {
	$p._init(e);
});