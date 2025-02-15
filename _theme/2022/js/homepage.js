'use strict'; // Encoding: UTF-8
/**
 * jMini Homepage Scripts
 *
 * @link     https://github.com/saschaleib/jMini
 * @author   Sascha Leib <ad@hominem.info>
 * @license  GPL 3 (http://www.gnu.org/licenses/gpl.html)
 *
 * @version 1.2.0
 * @date 2025-02-15
 */

/* dynamic loader for the documents list: */
$p.dyn.docslist = {
	
	init: function(p) {
		//console.log('$p.dyn.docslist.init()');
		
		// register the action handler:
		$p.dyn.action.register('docindex', this.loadTopics);
	},
	
	/* store base address for loading content and linking here: */
	_base: '',
	_docs: '',
	
	/* the action callback function. Will be called when the JSON snippet is found in the page. */
	loadTopics: function(e, json) {
		//console.log('$p.dyn.docslist.loadTopics(',e,',',json,')');
		
		$p.dyn.docslist._base = ( json.from ? json.from : '' );
		$p.dyn.docslist._docs = ( json.to ? json.to : '' );
		
		JSON.load(json.from + 'index.json')
		.then( result => {
			
			// build the topics list:
			result.topics.forEach( it => {
				const det = HTMLElement.new('details', {
					'data-id': it.id,
					'data-path': it.path,
					'data-loaded': false
				})
				.on('toggle', $p.dyn.docslist.onOpenTopic);
				
				const sum = det.appendNew('summary', {
						'title': it.desc
					})
					.setText(it.title);
					
				e.appendChild(det);
			});
			
		})
		.catch( error => {
			console.error(error);
		})
		/*.finally( () => {
			console.log("All done.");
		})*/;
	}, 
	
	/* element callback. WIll be called when the user clicks on the topic header */
	onOpenTopic: function(e) {
		//console.log('$p.dyn.docslist.onOpenTopic(',e,')');
		
		const loaded = e.target.getAttr('data-loaded');
		if (e.newState == 'open' && loaded !== 'true') {

			const path = e.target.getAttr('data-path');
			if (path !== '') {
				JSON.load($p.dyn.docslist._base + path + 'index.json')
				.then( result => {
					if (Array.isArray(result)) {
						const ul = HTMLElement.new('ul');
						result.forEach( it => {
							
							const li = ul.appendNew('li', {
								'title': it.desc
							});
							li.appendNew('a', {
								'href': $p.dyn.docslist._docs + it.moreinfo
							})
							.setHtml(it.namehtml);
						});
						e.target.appendChild(ul);
					}
				})
				.catch( error => {
					console.error(error);
				})
				.finally( () => {
					e.target.setAttr('data-loaded', 'true')
				});
			}
		}
	}
}