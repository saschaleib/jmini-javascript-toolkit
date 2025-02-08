'use strict';

/* Copyright 2023 Sascha Leib
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the “Software”), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/* returns the first element of an array, or null, if none exists */
/* parent object: Array */
/* returns: any type */
Array.prototype.first = function() {
	if (this.length > 0) {
		return this[0];
	} else {
		return null;
	}
}
/* returns the last element of an array, or null, if none exists */
/* parent object: Array */
/* returns: any type */
Array.prototype.last = function() {
	if (this.length > 0) {
		return this[this.length-1];
	} else {
		return null;
	}
}
/* Converts an array into a Html structure */
/* parent object: Array */
/* parameters: */
/*  - atlist: Attributes list (object), optional
/* returns: HtmlElement (including sub-elements) */
Array.prototype.toHtml = function(atlist = undefined) {
	
	/* create the table header: */
	const thead = HTMLElement.new('thead');
	const thr = thead.appendNew('tr');
	thr.appendNew('th').setText('#');
	thr.appendNew('th').setText('Value');
	
	/* create the body: */
	const tbody = HTMLElement.new('tbody');

	this.forEach(function (rval, i) {
		let tr = tbody.appendNew('tr');
		tr.appendNew('th').setText(i);
		tr.appendNew('td', {
			"class": (typeof rval)
		}).setText(JSON.stringify(rval));
	});
	
	/* combine header and body to table: */
	const table = HTMLElement.new('table', atlist);
	table.appendChild(thead);
	table.appendChild(tbody);
	
	return table;
}
/* Loads a JSON file over the network */
/* parent object: JSON */
/* parameter: url (String) the address where to load the file from (required) */
/* parameter: opt (Object) fetch parameters */
/* returns: Promise */
/* Support: Widely supported since ca. 2014 */
JSON.load = async function(url, opt) {
	console.info('JSON.load("'+url+'",',opt,')');
	
	return fetch(url, opt)
	.then( rp => {
		if (!rp.ok) {
			throw new Error('HTTP Status ' + rp.status + ' – ' + rp.statusText);
		};

		return rp.json()
	});
}
/* Attaches an event listener to an HTMLElement */
/* parameter: (String, required) name of the event to listen to */
/* parameter: (Function, required) the callback function */
/* parent object: HTMLElement */
HTMLElement.prototype.on = function(n, cb) {
	this.addEventListener(n, cb);
	return this;
}
/* Attaches an event listener that will only be called once to an HTMLElement */
/* parameter: (String, required) name of the event to listen to */
/* parameter: (Function, required) the callback function */
/* parent object: HTMLElement */
/* returns: nothing */
HTMLElement.prototype.once = function(n, cb) {
	this.addEventListener(n, cb, {once: true});
	return this;
}
/* Attaches an event listener to an HTMLElement */
/* parameter: (String, required) name of the event to listen to */
/* parameter: (Function, required) the callback function */
/* parent object: HTMLElement */
/* returns: nothing */
HTMLElement.prototype.off = function(n, cb) {
	this.removeEventListener(n, cb);
	return this;
}
/* Attaches a listener for the "blur" event to an Element */
/* parameter: (Function, required) the callback function */
/* parent object: Element */
/* returns: Element (passes through the parent element) */
HTMLElement.prototype.onBlur = function(cb) {
	this.addEventListener('blur', cb);
	return this;
}
/* Attaches a listener for the "click" event to an Element */
/* parameter: (Function, required) the callback function */
/* parent object: Element */
/* returns: Element (passes through the parent element) */
HTMLElement.prototype.onClick = function(cb) {
	this.addEventListener('click', cb);
	return this;
}
/* Attaches a listener for the "focus" event to an Element */
/* parameter: (Function, required) the callback function */
/* parent object: Element */
/* returns: Element (passes through the parent element) */
HTMLElement.prototype.onFocus = function(cb) {
	this.addEventListener('focus', cb);
	return this;
}
/* Attaches a listener for the "focus" event to a <form> Element */
/* parameter: (Function, required) the callback function */
/* parent object: HTMLElement (form only) */
/* returns: HTMLElement (passes through the parent element) */
HTMLFormElement.prototype.onSubmit = function(cb) {
	this.addEventListener('submit', cb);
	return this;
}
/* Attaches a listener for the "DOMContentLoaded" event to the document */
/* parameter: (Function, required) the callback function */
/* parent object: Element ( */
/* returns: HTMLDocument (passes through the parent element) */
document.onReady = function(cb) {
	document.addEventListener('DOMContentLoaded', cb);
	return document;
}
/* Adds a class to the parent HTMLElement */
/* parameter: (String, required) name of the class */
/* parent object: HTMLElement */
/* returns: HTMLElement */
HTMLElement.prototype.addClass = function(n) {
	this.classList.add(n);
	return this;
}
/* Removes a class from the parent HTMLElement */
/* parameter: (String, required) name of the class */
/* parent object: HTMLElement */
/* returns: HTMLElement */
HTMLElement.prototype.removeClass = function(n) {
	this.classList.remove(n);
	return this;
}
/* Toggles a class on the parent HTMLElement */
/* parameter: (String, required) name of the class */
/* parent object: HTMLElement */
/* returns: HTMLElement */
HTMLElement.prototype.toggleClass = function(n) {
	this.classList.toggle(n);
	return this;
}
/* Returns true, if the parent HTMLElement has a class of the specified name */
/* parameter: (String, required) name of the class */
/* parent object: HTMLElement */
/* returns: Boolean */
HTMLElement.prototype.hasClass = function(n) {
	return this.classList.contains(n);
}
/* returns a list of ancestors of an element (optionally filtered by a callback function */
/* parameter: callback (function, optional), check each element if it should be added */
/* parent object: Element */
/* returns: Array of HTMLElements */
HTMLElement.prototype.getAncestors = function(cb = undefined) {
	let r = [];
	
	var p = this.parentNode;
	while (p) {
		if ( p.nodeType === Node.ELEMENT_NODE && ( !cb || cb(p) ) ) {
			r.push(p);
		}
		p = p.parentNode;
	}

	return r;
}
/* returns a list of siblings of an element (omitting the element itself) */
/* parameter: callback (function, optional), check each element if it should be added */
/* parent object: Element */
/* returns: Array of HTMLElements */
HTMLElement.prototype.getSiblings = function(cb = undefined) {
	let r = [];
	if(this.parentNode) {
		var s = this.parentNode.firstChild;
		while (s) {
			if (s !== this && s.nodeType === Node.ELEMENT_NODE ) {
				if ( !cb || cb(s) ) {
					r.push(s);
				}
			}
			s = s.nextSibling;
		}
	}
	return r;
}
/* returns a list of direct (!) children of an element (optionally filtered by a callback function */
/* parameter: callback (function, optional), check each element if it should be added */
/* parent object: Element */
/* returns: Array of HTMLElements */

