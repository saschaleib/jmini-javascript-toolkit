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