/* Sets or gets the text content of an element */
/* parameter: (optional) text to set */
/* parent object: Element */
/* returns: the (modified) parent object */
/* Support: DOM Level 1 (1998) */
Element.prototype.text = function(txt = undefined) {
	if (txt) {
		this.textContent = txt.toString();
		return this;
	} else {
		return this.textContent;
	}
}