/* creates a new Element */
/* parameter: name (String) the name of the element, */
/* parent object: Element */
/* returns: the value of the attribute (String) if no value is set, */
/* returns: the parent element (Object) if value is set */
/* Support: DOM Level 1 (1998) */
HTMLElement.new = function(n) {
	var r = null;
	try {
		r = document.createElement(n);
	} catch(e) {
		console.error(e);
	}
	return r;
}
