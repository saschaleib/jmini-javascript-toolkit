'use strict'
/* Classes */
HTMLElement.prototype.addClass=function(t){return this.classList.add(t),this};
HTMLElement.prototype.removeClass=function(e){return this.classList.remove(e),this};
HTMLElement.prototype.toggleClass=function(t){return this.classList.toggle(t),this};
HTMLElement.prototype.hasClass=function(s){return this.classList.contains(s)};
/* Elements */
HTMLElement.prototype.append=function(t){return this.appendChild(t),this};
HTMLElement.prototype.attr=function(t,e=void 0){return void 0===e?this.getAttribute(t):(this.setAttribute(t,e),this)};
HTMLElement.prototype.new=function(n){var t=null;try{t=document.createElement(n),this.appendChild(t)}catch(e){console.error(e)}return t};
HTMLElement.prototype.html=function(n=null){if(n){let e=(new DOMParser).parseFromString("<div>"+n+"</div>","application/xml");return this.innerHTML=e.documentElement.innerHTML,this}return this.innerHTML};
HTMLElement.prototype.getText=function(){return this.textContent};
HTMLElement.prototype.setText=function(t){return this.textContent=t.toString(),this};
HTMLElement.new=function(e){var n=null;try{n=document.createElement(e)}catch(e){console.error(e)}return n};
/* Events */
HTMLElement.prototype.on=function(t,e){return this.addEventListener(t,e),this};
HTMLElement.prototype.once=function(e,t){return this.addEventListener(e,t,{once:!0}),this};
HTMLElement.prototype.off=function(e,t){return this.removeEventListener(e,t),this};
HTMLElement.prototype.onBlur=function(t){return this.addEventListener("blur",t),this};
Element.prototype.click=function(cb) {this.addEventListener('click',cb);return this;}
HTMLElement.prototype.onFocus=function(t){return this.addEventListener("focus",t),this};
HTMLFormElement.prototype.onSubmit=function(t){return this.addEventListener("submit",t),this};
/* Numbers */
Number.prototype.toBytesString=function(i=2,t="en-US"){for(units=["Bytes","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB","???"],n2=Math.floor(this),p=0;n2>980&&p<units.length;)n2/=1024,p+=1;return new Intl.NumberFormat(t,{maximumSignificantDigits:i}).format(n2)+" "+units[p]};
