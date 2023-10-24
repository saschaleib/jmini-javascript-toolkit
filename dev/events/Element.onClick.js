/* Attaches a listener for the "click" event to an Element */
/* parameter: (Function, required) the callback function */
/* parent object: Element */
/* returns: Element (passes through the parent element) */
Element.prototype.onClick = function(cb) {
	this.addEventListener('click', cb);
	return this;
}