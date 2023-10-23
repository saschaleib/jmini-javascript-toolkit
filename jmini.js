'use strict'
/* Elements */
Element.new=function(e){var n=null;try{n=document.createElement(e)}catch(e){console.error(e)}return n};
Element.prototype.append=function(t){return"string"==typeof t?this.html(t):"object"==typeof t&&this.appendChild(t),this};
Element.prototype.attr=function(t,e=null){return e?(this.setAttribute(t,e),this):this.getAttribute(t)};
Element.prototype.html=function(n=null){if(n){let t=(new DOMParser).parseFromString("<html>"+n+"</html>","application/xml");this.innerHTML=t.documentElement.outerHTML;return this}return this.innerHTML};
Element.prototype.text=function(t=void 0){return t?(this.textContent=t.toString(),this):this.textContent};
/* Events */
Element.prototype.on=function(n,cb){this.addEventListener(n,cb);return this;}
Element.prototype.once=function(n,cb){this.addEventListener(n,cb,{once:true});return this;}
Element.prototype.off=function(n,cb){this.removeEventListener(n,cb);return this;}
Element.prototype.onBlur=function(t){return this.addEventListener("blur",t),this};
Element.prototype.click=function(cb) {this.addEventListener('click',cb);return this;}
Element.prototype.onFocus=function(t){return this.addEventListener("focus",t),this};
Element.prototype.onSubmit=function(t){if(console.log(this),"form"!==this.localName)throw new Error("the .onSubmit function can only be applied to <form> elements.");return this.addEventListener("submit",t),this};
/* Numbers */
Number.prototype.toBytesString=function(i=2,t="en-US"){for(units=["Bytes","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB","???"],n2=Math.floor(this),p=0;n2>980&&p<units.length;)n2/=1024,p+=1;return new Intl.NumberFormat(t,{maximumSignificantDigits:i}).format(n2)+" "+units[p]};
