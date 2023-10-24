/* Attaches a listener for the "focus" event to an Element */
/* parameter: (Function, required) the callback function */
/* parent object: Element */
/* returns: Element (passes through the parent element) */
HTMLElement.prototype.onFocus = function(cb) {
	this.addEventListener('focus', cb);
	return this;
}