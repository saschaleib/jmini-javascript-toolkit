/* page console */
/* enables an in-page console as an alternative to the browser console
/* Authors:
    - Sascha Leib <ad@hominem.info>
 */
/* This project is licensed under the terms of the MIT license. */
$p.console = {

	/* shadow init function */
	_init: function(p) {
		//console.info('$p.console._init()');
		//console.log('this=', this);
		//console.log('parent=', p);
		
		/* call sub-sections' pre-inits, if any are added: */
		$p._callInit(this, true);
	
	},
	
	// reference to the list object where to add items:
	_targetStack: [],
	
	/* set and prepare the target element for console logging */
	/* parameters: */
	/* elm - HtmlElement: the container for the log list (required) */
	setTarget: function(elm) {
		//console.info('$p.console.setTarget(',elm,')');
		
		if (elm) {
			/* create a list inside: */
			$p.console._targetStack = [
				elm.appendNew('ul', {
					'class': 'console'
				})];
		}
	},
	
	/* internal log function that is called by the public interface: */
	_log: function(cls, obj) {
		//console.info('$p.console._log(cls="',cls,'", obj="',obj,'")');

		let msg = '';
		if (obj.toHtml) {
			msg = obj.toHtml();
		} else if (typeof obj == 'object') {
			msg = JSON.stringify(obj);
		} else {
			msg = obj;
		}
		
		// find the target element:
		let trg = null;
		if ($p.console._targetStack.length > 0) {
			trg = $p.console._targetStack[$p.console._targetStack.length-1];
		}
		
		if (trg) {
			const li = trg.appendNew('li', {'class': cls});
			if (typeof msg == 'object') {
				li.appendChild(msg);
			} else {
				li.setText(msg);
			}
		} else {
			switch(cls) {
				case 'info':
					console.info(obj);
					break;
				case 'warn':
					console.warn(obj);
					break;
				case 'error':
					console.error(obj);
					break;
				default:
					console.log(obj);
			}
		}
	}, 
	
	log: function(msg) {
		$p.console._log('log', msg);
	}, 
	
	info: function(msg) {
		$p.console._log('info', msg);
	},
	warn: function(msg) {
		$p.console._log('warn', msg);
	},
	error: function(msg) {
		$p.console._log('error', msg);
	},
	
	group: function(msg = '', open = true) {
	
		// find the target element:
		trg = null;
		if ($p.console._targetStack.length > 0) {
			trg = $p.console._targetStack[$p.console._targetStack.length-1];
		}
	
		if (trg) {
			const det = trg.appendNew('details');
			if (open) {
				det.setAttribute('open', '');
			}
			det.appendNew('summary').setText(msg);
			const ul = det.appendNew('ul', {
				'class': 'sub'
			});
			
			trg.appendChild(det);
			$p.console._targetStack.push(ul);
		} else {
			console.group(msg);
		}
	},
	
	groupEnd: function() {
		if ($p.console._targetStack.length > 1) {
			$p.console._targetStack.pop();
		} else {
			console.groupEnd();
		}

	}


}