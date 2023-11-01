'use strict'; // Encoding: UTF-8
/**
 * jMini Site Core Page Script
 *
 * @link     https://github.com/saschaleib/jMini
 * @author   Sascha Leib <ad@hominem.info>
 * @license  GPL 3 (http://www.gnu.org/licenses/gpl.html)
 *
 * @version 0.1.0
 * @date 2023-10-29
 */

let $P = {

	_settings: {
		basePath: 'http://code.kolmio.com/jmini/',
		devPath:  'dev/',
		docsPath: 'docs/'
	},

	/* global init */
	init: function() {
		
		/* init the data model (async!) */
		$P.data.init();
		
	},
	
	/* continue initialisations after the data has been loaded */
	post: function() {
	},
	
	/* called when an error occured that needs to be presented to the user */
	error: function(type, e) {
		console.error(e);
	},

	data: {
		/* the data is stored here for easier access: */
		_model: null,
		
		init: function() {
			$P.data._loadData();
		},
		post: function() {
			console.log($P.data._model);
		},
		
		_loadData: async function() {
		
			let url = $P._settings.basePath + $P._settings.devPath + 'index.json';		
			try {
				let tReq = await fetch(url, {
					method: 'GET',
    				mode: 'no-cors',
    				Accept: 'application/json',
    				credentials: 'omit'
    			});
				/*if (!tReq.ok) {
					throw new Error("Error #" + tReq.status + ", '" + tReq.statusText + "'");
				}*/
				let data = await tReq.text();
				console.log(data);
				return;
		
				let topics = json.topics;
				for (let i = 0; i < topics.length; i++) { 
					let topic = topics[i];

					try {
						let fReq = await fetch($P._settings.devPath + topic.path + 'index.json');
						if (!fReq.ok) {
							throw new Error("Failed to load functions overview file.");
						}
						let finfo = await fReq.json();
						if (finfo) {
							topic._functions = finfo;
						}

					} catch (err) {
						$P.error('load:topic',  err);
					}
				}
				
				/* call the callback with the data */
				callback(target, topics);

			} catch (err) {
				$P.error('load:index', err);
			}
		
		}
	}

}

/* init when document is ready: */
this.addEventListener('DOMContentLoaded', $P.init, false);