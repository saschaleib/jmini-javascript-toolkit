/* appends a child element to the passed. Uses chaining to pass the object reference */
/* parameter: (required) child element/node, or an XHTML string to create new nodes */
/* parent object: Element*/
/* returns: the (modified) parent object */
/* Support: DOM Level 1 (1998) */
Element.prototype.append = function(e) {
	if (typeof e === "string") {
		this.html(e);
	} else if (typeof e === "object") {
		this.appendChild(e);
	}
	return this;
}