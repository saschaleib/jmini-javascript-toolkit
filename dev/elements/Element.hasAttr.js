/* Checks if an attribute exists for an element */
/* parameter: name (String) the name of the attribute, */
/* parent object: Element */
/* returns: Boolean */
/* Support: DOM Level 1 (1998) */
HTMLElement.prototype.hasAttr = function(n) {
	return this.hasAttribute(n);
}
