'use strict'; // Encoding: UTF-8
/**
 * jMini Download Builder
 *
 * @link     https://github.com/saschaleib/jMini
 * @author   Sascha Leib <ad@hominem.info>
 * @license  GPL 3 (http://www.gnu.org/licenses/gpl.html)
 *
 * @version 0.0.1
 * @date 2023-10-21
 */

/* page functions */
let $P = {
	init: function() {
		$P.gui.busy.start();

		//$P.gui.init();
		$P.list.init();
		
		$P.gui.busy.end();
	},
	
	gui: {
		init: function() {
			//$P.gui.busy.init();
		},
		
		busy: {
			init: function() {
				// not used.
			},
			/* keep track of how many busy are live now */
			_count: 0,
			
			start: function() {
				$P.gui.busy._count += 1;
				console.info('gui.busy.start() - count: ' + $P.gui.busy._count);
				if ($P.gui.busy._count <= 1) {
					let anims = document.getElementsByClassName('loading-anim');
					if (anims.lengt >= 1) {
						anims[0].style.display = 'block';
					}
				}
			},
			end: function() {
				$P.gui.busy._count -= 1;
				console.info('gui.busy.end() - count: ' + $P.gui.busy._count);
				if ($P.gui.busy._count <= 0) {
					let anims = document.getElementsByClassName('loading-anim');
					if (anims.lengt >= 1) {
						anims[0].style.display = 'none';
					}
				}
			}
		}
	},
	
	list: {
		init: function() {
			console.log("$P.list.init()");
			
			$P.list._loadJSONFile('dev/index.json', $P.list.buildRoot);
		},
		
		/* the data is stored here for easier access: */
		_model: null,
		
		/* build the root level of the list */
		buildRoot: function(json) {
			
			let version = json.version;
			console.info("Version: " + version);
			
			// TODO: check if version is OK!
			
			/* store the list in the model: */
			$P.list._model = json.topics;
			
			let main = document.getElementsByTagName('main')[0];

			/* create the form target: */
			let form = Element.new('form')
				.append(Element.new('header')
					.append(Element.new('p')
						.append(Element.new('span')
							.attr('class', 'label')
							.text("jMini Download")
							.append(Element.new('div')
								.attr('class', 'loading-anim')
								.attr('style', 'display:none')
								.append(Element.new('div'))
								.append(Element.new('div'))
								.append(Element.new('div'))
							)
						)
						.append(Element.new('span')
							.attr('id', 'downloadSize')
							.text($P.list._formatBytes(1234, 2))
						)
						.append(Element.new('input')
							.attr('type', 'checkbox')
							.attr('checked', 'checked')
							.attr('name', 'cb-0-all')
						)
					)
				);
			let section = Element.new('section')
				.attr('id', 'topics-list')
				.append(form);
					
			/* loop over all the root topics: */					
			json.topics.forEach((topic) => {
				
				let details = Element.new('details')
					.attr('open', 'open')
					.append(Element.new('summary')
						.append(Element.new('span')
							.attr('class', 'label')
							.attr('title', topic.desc)
							.text(topic.title)
						)
						.append(Element.new('span')
							.attr('class', 'groupSize')
							.text($P.list._formatBytes(topic.size, 2))
						)
						.append(Element.new('input')
							.attr('type', 'checkbox')
							.attr('checked', 'checked')
							.attr('name', 'cb-1-' + topic.id )
						)
					)
					.attr('data-topicid', topic.id)
					.attr('data-loaded', 'false')
					.attr('data-path', topic.path)
					.attr('data-size', topic.size);

				form.append(details);
				
				/* store the references */
				topic._elements = {
					details: details
				}
				
			});

			/* add the footer items: */
			let footer = Element.new('footer')
				.append(Element.new('button')
					.attr('type', 'submit')
					.text('Download')
				);
			form.append(footer);

			main.append(section);
			
			/* done. now load the sub-items: */
			$P.list.loadSubItems(form);

		},
		
		/* load all the sub-items */
		loadSubItems: function() {
			
			/* loop over all the loaded items and load the sub-info: */
			$P.list._model.forEach((topic) => {
				$P.list._loadJSONFile('dev/' + topic.path + 'index.json', $P.list.builditem, topic);
			});
		},
		
		builditem: function(json, context) {

			/* the target sublist */
			let sublist = Element.new('div').attr('class', 'sub-items');

			json.forEach((func) => {
				console.log(func);
				
				let item = Element.new('details')
					.append(Element.new('summary')
						.append(Element.new('span')
							.attr('class', 'funcName')
							.attr('title', func.desc)
							.html(func.name)
						)
						.append(Element.new('span')
							.attr('class', 'desc')
							.text(func.desc)
						)
						.append(Element.new('span')
							.attr('class', 'funcSize')
							.text($P.list._formatBytes(func.size))
						)
						.append(Element.new('input')
							.attr('type', 'checkbox')
							.attr('checked', 'checked')
						)
					)
					.append(Element.new('p')
						.attr('class', 'description')
						.text(func.desc)
					)
				;
				
				let ul = Element.new('ul').attr('class', 'variants');
				func.variants.forEach( (it) => {
					ul.append(Element.new('li')
						.html(it.sig)
					);
				});

				sublist.append(item.append(ul));
				
			})
			context._elements.details.append(sublist);
		},
		
		/* todo: this should be added to jMini: */
		_loadJSONFile: function(path, callback, context = null) {
			fetch(path)
				.then(response => response.json())
				.then(jsonResponse => callback(jsonResponse, context));
		},
		
		/* helper function to format bytes in a more friendly way */
		/* (from https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript) */
		_formatBytes: function(bytes, decimals = 2) {
			if (!+bytes) return '0 Bytes'

			const k = 1024
			const dm = decimals < 0 ? 0 : decimals
			const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

			const i = Math.floor(Math.log(bytes) / Math.log(k))

			return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
		}
	}
}
// init when document is ready: 
$(function() { $P.init(); });