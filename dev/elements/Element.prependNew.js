/* prepends a new child HTMLElement to the parent. */
/* parent object: HTMLElement */
/* parameter: name (String, required) name of the new child element */
/* parameter: att (Object, optional) name of the new child element */
/* returns: the (modified) parent object */
/* Requires: HTMLElement.new (static) */
HTMLElement.prototype.prependNew = function(n, att = undefined) {
	var e = null;
	try {
		e = HTMLElement.new(n, att);
		this.prepend(e);
	} catch(e) {
		console.error(e);
	}
	return e;
}