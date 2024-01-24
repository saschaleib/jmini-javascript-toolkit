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