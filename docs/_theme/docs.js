'use strict'; // Encoding: UTF-8
/**
 * jMini Documentation pages scripts
 *
 * @link     https://github.com/saschaleib/jMini
 * @author   Sascha Leib <ad@hominem.info>
 * @license  GPL 3 (http://www.gnu.org/licenses/gpl.html)
 *
 * @version 0.2.1
 * @date 2023-11-26
 */
 
$p.nav = {
	
	_settings: {
		devPath:  './dev/',
		docsPath: './wiki/'
	},

	_pageId: '',
	_pageTopic: '',

	_init: function() {
		
		/* get the page id: */
		let body = document.getElementsByTagName('body');
		if (body.length > 0) {
			$p.nav._pageId = body[0].getAttr('data-pageid');
			$p.nav._pageTopic = $p.nav._pageId.substring(0, $p.nav._pageId.indexOf(':'));
		}
		
		/* find the target where to add the nav: */
		let trg = document.getElementById('sidebar-nav');
		if (trg) {
			let tpics = $p.nav.loadTopics(trg, $p.nav.buildNav);
		}
	},

	loadTopics: async function(target, callback) {
		
		try {
			let tReq = await fetch($p.nav._settings.devPath+'index.json');
			if (!tReq.ok) {
				throw new Error("Failed to load topics overview file.");
			}
			let tjson = await tReq.json();
	
			tjson.topics.forEach( async function(topic) {
				
				let th = $p.nav.builder.topicHeader(topic, topic.id == $p.nav._pageTopic);
				let ul = HTMLElement.new('ul');
				
				try {
					let url = $p.nav._settings.devPath + topic.path + 'index.json';
					let tReq = await fetch(url);
					if (!tReq.ok) {
						throw new Error("Failed to load methods index.");
					}
					let methods = await tReq.json();
					if (methods) {
						methods.forEach( (m) => {
							let li = $p.nav.builder.methodItem(m);
							ul.appendChild(li);
						});
					}
				} catch (error) {
					console.error("Could not parse navigation index:", error);
					let err = HTMLElement.new('li')
						.addClass('error')
						.setText(error)
					;
					ul.append(err);
				}
				
				th.appendChild(ul);
				target.appendChild(th);
			});

		} catch (error) {
			console.error("Could not load navigation index:", error);
			let err = HTMLElement.new('p')
				.addClass('error')
				.setText(error)
			;
			document.getElementById('sidebar-nav').append(err);
		}
	},
	
	builder: {
		
		topicHeader: function(topic, open) {

			let th = HTMLElement.new('details')
				.setAttr('data-id', topic.id);
			if (open) th.setAttr('open', '');

			th.appendNew('summary').setText(topic.title);
			return th;
		},
		methodItem: function(method) {
			
			let li = HTMLElement.new('li')
				.setAttr('title', ( method.desc ? method.desc : '' ) );
			let a = li.appendNew('a')
				.setAttr('href', $p.nav._settings.docsPath + method.moreinfo)
				.setText(method.name);
			return li;
		}
	}
}
