/* Attaches an event listener that will only be called once to an HTMLElement */
/* parameter: (String, required) name of the event to listen to */
/* parameter: (Function, required) the callback function */
/* parent object: HTMLElement */
/* returns: nothing */
HTMLElement.prototype.once = function(n, cb) {
	this.addEventListener(n, cb, {once: true});
	return this;
}