/* PROTOTYPE OVERRIDES */
/* (ouside of namespace) */

/* Sets or gets the text content of an element */
/* parameter: (optional) text to set */
/* parent object: Element */
/* returns: the (modified) parent object */
/* Support: DOM Level 1 (1998) */
Element.prototype.text = function(txt = null) {
	if (txt) {
		this.textContent = txt;
		return this;
	} else {
		return this.textContent;
	}
}

/* Gets the html content of an element */
/* parameter: none */
/* parent object: Element */
/* returns: the outer HTML of the element (String) */
Element.prototype.html = function() {
	return this.outerHTML;
}

/* appends a child element to the passed. Uses chaining to pass the object reference */
/* parameter: (required) child element/node */
/* parent object: Element */
/* returns: the (modified) parent object */
/* Support: DOM Level 1 (1998) */
Element.prototype.append = function(e) {
	this.appendChild(e);
	return this;
}