HTMLElement.prototype.getChildren = function(cb = undefined) {

       let r = [];

       if (this.hasChildNodes()) {

             let children = this.childNodes;
             for (const n of children) {
                    if ( n.nodeType === Node.ELEMENT_NODE && ( !cb || cb(n) ) ) {
                          r.push(n);
                    }
             }
       }

       return r;
}
/* returns a list of descendants of an element (optionally filtered by a callback function */
/* parameter: callback (function, optional), check each element if it should be added */
/* parent object: Element */
/* returns: Array of HTMLElements */

HTMLElement.prototype.getDescendants = function(cb = undefined) {

		let r = [];

		if (this.hasChildNodes()) {

			let children = this.childNodes;
			for (const n of children) {
				if ( n.nodeType === Node.ELEMENT_NODE ) {
					r = r.concat(n.getDescendants(cb));
					if ( !cb || cb(n) ) {
						r.push(n);
					}
				}
			}
		}

       return r;
}
/* Formats an integer number to a String containing the correct Bytes multiplier (e.g. 1.2 GiB) */
/* parameter: (Number, optional) number of digits (default = 2) */
/* parameter: (String, optional) the locale format to use (default = 'en') */
/* parameter: (Object, optional) options for the International number format (default = null) */
/* parameter: (Object, optional) overrides for specific values (default = undefined) */
/* parent object: Number */
/* returns: the (modified) parent object */
/* Support: DOM Level 1 (1998) */
Number.prototype.toBytesString = function(d = 2, l = 'en-US', o = undefined) {

	let u = ['Bytes','KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB','???'];
	var m = Math.floor(this);

	/* check first if there is an override value */
	if (o && o[m]) {
		return o[m];
		
	} else {

		var p = 0;
		while (m > 980 && p < u.length) {
			m = m/1024;
			p += 1;
		}
		let f = new Intl.NumberFormat(l, {
			maximumSignificantDigits: d
		});

		return f.format(m) + '\u202F' + u[p];
	}
}
/* creates a new Element */
/* parent object: Element */
/* parameter: name (String) the name of the element (required) */
/* parameter: attr (Object) a list of attributes to be added, */
/* returns: the newly created HTMLElement */
/* Support: DOM Level 1 (1998) */
HTMLElement.new = function(name, atlist = undefined) {
	var r = null;
	try {
		r = document.createElement(name);
		if (atlist) {
			for (let attr in atlist) {
				r.setAttribute(attr, atlist[attr]);
			}
		}
	} catch(e) {
		console.error(e);
	}
	return r;
}

