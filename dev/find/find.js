'use strict'; // Encoding: UTF-8
/**
 * jMini Library Test - Find functions
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
	
	/* find functions */
	find: {

		/* find element by tag name */
		/* parameter: (required) name of the element(s) to find */
		/* returns: HTMLCollection of the found element(s) */
		/* note: the returned HTMLCollection may be empty if no elements were found. */
		/* Support: DOM Level 1 (1998) */
		tags: function(n) {
			return document.getElementsByTagName(n);
		},
		
		/* find element by ID */
		/* parameter: (required) id of the element to find */
		/* returns: object reference of one (!) found element, or null if nothing found */
		/* note: duplicate element IDs should never exist in an HTML document,
			but if they do, this function always returns the first item. */
		/* Support: DOM Level 2 (2001) */
		id: function(id) {
			return document.getElementById(id);
		},
		
		/* find element by class */
		/* parameter: (required) name of the class to find */
		/* returns: HTMLCollection of the found element(s) */
		/* note: the returned HTMLCollection may be empty if no matching elements were found. */
		/* Support: DOM Level 1 (1998) */
		class: function(n) {
			return document.getElementsByClassName(n);
		},

		/* find the first element that matches a query selector */
		/* parameter: (required) the CSS query of the element(s) to find */
		/* parameter: (optional) find all occurrences (true, default), or only the first (false)
		/* returns: HTMLCollection of the found element(s) */
		/* note: the returned HTMLCollection may be empty if no elements were found. */
		/* Support: DOM Level 3 (2004) */
		q: function(sel, all = true) {
			var r = null;
			try {
				r = ( all ? document.querySelectorAll(sel) : document.querySelector(sel) );
			} catch(e) {
				$M.dbg.err(e);
			}
			return r;
		}
	},

	/* debug functions */
	dbg: {
		/* write an error to the console */
		err: function(msg) {
			console.error(msg);
		}
	}
}
