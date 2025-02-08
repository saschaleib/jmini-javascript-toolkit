/* Loads a JSON file over the network */
/* parent object: JSON */
/* parameter: url (String) the address where to load the file from (required) */
/* parameter: opt (Object) fetch parameters */
/* returns: Promise */
/* Support: Widely supported since ca. 2014 */
JSON.load = async function(url, opt) {
	console.info('JSON.load("'+url+'",',opt,')');
	
	return fetch(url, opt)
	.then( rp => {
		if (!rp.ok) {
			throw new Error(`HTTP ${rp.status}: ${rp.statusText} – “${url}”.`);
		};

		return rp.json()
	});
}