/* Gets attribute value from an element */
/* parameter: name (String) the name of the attribute, */
/* parent object: Element */
/* returns: the value of the attribute (String) */
/* Support: DOM Level 1 (1998) */
HTMLElement.prototype.getAttr = function(n) {
	let a = this.getAttribute(n);
	return ( a ? a : '');
}

/* Sets an attribute value for an element */
/* parameter: name (String) the name of the attribute, */
/* parameter: value (String) the value for the attribute */
/* parent object: Element */
/* returns: the parent element (Object) */
/* Support: DOM Level 1 (1998) */
HTMLElement.prototype.setAttr = function(n, v) {
	this.setAttribute(n, v);
	return this;
}

/* Appends a new text node to the end of the child nodes list of an element */
/* parameter: (required) text to add */
/* parent object: HTMLElement */
/* returns: the (modified) parent object */
/* Support: DOM Level 1 (1998) */
HTMLElement.prototype.appendText = function(txt) {
	let t = document.createTextNode(txt);
	this.append(t);
	return this;
}
/* Prepends a new text node to the beginning of the child nodes list of an element */
/* parameter: (required) text to add */
/* parent object: HTMLElement */
/* returns: the (modified) parent object */
/* Support: DOM Level 1 (1998) */
HTMLElement.prototype.prependText = function(txt) {
	this.prepend(document.createTextNode(txt));
	return this;
}
/* Sets or gets the text content of an element */
/* parent object: Element */
/* returns: the text content as String */
/* Support: DOM Level 1 (1998) */
HTMLElement.prototype.getText = function() {
	return this.textContent;
}
/* Sets the text content of an element */
/* parameter: (required) text to set */
/* parent object: HTMLElement */
/* returns: the (modified) parent object */
/* Support: DOM Level 1 (1998) */
HTMLElement.prototype.setText = function(txt) {
	this.textContent = txt.toString();
	return this;
}
/* appends a new child HTMLElement to the parent. */
/* parent object: HTMLElement */
/* parameter: name (String, required) name of the new child element */
/* parameter: att (Object, optional) name of the new child element */
/* returns: the (modified) parent object */
/* Requires: HTMLElement.new (static) */
HTMLElement.prototype.appendNew = function(n, att = undefined) {
	var e = null;
	try {
		e = HTMLElement.new(n, att);
		this.appendChild(e);
	} catch(e) {
		console.error(e);
	}
	return e;
}
/* prepends a new child HTMLElement to the parent. */
/* parent object: HTMLElement */
/* parameter: name (String, required) name of the new child element */
/* parameter: att (Object, optional) name of the new child element */
/* returns: the (modified) parent object */
/* Requires: HTMLElement.new (static) */
HTMLElement.prototype.prependNew = function(n, att = undefined) {
	var e = null;
	try {
		e = HTMLElement.new(n, att);
		this.prepend(e);
	} catch(e) {
		console.error(e);
	}
	return e;
}
/* Sets the html content of an element */
/* parameter: xhtml (String) to parse and set */
/* parent object: Element */
/* returns: the (modified) parent object */
HTMLElement.prototype.setHtml = function(xhtml) {
	let parser = new DOMParser();
	let doc = parser.parseFromString('<div>' + xhtml + '</div>', 'application/xml');
	this.innerHTML = doc.documentElement.innerHTML;
	return this;
}
/* Gets the html content of an element */
/* parameter: (optional) html to set */
/* parent object: Element */
/* returns: the inner HTML as String */
HTMLElement.prototype.getHtml = function(xhtml = null) {
	return this.innerHTML;
}
/* removes all child nodes of the element */
/* parent object: HTMLElement */
HTMLElement.prototype.empty = function() {
	while (this.firstChild) {
		this.removeChild(this.lastChild);
	}
	return this;
}
/* Loads an HTML document into an existing element */
/* parameter: url (String) the address of the document to load */
/* parent object: Element */
/* returns: void */
/* Support: DOM Level 1 (1998) */
HTMLElement.prototype.load = async function(url, opt = undefined ) {
	//console.info('HTMLElement.load("' + url + '")');

	return fetch(url, opt)
	.then( rp => {
		if (!rp.ok) {
			throw new Error('HTTP Status ' + rp.status + ' – ' + rp.statusText);
		};
		
		return rp.text()
		.then( html => {
			this.innerHTML = html;
			return html;
		})
	});
}

