/* Attaches an event listener to an HTMLElement */
/* parameter: (String, required) name of the event to listen to */
/* parameter: (Function, required) the callback function */
/* parent object: HTMLElement */
/* returns: nothing */
HTMLElement.prototype.off = function(n, cb) {
	this.removeEventListener(n, cb);
	return this;
}