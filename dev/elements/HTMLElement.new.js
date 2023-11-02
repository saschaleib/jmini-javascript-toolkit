/* creates a new Element */
/* parent object: Element */
/* parameter: name (String) the name of the element (required) */
/* parameter: attr (Object) a list of attributes to be added, */
/* returns: the newly created HTMLElement */
/* Support: DOM Level 1 (1998) */
HTMLElement.new = function(name, atlist = undefined) {
	var r = null;
	try {
		r = document.createElement(name);
		if (atlist) {
			for (let attr in atlist) {
				r.setAttribute(attr, atlist[attr]);
			}
		}
	} catch(e) {
		console.error(e);
	}
	return r;
}
