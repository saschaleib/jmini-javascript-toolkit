/* appends a child element to the passed. Uses chaining to pass the object reference */
/* parameter: (required) child element/node */
/* parent object: Element */
/* returns: the (modified) parent object */
/* Support: DOM Level 1 (1998) */
Element.prototype.append = function(e) {
	this.appendChild(e);
	return this;
}