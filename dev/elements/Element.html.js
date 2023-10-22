/* Sets or gets the html content of an element */
/* parameter: (optional) html to set */
/* parent object: Element */
/* returns: the (modified) parent object */
/* Support: DOM Level 1 (1998) */
Element.prototype.html = function(xhtml = null) {
	if (xhtml) {
		let parser = new DOMParser();
		let doc = parser.parseFromString('<div>' + xhtml + '</div>', 'application/xml');
		this.innerHTML = doc.documentElement.innerHTML;
		return this;
	} else {
		return this.innerHTML;
	}
}