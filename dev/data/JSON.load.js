/* Loads a JSON file over the network */
/* parent object: JSON */
/* parameter: url (String) the address where to load the file from (required) */
/* parameter: cb (Function) a function to be called when the load is successful, */
/* parameter: error (Function) a function to be called when the load has failed. */
/* returns: void */
/* Support: Widely supported since ca. 2010 */
JSON.load = async function(url, cb, error = undefined) {
	console.info('JSON.load("'+url+'", cb, error)');
	
	try {
		// try to establich the connection:
		const rp = await fetch(url);
		if (!rp.ok) {
			if (error) {
				error(rp.status, rp.statusText, url);
			} else {
				console.error(`HTTP Error: “${rp.statusText}” (${rp.status}) when trying to fetch “${url}”.`);
			}
			return;
		}
		
		// fetch the actual json data and pass it to the callback function:
		cb(await rp.json());
		
	} catch(err) {
		if (error) {
			error(999, err, url);
		} else {
			console.error(err);
		}
	}
	
}
