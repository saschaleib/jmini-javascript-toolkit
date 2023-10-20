/* PROTOTYPE OVERRIDES */
/* (ouside of namespace) */

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
