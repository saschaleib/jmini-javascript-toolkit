/* Page URL frameword core */
/* Authors:
    - Sascha Leib <ad@hominem.info>
 */
/* This project is licensed under the terms of the MIT license. */
$p.url.fragment = {

	/* shadow init function */
	_init: function() {
		console.info('$p.url.fragment._init()');
		
		/* catch any later changes to the fragment: */
		window.addEventListener('hashchange', $p.url.fragment._onHashChange);

	},
	
	/* get the current hash (if any) */
	get: function() {
		return location.hash.substr(1);
	},
	
	/* set the location hash: */
	set: function(h) {
		location.hash = h;
	},
	
	/* add a callback for hash changes */
	onChange: function(cb) {
		$p.url.fragment._cbs.push(cb);
	},
	
	/* store callbacks here: */
	_cbs: [],
	
	/* callback function for hash changes: */
	_onHashChange: function(e) {
		console.log("$p.url.fragment._onHashChange()");
		$p.url.fragment._cbs.forEach( cb => {
			cb(e);
		});
	}
}