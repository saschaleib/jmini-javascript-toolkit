'use strict';

/* Copyright 2023 Sascha Leib
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the “Software”), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/* .first */ Array.prototype.first=function(){return this.length>0?this[0]:null};
/* .last */ Array.prototype.last=function(){return this.length>0?this[this.length-1]:null};
/* .addClass */ HTMLElement.prototype.addClass=function(t){return this.classList.add(t),this};
/* .removeClass */ HTMLElement.prototype.removeClass=function(e){return this.classList.remove(e),this};
/* .toggleClass */ HTMLElement.prototype.toggleClass=function(t){return this.classList.toggle(t),this};
/* .hasClass */ HTMLElement.prototype.hasClass=function(s){return this.classList.contains(s)};
/* HTMLElement.new */ HTMLElement.new=function(e,t=void 0){var n=null;try{if(n=document.createElement(e),t)for(let e in t)n.setAttribute(e,t[e])}catch(e){console.error(e)}return n};
/* .getAttr */ HTMLElement.prototype.getAttr=function(t){let e=this.getAttribute(t);return e||""};
/* .setAttr */ HTMLElement.prototype.setAttr=function(t,e){return this.setAttribute(t,e),this};
/* .appendText */ HTMLElement.prototype.appendText=function(e){let t=document.createTextNode(e);return this.append(t),this};
/* .prependText */ HTMLElement.prototype.prependText=function(e){return this.prepend(document.createTextNode(e)),this};
/* .getText */ HTMLElement.prototype.getText=function(){return this.textContent};
/* .setText */ HTMLElement.prototype.setText=function(t){return this.textContent=t.toString(),this};
/* .appendNew */ HTMLElement.prototype.appendNew=function(e,n=void 0){var t=null;try{t=HTMLElement.new(e,n),this.appendChild(t)}catch(t){console.error(t)}return t};
/* .prependNew */ HTMLElement.prototype.prependNew=function(e,n=void 0){var r=null;try{r=HTMLElement.new(e,n),this.prepend(r)}catch(r){console.error(r)}return r};
/* .setHtml */ HTMLElement.prototype.setHtml=function(e){let t=(new DOMParser).parseFromString("<div>"+e+"</div>","application/xml");return this.innerHTML=t.documentElement.innerHTML,this};
/* .getHtml */ HTMLElement.prototype.getHtml=function(t=null){return this.innerHTML};
/* .empty */ HTMLElement.prototype.empty=function(){for(;this.firstChild;)this.removeChild(this.lastChild)};
/* .on */ HTMLElement.prototype.on=function(t,e){return this.addEventListener(t,e),this};
/* .once */ HTMLElement.prototype.once=function(e,t){return this.addEventListener(e,t,{once:!0}),this};
/* .off */ HTMLElement.prototype.off=function(e,t){return this.removeEventListener(e,t),this};
/* .onBlur */ HTMLElement.prototype.onBlur=function(t){return this.addEventListener("blur",t),this};
/* .onClick */ HTMLElement.prototype.onClick=function(t){return this.addEventListener("click",t),this};
/* .onFocus */ HTMLElement.prototype.onFocus=function(t){return this.addEventListener("focus",t),this};
/* .onSubmit */ HTMLFormElement.prototype.onSubmit=function(t){return this.addEventListener("submit",t),this};
/* .onReady */ document.onReady=function(n){return document.addEventListener('DOMContentLoaded',n),document};
/* .toBytesString */ Number.prototype.toBytesString=function(i=2,t="en-US"){let r=["Bytes","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB","???"],e=Math.floor(this);for(var n=0;e>980&&n<r.length;)e/=1024,n+=1;return new Intl.NumberFormat(t,{maximumSignificantDigits:i}).format(e)+" "+r[n]};
/* .getAncestors */ HTMLElement.prototype.getAncestors=function(e=void 0){let t=[];for(var o=this.parentNode;o;)e&&!e(o)||t.push(o),o=o.parentNode;return t};
/* .getSiblings */ HTMLElement.prototype.getSiblings=function(e=void 0){let t=[];if(this.parentNode)for(var i=this.parentNode.firstChild;i;)i!==this&&i.nodeType===Node.ELEMENT_NODE&&(e&&!e(i)||t.push(i)),i=i.nextSibling;return t};
/* $p (page) */ let $p={_init:function(){console.info("$p._init()"),Object.keys($p).forEach(((i,t)=>{let n=$p[i];"object"==typeof n&&n._init&&n._init()})),$p.init&&$p.init()}};document.onReady($p._init);
/* $p.gui (GUI) */ $p.gui={_init:function(){Object.keys($p.gui).forEach((i=>{let t=$p.gui[i];"object"==typeof t&&t._init&&t._init()}))}};
/* $p.gui.tabs */ $p.gui.tabs={_init:function(){document.querySelectorAll("*[role=tablist]").forEach($p.gui.tabs.add)},add:function(t){t.querySelectorAll("*[role=tab]").forEach((t=>t.onClick($p.gui.tabs._onTabClick)))},_onTabClick:function(t){const e="aria-selected",i="aria-controls",l="true";t.preventDefault();let r=this.getAttribute(e);if(r&&r==l)return;var u=null;let n=this.getAncestors((t=>"tablist"==(t.getAttribute?t.getAttribute("role"):null))).first();if(n){n.querySelectorAll("*[role=tab]").forEach((t=>{let i=t.getAttribute(e);i&&i==l&&(u=t)}))}if(this.setAttribute(e,l),u){u.setAttribute(e,"false");let t=u.getAttribute(i),l=document.getElementById(t);l&&(l.hidden=!0)}let o=this.getAttribute(i),a=document.getElementById(o);a&&(a.hidden=!1)}};