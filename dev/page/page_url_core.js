/* Page URL frameword core */
/* Authors:
    - Sascha Leib <ad@hominem.info>
 */
/* This project is licensed under the terms of the MIT license. */
$p.url = {

	/* shadow init function */
	_init: function(p) {
		console.info('$p.url._init()');
		//console.log('parent=',p);
		
		/* call sub-sections' pre-inits: */
		$p._callInit(this, true);
		
		/* Now call the actual init: */
		p._callInit(this);
		if (this.init) this.init(this);
	}
}