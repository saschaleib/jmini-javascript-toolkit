'use strict';
/* Elements */
Element.new=function(e){var n=null;try{n=document.createElement(e)}catch(e){console.error(e)}return n};
Element.prototype.append=function(t){return"string"==typeof t?this.html(t):"object"==typeof t&&this.appendChild(t),this};
Element.prototype.attr=function(t,e=null){return e?(this.setAttribute(t,e),this):this.getAttribute(t)};
Element.prototype.html=function(n=null){if(n){let t=(new DOMParser).parseFromString("<html>"+n+"</html>","application/xml");this.innerHTML=t.documentElement.outerHTML;return this}return this.innerHTML};
Element.prototype.text=function(t=null){return t?(this.textContent=t,this):this.textContent};
/* Events */
Element.prototype.on=function(n,cb){this.addEventListener(n,cb);return this;}
Element.prototype.click=function(c) {this.addEventListener('click',c);return this;}
Element.prototype.off=function(n,cb){this.removeEventListener(n,cb);return this;}
Element.prototype.once=function(n,cb){this.addEventListener(n,cb,{once:true});return this;}
