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