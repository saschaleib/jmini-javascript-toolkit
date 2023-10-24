/* Adds a class to the parent HTMLElement */
/* parameter: (String, required) name of the class */
/* parent object: HTMLElement */
/* returns: HTMLElement */
HTMLElement.prototype.addClass = function(n) {
	this.classList.add(n);
	return this;
}