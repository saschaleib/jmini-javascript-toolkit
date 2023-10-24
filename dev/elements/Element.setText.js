/* Sets the text content of an element */
/* parameter: (required) text to set */
/* parent object: HTMLElement */
/* returns: the (modified) parent object */
/* Support: DOM Level 1 (1998) */
HTMLElement.prototype.setText = function(txt) {
	this.textContent = txt.toString();
	return this;
}