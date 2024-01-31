/* Loads an HTML document into an existing element */
/* parameter: url (String) the address of the document to load */
/* parent object: Element */
/* returns: void */
/* Support: DOM Level 1 (1998) */
HTMLElement.prototype.load = async function(url, opt = undefined ) {
	//console.group('HTMLElement.load("' + url + '")');
	const rp = await fetch(url, opt);
	const html = await rp.text();
	this.innerHTML = html;
	return this;
}
