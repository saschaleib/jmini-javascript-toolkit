/* returns a list of direct (!) children of an element (optionally filtered by a callback function */
/* parameter: callback (function, optional), check each element if it should be added */
/* parent object: Element */
/* returns: Array of HTMLElements */

HTMLElement.prototype.getChildren = function(cb = undefined) {

       let r = [];

       if (this.hasChildNodes()) {

             let children = this.childNodes;
             for (const n of children) {
                    if ( n.nodeType === Node.ELEMENT_NODE && ( !cb || cb(n) ) ) {
                          r.push(n);
                    }
             }
       }

       return r;
}