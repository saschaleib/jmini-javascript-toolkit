/* Formats an integer number to a String containing the correct Bytes multiplier (e.g. 1.2 GiB) */
/* parameter: (Number, optional) number of digits (default = 2) */
/* parameter: (String, optional) the locale format to use (default = 'en') */
/* parameter: (Object, optional) options for the International number format (default = null) */
/* parameter: (Object, optional) overrides for specific values (default = undefined) */
/* parent object: Number */
/* returns: the (modified) parent object */
/* Support: DOM Level 1 (1998) */
Number.prototype.toBytesString = function(d = 2, l = 'en-US', o = undefined) {

	let u = ['Bytes','KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB','???'];
	var m = Math.floor(this);

	/* check first if there is an override value */
	if (o && o[m]) {
		return o[m];
		
	} else {

		var p = 0;
		while (m > 980 && p < u.length) {
			m = m/1024;
			p += 1;
		}
		let f = new Intl.NumberFormat(l, {
			maximumSignificantDigits: d
		});

		return f.format(m) + '\u202F' + u[p];
	}
}