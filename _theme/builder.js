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
		
		_callback: {
			
			/* called when any of the selection checkboxes is clicked: */
			onCheckboxClick: function(e) {
				
				/* handle different scopes by different functions: */
				switch(e.target.attr('data-scope')) {
					case 'function':
						$P.data.changeFunctionState(e.target);
						break;
					case 'topic':
						$P.data.changeTopicState(e.target);
						break;
					case 'all':
						$P.data.changeAllState(e.target);
						break;
					default:
						console.warn("No handler for checkbox scope '" + e.target.attr('data-scope') + "' available!")
				}
			}
		},
		
		make: {
			checkbox: function(scope, name, checked = true, ref = null) {
			
				let cb = Element.new('input')
					.attr('data-scope', scope)
					.attr('type', 'checkbox')
					.attr('name', name)
					.on('click', $P.gui._callback.onCheckboxClick)
				;
				if (checked) { cb.attr('checked', 'checked'); }
				if (ref) { cb.attr('data-ref', ref); }
				
				return cb;
			}
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
	
	data: {
		/* the data is stored here for easier access: */
		_model: null,
		
		/* references to the top elements is stored here for easy access: */
		_head: {},
		
		/* changes the status of a function element, depending on the status of its checkbox. */
		changeFunctionState: function(cb) {
			
			let nv = ( cb.checked ? 1 : 0 ); /* 'checked' is a tri-state in some contexts, that is why it needs to be cast to a number! */
			let ref = cb.attr('data-ref');

			if (ref && ref !== '') {
				let func = $P.data.findFunction(ref);
				func._checked = nv;
				$P.data.recalculateTopic($P.data.findTopicForFunction(ref));
			}
		},

		/* changes the status of all elements, depending on the status of the all checkbox. */
		changeAllState: function(cb) {
			let nv = ( cb.checked ? 1 : 0 ); /* 'checked' is a tri-state in some contexts, that is why it needs to be cast to a number! */

			/* loop over all topics */
			let M = $P.data._model;
			M.forEach( (topic) => {
				topic._function.forEach( (func) => {
					
					if (!func._status || func._status !== 'error') {
						func._checked = nv;
						func._checkbox.checked = (nv == 1);
					}
					
				});
				$P.data.recalculateTopic(topic);
			});
		},

		/* changes the status of a topic element, depending on the status of its checkbox. */
		changeTopicState: function(cb) {
			
			let nv = ( cb.checked ? 1 : 0 ); /* 'checked' is a tri-state in some contexts, that is why it needs to be cast to a number! */
			
			/* find the topic: */
			let ref = cb.attr('data-ref');
			if (ref && ref !== '') {
				let topic = $P.data.findTopic(ref);
				topic._checked = nv;				
				topic._function.forEach( (func) => {

					if (!func._status || func._status !== 'error') {
						func._checked = nv;
						func._checkbox.checked = (nv == 1);
					}
				});
				
				$P.data.recalculateTopic(topic);
			}
		},

		/* find a topic reference by ID: */
		findTopic: function(id) {		
			/* loop over the topics */
			let M = $P.data._model;
			for (var i=0; i<M.length; i++) {
				
				/* loop over each function */
				let T = M[i];
				if (T && T.id == id) {
					return T;
				}
			}
			return null;
		},

		/* find a function reference by ID: */
		findFunction: function(id) {		
			/* loop over the topics */
			let M = $P.data._model;
			for (var i=0; i<M.length; i++) {
				
				/* loop over each function */
				let T = M[i];
				if (T) { let F = T._function;
					if (F) { for (var j=0; j<F.length; j++) {
						if (F[j].id == id) {
							return F[j];
						}
				   } }
				}
			}
			return null;
		},
		
		/* finds the name of a function by its ID */
		findFunctionName: function(id) {
			let f = $P.data.findFunction(id);
			return ( f ? f.name : '' );
		},
		
		/* finds the topic in which a function id is located. */
		findTopicForFunction: function(id) {
			
			/* loop over the topics */
			let M = $P.data._model;
			for (var i=0; i<M.length; i++) {
				
				/* loop over each function */
				let T = M[i];
				if (T) { let F = T._function;
					if (F) { for (var j=0; j<F.length; j++) {
						if (F[j].id == id) {
							return T;
						}
				   } }
				}
			}
			return null;
		},

		/* recalculates the weight and checkbox state of a topic: */
		recalculateTopic: function(topic) {
			
			var checked = 0; /* count of checked items */
			var total = 0; /* bytes */
			
			/* loop over each contained function info */
			if (topic._function) {
				for (var j=0; j<topic._function.length; j++) {
					if (topic._function[j]._checked == 1) {
						checked += 1;
						total += topic._function[j].size;
					}
				}

				/* store the calculated size: */
				topic.size = total;
				if (topic._sizefield) { topic._sizefield.text($P.list._formatBytes(total, 2)); }
				
				/* calculate the new topic checkbox status: */
				if (checked >= topic._function.length) {
					topic._checked = 1;
				} else if (checked <= 0) {
					topic._checked = 0;
				} else {
					topic._checked = -1; /* indetermined */
				}
				/* update the topic checkbox: */
				if (topic._checkbox) {
					if (topic._checked < 0) {
						topic._checkbox.indeterminate = true;
					} else {
						topic._checkbox.checked = (topic._checked > 0);
						topic._checkbox.indeterminate = false;
					}
				}
			}
			/* update the totals: */
			$P.data.recalculateTotal();
		},
		
		/* recalculate the size and checkbox state for the header: */
		/* if 'deep' is true, it will look into each function, otherwise only at the topics */
		recalculateTotal: function(deep = false) {
			
			var total = 0; /* bytes */
			var cStatus = 1; 
			var cCount = 0; /* number of checked or partially checked items */

			/* loop over the topics */
			for (var i=0; i<$P.data._model.length; i++) {
				let T = $P.data._model[i];
				total += T.size;
				if (T._checked < 1) { cStatus = -1; }
				if (Math.abs(T._checked) == 1) { cCount += 1; }
			}
			if (cCount < 1) { cStatus = 0; }

			/* update the size field: */
			$P.data._head._sizefield.text($P.list._formatBytes(total, 2));
			
			/* update the checkbox: */
			if (cStatus < 0) {
				$P.data._head._checkbox.indeterminate = true;
			} else {
				$P.data._head._checkbox.checked = (cStatus > 0);
				$P.data._head._checkbox.indeterminate = false;
			}
		},

	},
		
	list: {
		init: function() {
			$P.list._loadJSONFile('dev/index.json', $P.list.buildRoot);
		},

		/* generate a single download file */
		download: function(e) {
			
			e.preventDefault();
			
			var code = "'use strict'\n";
			
			$P.data._model.forEach( (topic) => {
				
				if (topic._checked !== 0 ) {
					code += "/* " + topic.title + " */\n";
					
					topic._function.forEach( (func) => {
						//console.log(func);
						
						if (func._checked > 0 ) {
							code += func._code + "\n";
						}
						
					});
				}
			});

			console.info(code);
			
			/* prepare the download woraround: */
			let tmpLink = Element.new('a')
				.attr('download', 'jmini.js')
				.attr('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code))
			;
			tmpLink.style.display = 'none';
			document.body.append(tmpLink);
			
			tmpLink.click();
			
			document.body.removeChild(tmpLink);
			
		},

		/* build the root level of the list */
		buildRoot: function(json) {
			
			let version = json.version;
			console.info("Index file version: " + version);
			
			// TODO: check if version is OK!
			
			/* store the list in the model: */
			$P.data._model = json.topics;
			
			let main = document.getElementsByTagName('main')[0];

			/* store header checkbox info in model: */
			let checkbox = $P.gui.make.checkbox('all', 'cb-0-all', true);
			$P.data._head._checkbox = checkbox;

			/* store header data field info in the model: */
			let sizefield = Element.new('span')
				.attr('id', 'downloadSize')
				.text('—')
			$P.data._head._sizefield = sizefield;

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
						.append(sizefield)
						.append(checkbox)
					)
				);
			let section = Element.new('section')
				.attr('id', 'topics-list')
				.append(form);
					
			/* loop over all the root topics: */					
			json.topics.forEach((topic) => {
				
				/* create the checkbox first and store a reference in the data model: */
				let checkbox = $P.gui.make.checkbox('topic', 'cb-1-' + topic.id, true, topic.id)
				topic._checkbox = checkbox;
				topic._checked = 1;
				
				/* create the size field and store a reference in the data model: */
				let sizefield = Element.new('span')
					.attr('class', 'groupSize')
					.text($P.list._formatBytes(topic.size, 2));
				topic._sizefield = sizefield;

				/* the target sublist */
				let sublist = Element.new('div').attr('class', 'sub-items');
				topic._sublist = sublist;

				let details = Element.new('details')
					.attr('open', 'open')
					.append(Element.new('summary')
						.append(Element.new('span')
							.attr('class', 'label')
							.attr('title', topic.desc)
							.text(topic.title)
						)
						.append(sizefield)
						.append(checkbox)
					)
					.attr('data-topicid', topic.id)
					.attr('data-loaded', 'false')
					.attr('data-path', topic.path)
					.attr('data-size', topic.size)
					.append(sublist);

				form.append(details);

			});

			/* add the footer items: */
			let footer = Element.new('footer')
				.append(Element.new('button')
					.on('click', $P.list.download)
					.attr('type', 'submit')
					.text('Download')
				)
			;
			form.append(footer);

			main.append(section);

			/* done. now load the sub-items: */
			$P.list.loadSubItems();
			
			/* recalculate the totals: */
			$P.data.recalculateTotal(true);

		},
		
		/* load all the sub-items */
		loadSubItems: function() {
			
			/* loop over all the loaded items and load the sub-info: */
			$P.data._model.forEach((topic) => {
				$P.list._loadJSONFile('dev/' + topic.path + 'index.json', $P.list.builditem, topic);
			});

		},
		
		builditem: function(json, topic) {

			//console.info(topic);

			/* store the loaded data in the model */
			topic._function = json;

			/* create elements for each function: */
			json.forEach((func) => {

				//console.info(func);

				/* first create the checkbox and store a reference in the model: */
				let checkbox = $P.gui.make.checkbox('function', 'cb-2-' + func.id, true, func.id)
				func._checkbox = checkbox;
				func._checked = 1;
				
				let sizefield = Element.new('span')
					.attr('class', 'funcSize')
					.text($P.list._formatBytes(func.size));
				func._sizefield = sizefield;

				/* create the other elements: */
				let summary = Element.new('summary')
					.append(Element.new('span')
						.attr('class', 'funcName')
						.attr('title', func.desc)
						.html(func.name)
					)
					.append(Element.new('span')
						.attr('class', 'desc')
						.text(func.desc)
					)
					.append(sizefield)
					.append(checkbox);
									
				let ol = Element.new('ol').attr('class', 'variants');
				func.variants.forEach( (it) => {
					ol.append(Element.new('li')
						.html(it.sig)
					);
				});
				
				let item = Element.new('details')
					.attr('data-itemtype', ( func.type ? func.type : 'unknown') )
					.append(summary)
					.append(Element.new('p')
						.attr('class', 'description')
						.text(func.desc)
					)
					.append(ol)
				;
				
				/* add "requires" names, if applicable: */
				if (func.requires && func.requires.length > 0) {
					let dl = Element.new('dl')
						.attr('class', 'requires')
						.append(Element.new('dt')
							.text('Requires: ')
						)
					;
					func.requires.forEach((n) => {
						dl.append(Element.new('dd').html($P.data.findFunctionName(n)))
					})
					item.append(dl);
				}
				
				/* add moreinfo link if applicable: */
				if (func.moreinfo && func.moreinfo !== '') {
					item.append(Element.new('p')
						.attr('class', 'moreinfo')
						.append('<a href="' + func.moreinfo + '" target="_blank">More information</a>')
					)
				}
				
				/* load the file content: */
				let path = 'dev/' + topic.path + func.file;
				$P.list._loadCodeFile(path, (code, func) => {
					
					func._code = code;
					
					if (code.length !== func.size) {
						func.size = code.length;
						if (func._sizefield) {
							func._sizefield.text($P.list._formatBytes(func.size));
						}
					}
				}, func, (e) => {
					
					/* an error occured! */
					console.warn(e);
					console.info(func);
					
					func.size = 0;
					if (func._sizefield) {
						func._status = 'error';
						func._sizefield.text('[error]').attr('class', 'funcSize error');
						func._checkbox.checked = false;
						func._checkbox.attr('disabled', 'disabled');
						func._checked = 0;
					}
					
				});

				/* append to list: */
				topic._sublist.append(item);
			})
		},
		
		/* todo: this should be added to jMini: */
		_loadJSONFile: function(path, callback, context = null) {
			fetch(path)
				.then(response => response.json())
				.then(jsonResponse => callback(jsonResponse, context));
		},
		
		/* todo: this should be added to jMini: */
		_loadCodeFile: async function(path, callback, context, errorCallback) {

			$P.gui.busy.start();

			console.info("Loading from: " + path);
			try {
				let response = await fetch(path);
				if (!response.ok) {	throw new Error(`HTTP error! Status: ${response.status}`); }
				let code = await response.text();
				callback(code, context);
			} catch(e) {
				errorCallback(e);
			}

			$P.gui.busy.end();
		},

		
		/* helper function to format bytes in a more friendly way */
		/* (from https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript) */
		_formatBytes: function(bytes, decimals = 2) {
			if (!+bytes) return '—'

			const k = 1024
			const dm = decimals < 0 ? 0 : decimals
			const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

			const i = Math.floor(Math.log(bytes) / Math.log(k))

			return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
		}
	}
}

/* init when document is ready: */
this.addEventListener('DOMContentLoaded', $P.init, false);