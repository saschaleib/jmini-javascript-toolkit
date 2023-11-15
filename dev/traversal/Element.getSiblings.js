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