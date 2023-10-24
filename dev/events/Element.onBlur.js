/* Attaches a listener for the "blur" event to an Element */
/* parameter: (Function, required) the callback function */
/* parent object: Element */
/* returns: Element (passes through the parent element) */
HTMLElement.prototype.onBlur = function(cb) {
	this.addEventListener('blur', cb);
	return this;
}