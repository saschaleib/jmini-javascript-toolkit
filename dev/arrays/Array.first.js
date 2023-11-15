/* returns the first element of an array, or null, if none exists */
/* parent object: Array */
/* returns: any type */
Array.prototype.first = function() {
	if (this.length > 0) {
		return this[0];
	} else {
		return null;
	}
}