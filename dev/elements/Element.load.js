/* Loads an HTML document into an existing element */
/* parameter: url (String) the address of the document to load */
/* parent object: Element */
/* returns: void */
/* Support: DOM Level 1 (1998) */
HTMLElement.prototype.load = async function(url, opt = undefined ) {
	//console.info('HTMLElement.load("' + url + '")');

	return fetch(url, opt)
	.then( rp => {
		if (!rp.ok) {
			throw new Error('HTTP Status ' + rp.status + ' – ' + rp.statusText);
		};
		
		return rp.text()
		.then( html => {
			this.innerHTML = html;
			return html;
		})
	});
}
