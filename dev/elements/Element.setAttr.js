/* Sets an attribute value for an element */
/* parameter: name (String) the name of the attribute, */
/* parameter: value (String) the value for the attribute */
/* parent object: Element */
/* returns: the parent element (Object) */
/* Support: DOM Level 1 (1998) */
HTMLElement.prototype.setAttr = function(n, v) {
	this.setAttribute(n, v);
	return this;
}
