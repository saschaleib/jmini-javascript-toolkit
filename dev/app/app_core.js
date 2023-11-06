/* Web application core */
/* This is the required core for a web app in jMini */
let $app = {

	/* shadow init function */
	_init: function() {
		console.info('$app._init()');
		
		/* call user init, if it exists: */
		if ($app.init) $app.init;
		
		/* call sub-sections, as they were added: */
		Object.keys($app).forEach( (key,index) => {
			let sub = $app[key];
			if (typeof sub === 'object' && sub._init) {
				sub._init();
			}
		});
	}
}
document.addEventListener("DOMContentLoaded", (e) => {
	$app._init(e);
});