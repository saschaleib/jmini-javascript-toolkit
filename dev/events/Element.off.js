/* Attaches an event listener to an Element */
/* parameter: (String, required) name of the event to listen to */
/* parameter: (Function, required) the callback function */
/* parent object: Element */
/* returns: nothing */
Element.prototype.off = function(n, cb) {
	this.removeEventListener(n, cb);
	return this;
}