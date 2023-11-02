/* Gets the html content of an element */
/* parameter: (optional) html to set */
/* parent object: Element */
/* returns: the inner HTML as String */
HTMLElement.prototype.getHtml = function(xhtml = null) {
	return this.innerHTML;
}