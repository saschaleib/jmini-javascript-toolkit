/* prepend a child element to the parent HTMLElement */
/* parameter: (required) the HTMLElement to prepend */
/* parent object: HTMLElement */
/* returns: the (modified) parent object */
/* Support: DOM Level 1 (1998) */
HTMLElement.prototype.prependChild = function(e) {
	this.prepend(e);
	return this;
}