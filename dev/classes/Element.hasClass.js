/* Returns true, if the parent HTMLElement has a class of the specified name */
/* parameter: (String, required) name of the class */
/* parent object: HTMLElement */
/* returns: Boolean */
HTMLElement.prototype.hasClass = function(n) {
	return this.classList.contains(n);
}