/* appends a child element to the passed. Uses chaining to pass the object reference */
/* parameter: (required) child element/node */
/* parent object: HTMLElement*/
/* returns: the (modified) parent object */
/* Support: DOM Level 1 (1998) */
HTMLElement.prototype.append = function(e) {
	this.appendChild(e);
	return this;
}