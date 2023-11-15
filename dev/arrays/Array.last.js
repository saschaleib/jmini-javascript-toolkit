/* returns the last element of an array, or null, if none exists */
/* parent object: Array */
/* returns: any type */
Array.prototype.last = function() {
	if (this.length > 0) {
		return this[this.length-1];
	} else {
		return null;
	}
}