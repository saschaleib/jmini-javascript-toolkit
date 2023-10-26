'use strict'; // Encoding: UTF-8
/**
 * jMini Documentation pages scripts
 *
 * @link     https://github.com/saschaleib/jMini
 * @author   Sascha Leib <ad@hominem.info>
 * @license  GPL 3 (http://www.gnu.org/licenses/gpl.html)
 *
 * @version 0.0.1
 * @date 2023-10-26
 */

let $P = {
	
	_settings: {
		devPath:  '/jmini/dev/',
		docsPath: '/jmini/'
	},
	
	/* global init */
	init: function() {
		console.info('$P.init()');
		
		/* get the page id: */
		let body = document.getElementsByTagName('body');
		if (body.length > 0) {
			$P.pageId = body[0].attr('data-pageid');
		}
		$P.nav.init();
	},
	
	pageID: null,
	
	/* load the navigation from the dev JSONs */
	nav: {

		init: function() {
			console.info('$P.nav.init()');
			
			/* find the target where to add the nav: */
			let trg = document.getElementById('sidebar-nav');
			if (trg) {
				let tpics = $P.nav.loadTopics(trg, $P.nav.buildNav);
			}
		},
		
		/* store an element reference here: */
		_element: null,
		
		buildNav: function(target, topics) {

			/* add all topics: */
			topics.forEach( (topic) => {

				console.log(topic);

				/* create the list: */
				let ul = HTMLElement.new('ul');
				topic._functions.forEach( (func) => {

					//console.log(func);

					let a = HTMLElement.new('a')
						.attr('href', $P._settings.docsPath+(func.moreinfo ? func.moreinfo : 'index.html'))
						.attr('title', (func.desc ? func.desc : ''))
						.html(func.name ? func.name : 'untitled')
					;
					let li = HTMLElement.new('li').append(a);
					ul.append(li);
				});

				let details = HTMLElement.new('details')
					.append(HTMLElement.new('summary')
						.attr('title', ( topic.desc ? topic.desc : '' ))
						.setText(topic.title ? topic.title : 'Untitled')
					)
					.append(ul);
				;

				/* check if current */
				let [pageTopic, ...pageName] = ( $P.pageId ? $P.pageId.split(':') : []);
				if (topic.id == pageTopic) {
					details.attr('open','open');
				}
				target.append(details);
			});
		},

		loadTopics: async function(target, callback) {
			
			try {
				let tReq = await fetch($P._settings.devPath+'index.json');
				if (!tReq.ok) {
					throw new Error("Failed to load topics overview file.");
				}
				let json = await tReq.json();
		
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

					} catch (error) {
						console.error("Could not load navigation index:", error);
					}
				}
				
				/* call the callback with the data */
				callback(target, topics);

			} catch (error) {
				console.error("Could not load navigation index:", error);
			}
		}
	}
}

/* init when document is ready: */
this.addEventListener('DOMContentLoaded', $P.init, false);