/* Page frameword core */
/* Authors:
    - Sascha Leib <ad@hominem.info>
 */
/* This project is licensed under the terms of the MIT license. */
let $p = {

	/* shadow init function */
	_init: function() {
		console.info('$p._init()');
		
		/* call sub-sections' pre-inits: */
		$p._callInit($p, true);
		
		/* Now call the actual inits: */
		$p._callInit($p);
		if ($p.init) $p.init($p);
	}, 
	
	/* initialize sub-items of an object: */
	_callInit: function(obj, pre = false) {
		//console.info('$p._callInit(obj=',obj,', pre=',pre,')');

		/* call init / _init on each sub-object: */
		Object.keys(obj).forEach( (key,i) => {
			const sub = obj[key];
			let init = null;
			if (typeof sub === 'object') {
				if (pre && sub._init) {
					init = sub._init;
				} else if (!pre && sub.init) {
					init = sub.init;
				}

				// bind to object
				if (typeof init == 'function') {
					const init2 = init.bind(sub);
					init2(obj);
				}
			}
		});

	}
}
/* call pre-init when the file is loaded */
document.addEventListener('DOMContentLoaded', $p._init);
/* Page GUI frameword core */
/* Authors:
    - Sascha Leib <ad@hominem.info>
 */
/* This project is licensed under the terms of the MIT license. */
$p.gui = {

	/* shadow init function */
	_init: function(p) {
		console.info('$p.gui._init()');
		//console.log('parent=',p);
		
		/* call sub-sections' pre-inits: */
		$p._callInit(this, true);
		
		/* Now call the actual init: */
		p._callInit(this);
		if (this.init) this.init(this);
	}
}
/* Page GUI tabbed interface class */
/* Authors:
    - Sascha Leib <ad@hominem.info>
 */
/* This project is licensed under the terms of the MIT license. */
$p.gui.tabs = {

	/* pre-init function */
	_init: function() {
		console.log('$p.gui.tabs._init()');
				
		/* find and add all existing tabs */
		document.querySelectorAll('*[role=tablist]')
			.forEach($p.gui.tabs.add);
	},
	
	/* add a new tab interface: */
	add: function(tablist) {
		console.log('$p.gui.tabs.add()');

		tablist.querySelectorAll('*[role=tab]')
			.forEach( t => t.onClick($p.gui.tabs._onTabClick) )
	},
	
	/* callback for tab click */
	_onTabClick: function(e) {
		console.log('$p.gui.tabs._onTabClick()');
		
		/* reusable constants: */
		const kAriaSelected = 'aria-selected';
		const kAriaControls = 'aria-controls';
		const kTrue = 'true';
		const kFalse = 'false';
		const kHidden = 'hidden';
		
		/* cancel default action */
		e.preventDefault();
		
		/* if the active tab is clicked, do nothing: */
		let selState = this.getAttribute(kAriaSelected);
		if ( selState && selState == kTrue ) {
			return;
		}
		
		/* find the active tab element: */
		var aItem = null;
		let tablist = this.getAncestors( (it) => {
			return ((it.getAttribute ? it.getAttribute('role') : null) == 'tablist');
		}).first();
		if (tablist) {
			let lis = tablist.querySelectorAll('*[role=tab]');
			lis.forEach( (it) => {
				let selected = it.getAttribute(kAriaSelected);
				if ( selected && selected == kTrue ) {
					aItem = it;
				}
			});
		}
		
		/* swap the active states: */
		this.setAttribute(kAriaSelected, kTrue);
		if (aItem) {
			aItem.setAttribute(kAriaSelected, kFalse);
			let aId = aItem.getAttribute(kAriaControls);
			let aObj = document.getElementById(aId);
			if (aObj) aObj.hidden = true;
		}
		
		/* show the new panel: */
		let nId = this.getAttribute(kAriaControls);
		let nObj = document.getElementById(nId);
		if (nObj) nObj.hidden = false;
	}
}
/* Page GUI frameword core */
/* Authors:
    - Sascha Leib <ad@hominem.info>
 */
