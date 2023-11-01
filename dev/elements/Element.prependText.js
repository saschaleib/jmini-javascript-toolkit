/* Prepends a new text node to the beginning of the child nodes list of an element */
/* parameter: (required) text to add */
/* parent object: HTMLElement */
/* returns: the (modified) parent object */
/* Support: DOM Level 1 (1998) */
HTMLElement.prototype.prependText = function(txt) {
	let t = document.createTextNode(txt);
	this.prepend(t);
	return this;
}