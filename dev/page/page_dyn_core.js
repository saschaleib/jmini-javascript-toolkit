/* Page Dyn frameword core */
/* Authors:
    - Sascha Leib <ad@hominem.info>
 */
/* This project is licensed under the terms of the MIT license. */
$p.dyn = {

	/* shadow init function */
	_init: function(p) {
		//console.info('$p.dyn._init()');
		//console.log('parent=',p);
		
		/* call sub-sections' pre-inits: */
		$p._callInit(this, true);
	},
	
	/* the actual initialisation method: */
	init: function(p) {
		$p.console.info('$p.dyn.init()');
		//$p.console.log('parent=',p);

		// first make sure all sub-modules are initialized:
		$p._callInit(this);

		// then parse the entire document for JSON script tags:
		this.parse(document);

	},
	
	/* find all the JSON script elements within a given scope: */
	parse: function(scope) {
		
		/* fins all script tags in the scope */
		const scripts = scope.getElementsByTagName('script');
		
		/* filter them down to only the ones marked as JSON type */
		const js = Array.prototype.filter.call(scripts, s => {
			return ( s.hasAttribute('type') && s.getAttribute('type') == 'application/json' );
		});

		/* loop over all remaining elements to make sure they have an "action" property: */
		for (var i = 0; i < js.length; i++) {
			try {
				const it = js[i];
				const json = JSON.parse(it.innerHTML);
				if (json.action) {
					
					// check if we have an action registered:
					const cb = $p.dyn.action.get(json.action);
					if (cb) {
						cb(it.parentElement, json);
					} else {
						if ($p.console) $p.console.warn('Unknown action: ' + json.action);
						console.warn('Unknown action: ' + json.action);
					}
				}
			} catch (err) {
				if ($p.console) $p.console.error(err.toString());
				console.error(err);
			}
		}
	}, 
	
	/* internal sub-module for actions: */
	action: {
		
		_store: [],
		
		/* register an action callback for a specific id: */
		register: function(id, callback) {
			//console.info('$p.dyn.action.register("' + id + '")');
			
			$p.dyn.action._store.push({
				'id': id,
				'cb': callback
			});
		},
		
		/* return the callback function registered for a specific name: */
		get: function(id) {
			//console.info('$p.dyn.action.get("' + id + '")');

			const pos = $p.dyn.action._store.findIndex( it => it.id == id);
			
			return ( pos >= 0 ? $p.dyn.action._store[pos].cb : null);

		}
	}
}