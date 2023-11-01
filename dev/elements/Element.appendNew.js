/* appends a new child HTMLElement to the parent. */
/* parameter: (String, required) name of the new child element */
/* parent object: HTMLElement */
/* returns: the (modified) parent object */
/* Support: DOM Level 1 (1998) */
HTMLElement.prototype.appendNew = function(n, cb) {
	var o = null;
	try {
		o = document.createElement(n);
		this.appendChild(o);
	} catch(e) {
		console.error(e);
	}
	return o;
}