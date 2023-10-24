/* appends a new child element to the parent. */
/* parameter: (String, required) name of the new child element */
/* parent object: HTMLElement */
/* returns: the (modified) parent object */
/* Support: DOM Level 1 (1998) */
HTMLElement.prototype.new = function(n, cb) {
	var r = null;
	try {
		r = document.createElement(n);
		this.appendChild(r);
	} catch(e) {
		console.error(e);
	}
	return r;
}