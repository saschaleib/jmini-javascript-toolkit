/* Attaches an event listener to an HTMLElement */
/* parameter: (String, required) name of the event to listen to */
/* parameter: (Function, required) the callback function */
/* parent object: HTMLElement */
HTMLElement.prototype.on = function(n, cb) {
	this.addEventListener(n, cb);
	return this;
}