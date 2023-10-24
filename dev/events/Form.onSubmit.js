/* Attaches a listener for the "focus" event to a <form> Element */
/* parameter: (Function, required) the callback function */
/* parent object: HTMLElement (form only) */
/* returns: HTMLElement (passes through the parent element) */
HTMLFormElement.prototype.onSubmit = function(cb) {
	this.addEventListener('submit', cb);
	return this;
}