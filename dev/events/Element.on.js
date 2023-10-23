/* Attaches an event listener to an Element */
/* parameter: (String, required) name of the event to listen to */
/* parameter: (Function, required) the callback function */
/* parent object: Element */
Element.prototype.on = function(n, cb) {
	this.addEventListener(n, cb);
	return this;
}