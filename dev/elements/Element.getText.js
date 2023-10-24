/* Sets or gets the text content of an element */
/* parent object: Element */
/* returns: the text content as String */
/* Support: DOM Level 1 (1998) */
HTMLElement.prototype.getText = function() {
	return this.textContent;
}