/* Page GUI frameword core */
/* Authors:
    - Sascha Leib <ad@hominem.info>
 */
/* This project is licensed under the terms of the MIT license. */
$p.gui = {

	/* shadow init function */
	_init: function() {
		console.info('$p.gui._init()');
		
		/* call sub-sections, as they were added: */
		Object.keys($p.gui).forEach( (key) => {
			let sub = $p.gui[key];
			if (typeof sub === 'object' && sub._init) {
				sub._init();
			}
		});
	}
}