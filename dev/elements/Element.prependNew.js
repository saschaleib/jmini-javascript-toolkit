/* prepends a new child HTMLElement to the parent. */
/* parameter: (String, required) name of the new child element */
/* parent object: HTMLElement */
/* returns: the (modified) parent object */
/* Support: DOM Level 1 (1998) */
HTMLElement.prototype.prependNew = function(n, cb) {
	var o = null;
	try {
		o = document.createElement(n);
		this.prepend(o);
	} catch(e) {
		console.error(e);
	}
	return o;
}