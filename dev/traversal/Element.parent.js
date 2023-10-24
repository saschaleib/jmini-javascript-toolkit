/* Returns the parent of the HTMLElement */
/* parent object: HTMLElement */
/* returns: HTMLElement (or null) */
/* Support: DOM Level 3 (2004) */
HTMLElement.prototype.parent = function() {
	return this.parentElement;
}