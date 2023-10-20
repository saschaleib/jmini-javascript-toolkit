'use strict'; // Encoding: UTF-8
/**
 * jMini Library Test - Elements functions
 *
 * @link     https://github.com/saschaleib/jMini
 * @author   Sascha Leib <ad@hominem.info>
 * @license  GPL 3 (http://www.gnu.org/licenses/gpl.html)
 *
 * Note: use https://jscompress.com/ to compress before publishing
 *
 * @version 0.0.1
 * @date 2023-10-20
 */

let $M = {
	
	/* element functions */
	e: {
		
		/* creates a new element node */
		/* parameter: (required) element name */
		/* returns: the newly created node */
		/* Support: DOM Level 1 (1998) */
		new: function(n) {
			var r = null;
			try {
				r = document.createElement(n);
			} catch(e) {
				$M.dbg.err(e);
			}
			return r;
		},
		
	},

	/* debug functions */
	dbg: {
		/* write an error to the console */
		err: function(msg) {
			console.error(msg);
		}
	}
}