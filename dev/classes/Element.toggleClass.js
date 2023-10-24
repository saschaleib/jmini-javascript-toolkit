/* Toggles a class on the parent HTMLElement */
/* parameter: (String, required) name of the class */
/* parent object: HTMLElement */
/* returns: HTMLElement */
HTMLElement.prototype.toggleClass = function(n) {
	this.classList.toggle(n);
	return this;
}