/* removes all child nodes of the element */
/* parent object: HTMLElement */
HTMLElement.prototype.empty = function() {
	while (this.firstChild) {
		this.removeChild(this.lastChild);
	}
}