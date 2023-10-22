/* Attaches an event listener that will only be called once to an Element */
/* parameter: (String, required) name of the event to listen to */
/* parameter: (Function, required) the callback function */
/* parent object: Element */
/* returns: nothing */
Element.prototype.once = function(n, cb) {
	this.addEventListener(n, cb, {once: true});
	return this;
}