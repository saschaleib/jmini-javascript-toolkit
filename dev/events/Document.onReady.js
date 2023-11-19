/* Attaches a listener for the "DOMContentLoaded" event to the document */
/* parameter: (Function, required) the callback function */
/* parent object: Element ( */
/* returns: HTMLDocument (passes through the parent element) */
document.onReady = function(cb) {
	document.addEventListener('DOMContentLoaded', cb);
	return document;
}