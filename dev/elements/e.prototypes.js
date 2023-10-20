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

/* appends a child element to the passed. Uses chaining to pass the object reference */
/* parameter: (required) child element/node */
/* parent object: Element */
/* returns: the (modified) parent object */
/* Support: DOM Level 1 (1998) */
Element.prototype.append = function(e) {
	this.appendChild(e);
	return this;
}

/* Gets or sets an attribute from an element */
/* parameter: name (String) the name of the attribute, */
/* parameter: value (String, optional) the value for the attribute */
/* parent object: Element */
/* returns: the value of the attribute (String) if no value is set, */
/* returns: the parent element (Object) if value is set */
/* Support: DOM Level 1 (1998) */
Element.prototype.attr = function(n, v = null) {
	if (v) {
		this.setAttribute(n, v);
		return this;
	} else {
		return this.getAttribute(n);
	}
}
