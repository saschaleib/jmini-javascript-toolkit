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