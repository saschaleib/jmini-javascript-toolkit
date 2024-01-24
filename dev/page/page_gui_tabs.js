/* Page GUI tabbed interface class */
/* Authors:
    - Sascha Leib <ad@hominem.info>
 */
/* This project is licensed under the terms of the MIT license. */
$p.gui.tabs = {

	/* pre-init function */
	_init: function() {
		console.log('$p.gui.tabs._init()');
				
		/* find and add all existing tabs */
		document.querySelectorAll('*[role=tablist]')
			.forEach($p.gui.tabs.add);
	},
	
	/* add a new tab interface: */
	add: function(tablist) {
		console.log('$p.gui.tabs.add()');

		tablist.querySelectorAll('*[role=tab]')
			.forEach( t => t.onClick($p.gui.tabs._onTabClick) )
	},
	
	/* callback for tab click */
	_onTabClick: function(e) {
		console.log('$p.gui.tabs._onTabClick()');
		
		/* reusable constants: */
		const kAriaSelected = 'aria-selected';
		const kAriaControls = 'aria-controls';
		const kTrue = 'true';
		const kFalse = 'false';
		const kHidden = 'hidden';
		
		/* cancel default action */
		e.preventDefault();
		
		/* if the active tab is clicked, do nothing: */
		let selState = this.getAttribute(kAriaSelected);
		if ( selState && selState == kTrue ) {
			return;
		}
		
		/* find the active tab element: */
		var aItem = null;
		let tablist = this.getAncestors( (it) => {
			return ((it.getAttribute ? it.getAttribute('role') : null) == 'tablist');
		}).first();
		if (tablist) {
			let lis = tablist.querySelectorAll('*[role=tab]');
			lis.forEach( (it) => {
				let selected = it.getAttribute(kAriaSelected);
				if ( selected && selected == kTrue ) {
					aItem = it;
				}
			});
		}
		
		/* swap the active states: */
		this.setAttribute(kAriaSelected, kTrue);
		if (aItem) {
			aItem.setAttribute(kAriaSelected, kFalse);
			let aId = aItem.getAttribute(kAriaControls);
			let aObj = document.getElementById(aId);
			if (aObj) aObj.hidden = true;
		}
		
		/* show the new panel: */
		let nId = this.getAttribute(kAriaControls);
		let nObj = document.getElementById(nId);
		if (nObj) nObj.hidden = false;
	}
}