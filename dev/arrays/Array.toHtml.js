/* Converts an array into a Html structure */
/* parent object: Array */
/* parameters: */
/*  - atlist: Attributes list (object), optional
/* returns: HtmlElement (including sub-elements) */
Array.prototype.toHtml = function(atlist = undefined) {
	
	/* create the table header: */
	const thead = HTMLElement.new('thead');
	const thr = thead.appendNew('tr');
	thr.appendNew('th').setText('#');
	thr.appendNew('th').setText('Value');
	
	/* create the body: */
	const tbody = HTMLElement.new('tbody');

	this.forEach(function (rval, i) {
		let tr = tbody.appendNew('tr');
		tr.appendNew('th').setText(i);
		tr.appendNew('td', {
			"class": (typeof rval)
		}).setText(JSON.stringify(rval));
	});
	
	/* combine header and body to table: */
	const table = HTMLElement.new('table', atlist);
	table.appendChild(thead);
	table.appendChild(tbody);
	
	return table;
}