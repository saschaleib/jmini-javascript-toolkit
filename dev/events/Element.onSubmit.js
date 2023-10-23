/* Attaches a listener for the "focus" event to an Element */
/* parameter: (Function, required) the callback function */
/* parent object: Element */
/* returns: Element (passes through the parent element) */
Element.prototype.onSubmit = function(cb) {
	console.log(this);
	if(this.localName !== 'form') {
		throw new Error("the .onSubmit function can only be applied to <form> elements.");
	} else {
		this.addEventListener('submit', cb);
		return this;
	}
}