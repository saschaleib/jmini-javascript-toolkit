'use strict';
/* Elements */
Element.prototype.append=function(t){return this.appendChild(t),this};
Element.prototype.attr=function(t,e=null){return e?(this.setAttribute(t,e),this):this.getAttribute(t)};
Element.new=function(e){var n=null;try{n=document.createElement(e)}catch(e){console.error(e)}return n};
Element.prototype.text=function(t=null){return t?(this.textContent=t,this):this.textContent};
Element.prototype.html=function(n=null){if(n){let t=(new DOMParser).parseFromString("<span>"+n+"</span>","application/xml");this.innerHTML=t.documentElement.innerHTML;return this}return this.innerHTML};