/* This project is licensed under the terms of the MIT license. */
$p.gui.overlay = {

	/* pre-init function */
	_init: function() {
		
		console.log("$p.gui.overlay._init()");

		/* create the overlay element */
		let o = HTMLElement.new('div', {
			'id': 'overlay',
			'style': 'z-index:9; display:none;',
			'tabindex': '-1'
		})
		.onClick($p.gui.overlay.hide);

		/* store a reference for later */
		$p.gui.overlay._element = o;
		
		/* attach it to the page */
		document.body.appendChild(o);
	},

	/* reference to the overlay element */
	_element: null,
	
	/* list of callbacks for when the overlay is closed */
	_callbacks: [],
	
	/* show/open the overlay */
	show: function(callback, zIdx, color = null) {

		console.log("$p.gui.overlay.show()");

		let o = $p.gui.overlay._element;
		if (o) {

			/* set the z-index of the overlay */
			if (zIdx !== undefined) {
				o.style.zIndex = parseInt(zIdx);
			}

			/* give it a background colour: */
			o.style.backgroundColor = ( color ? color : 'transparent' );

			/* attach the callback on close */
			if (callback !== undefined && typeof callback == "function") {
				$p.gui.overlay._callbacks.push(callback);
			}

			/* set CSS display to default */
			o.style.display = null;
		}
	},
	
	/* hide/close the overlay */
	hide: function() {

		console.log("$p.gui.overlay.hide()");

		/* loop over all callbacks */
		while ($p.gui.overlay._callbacks.length > 0) {
			let cb = $p.gui.overlay._callbacks.pop();
			cb(); /* call the callback */
		}

		/* hide the overlay by CSS */
		$p.gui.overlay._element.style.display = 'none';

	},
}
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
/* page console */
/* enables an in-page console as an alternative to the browser console
/* Authors:
    - Sascha Leib <ad@hominem.info>
 */
/* This project is licensed under the terms of the MIT license. */
$p.console = {

	/* shadow init function */
	_init: function(p) {
		//console.info('$p.console._init()');
		//console.log('this=', this);
		//console.log('parent=', p);
		
		/* call sub-sections' pre-inits, if any are added: */
		$p._callInit(this, true);
	
	},
	
	// reference to the list object where to add items:
	_targetStack: [],
	
	/* set and prepare the target element for console logging */
	/* parameters: */
	/* elm - HtmlElement: the container for the log list (required) */
	setTarget: function(elm) {
		//console.info('$p.console.setTarget(',elm,')');
		
		if (elm) {
			/* create a list inside: */
			$p.console._targetStack = [
				elm.appendNew('ul', {
					'class': 'console'
				})];
		}
	},
	
	/* internal log function that is called by the public interface: */
	_log: function(cls, obj) {
		//console.info('$p.console._log(cls="',cls,'", obj="',obj,'")');

		let msg = '';
		if (obj.toHtml) {
			msg = obj.toHtml();
		} else if (typeof obj == 'object') {
			msg = JSON.stringify(obj);
		} else {
			msg = obj;
		}
		
		// find the target element:
		trg = null;
		if ($p.console._targetStack.length > 0) {
			trg = $p.console._targetStack[$p.console._targetStack.length-1];
		}
		
		if (trg) {
			const li = trg.appendNew('li', {'class': cls});
			if (typeof msg == 'object') {
				li.appendChild(msg);
			} else {
				li.setText(msg);
			}
		} else {
			switch(cls) {
				case 'info':
					console.info(obj);
					break;
				case 'warn':
					console.warn(obj);
					break;
				case 'error':
					console.error(obj);
					break;
				default:
					console.log(obj);
			}
		}
	}, 
	
	log: function(msg) {
		$p.console._log('log', msg);
	}, 
	
	info: function(msg) {
		$p.console._log('info', msg);
	},
	warn: function(msg) {
		$p.console._log('warn', msg);
	},
	error: function(msg) {
		$p.console._log('error', msg);
	},
	
	group: function(msg = '', open = true) {
	
		// find the target element:
		trg = null;
		if ($p.console._targetStack.length > 0) {
			trg = $p.console._targetStack[$p.console._targetStack.length-1];
		}
	
		if (trg) {
			const det = trg.appendNew('details');
			if (open) {
				det.setAttribute('open', '');
			}
			det.appendNew('summary').setText(msg);
			const ul = det.appendNew('ul', {
				'class': 'sub'
			});
			
			trg.appendChild(det);
			$p.console._targetStack.push(ul);
		} else {
			console.group(msg);
		}
	},
	
	groupEnd: function() {
		if ($p.console._targetStack.length > 1) {
			$p.console._targetStack.pop();
		} else {
			console.groupEnd();
		}

	}
}