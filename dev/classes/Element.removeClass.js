/* Removes a class from the parent HTMLElement */
/* parameter: (String, required) name of the class */
/* parent object: HTMLElement */
/* returns: HTMLElement */
HTMLElement.prototype.removeClass = function(n) {
	this.classList.remove(n);
	return this;
}