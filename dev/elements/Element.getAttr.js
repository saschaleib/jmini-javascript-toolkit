/* Gets attribute value from an element */
/* parameter: name (String) the name of the attribute, */
/* parent object: Element */
/* returns: the value of the attribute (String) */
/* Support: DOM Level 1 (1998) */
HTMLElement.prototype.getAttr = function(n) {
	let a = this.getAttribute(n);
	return ( a ? a : '');
}
