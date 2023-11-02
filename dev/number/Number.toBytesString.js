/* Formats an integer number to a String containing the correct Bytes multiplier (e.g. 1.2 GiB) */
/* parameter: (Number, optional) number of digits (default = 2) */
/* parameter: (String, optional) the locale format to use (default = 'en') */
/* parameter: (Object, optional) options for the International number format (default = null) */
/* parent object: Number */
/* returns: the (modified) parent object */
/* Support: DOM Level 1 (1998) */
Number.prototype.toBytesString = function(digits = 2, loc = 'en-US') {

	units = ['Bytes','KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB','???'];
	n2 = Math.floor(this);

	p = 0;
	while (n2 > 980 && p < units.length) {
		n2 = n2/1024;
		p += 1;
	}
	let f = new Intl.NumberFormat(loc, {
		maximumSignificantDigits: digits
	});

	return f.format(n2) + '\u202F' + units[p];
}