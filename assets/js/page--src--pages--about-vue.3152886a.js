(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{VAqx:function(t,e,n){},WpOP:function(t,e,n){"use strict";var a,r=n("G0B5"),s=(a=function(t,e){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}a(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=function(t,e,n,a){var r,s=arguments.length,o=s<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,a);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(o=(s<3?r(o):s>3?r(e,n,o):r(e,n))||o);return s>3&&o&&Object.defineProperty(e,n,o),o},i=function(t,e,n,a){return new(n||(n=Promise))((function(r,s){function o(t){try{l(a.next(t))}catch(t){s(t)}}function i(t){try{l(a.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,i)}l((a=a.apply(t,e||[])).next())}))},l=function(t,e){var n,a,r,s,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return s={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function i(s){return function(i){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,a&&(r=2&s[0]?a.return:s[0]?a.throw||((r=a.return)&&r.call(a),0):a.next)&&!(r=r.call(a,s[1])).done)return r;switch(a=0,r&&(s=[2&s[0],r.value]),s[0]){case 0:case 1:r=s;break;case 4:return o.label++,{value:s[1],done:!1};case 5:o.label++,a=s[1],s=[0];continue;case 7:s=o.ops.pop(),o.trys.pop();continue;default:if(!(r=o.trys,(r=r.length>0&&r[r.length-1])||6!==s[0]&&2!==s[0])){o=0;continue}if(3===s[0]&&(!r||s[1]>r[0]&&s[1]<r[3])){o.label=s[1];break}if(6===s[0]&&o.label<r[1]){o.label=r[1],r=s;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(s);break}r[2]&&o.ops.pop(),o.trys.pop();continue}s=e.call(t,o)}catch(t){s=[6,t],a=0}finally{n=r=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,i])}}},c=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.action="https://formcarry.com/s/p4I9mQz2DRQv",e.fallback_email="developer@lights0123.com",e.email="",e.name="",e.message="",e.status="",e.changed=!1,e}return s(e,t),e.prototype.onChange=function(){this.changed||(this.changed=!0,window._paq.push(["trackEvent","Contact","Touch"]))},e.prototype.submit=function(){return i(this,void 0,void 0,(function(){return l(this,(function(t){switch(t.label){case 0:this.status="submit",t.label=1;case 1:return t.trys.push([1,3,,4]),[4,fetch(this.action,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({email:this.email,name:this.name,message:this.message})})];case 2:if(!t.sent().ok)throw new Error("err");return this.email="",this.name="",this.message="",this.status="success",window._paq.push(["trackEvent","Contact","Submit"]),[3,4];case 3:return t.sent(),this.status="fail",[3,4];case 4:return[2]}}))}))},o([Object(r.e)("email"),Object(r.e)("name"),Object(r.e)("message")],e.prototype,"onChange",null),e=o([r.a],e)}(r.d),u=(n("iLfF"),n("KHd+")),p=Object(u.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("form",{attrs:{action:t.action,method:"POST","accept-charset":"UTF-8"},on:{submit:function(e){return e.preventDefault(),t.submit.apply(null,arguments)}}},[n("div",{staticClass:"grid md:grid-cols-2 md:gap-4"},[n("div",[n("label",{staticClass:"label",attrs:{for:"email"}},[t._v("\n\t\t\t\tEmail\n\t\t\t")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"input",attrs:{type:"email",name:"email",placeholder:"user@example.com",id:"email",required:""},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),n("div",[n("label",{staticClass:"label",attrs:{for:"name"}},[t._v("\n\t\t\t\tName\n\t\t\t")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"input",attrs:{type:"text",name:"name",placeholder:"John Smith",id:"name",required:""},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})])]),n("div",[n("label",{staticClass:"label",attrs:{for:"message"}},[t._v("\n\t\t\tMessage\n\t\t")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.message,expression:"message"}],staticClass:"textarea",attrs:{name:"message",id:"message",required:""},domProps:{value:t.message},on:{input:function(e){e.target.composing||(t.message=e.target.value)}}})]),n("input",{attrs:{type:"hidden",name:"_gotcha"}}),n("button",{staticClass:"button",attrs:{type:"submit",disabled:"submit"===t.status}},[n("div",{staticClass:"flex"},["submit"===t.status?n("div",{staticClass:"lds-dual-ring"}):t._e(),t._v("\n\t\t\tSubmit\n\t\t")])]),"fail"===t.status?n("div",{staticClass:"error border mt-4 border-red-400 text-red-700 px-4 py-3 rounded relative",attrs:{role:"alert"}},[n("strong",{staticClass:"font-bold"},[t._v("Failed to submit")]),n("span",{staticClass:"block"},[t._v("\n\t\t\tSomething went wrong. Please try again or\n\t\t\t"),n("a",{staticClass:"border-b border-red-600",attrs:{href:"mailto:"+t.fallback_email}},[t._v("email me directly")]),t._v(".\n\t\t")])]):t._e(),"success"===t.status?n("div",{staticClass:"success border mt-4 border-green-400 text-green-700 px-4 py-3 rounded relative",attrs:{role:"alert"}},[n("strong",{staticClass:"font-bold"},[t._v("Success!")])]):t._e()])}),[],!1,null,"93d42892",null);e.a=p.exports},iLfF:function(t,e,n){"use strict";n("VAqx")},odGf:function(t,e,n){"use strict";n.r(e);var a={components:{ContactForm:n("WpOP").a},metaInfo:{title:"About"}},r=n("KHd+"),s=Object(r.a)(a,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Layout",[n("h1",{staticClass:"mt-4"},[t._v("About")]),n("p",[t._v("\n    Hello! I'm Ben Schattinger. I enjoy programming in both frontend and low-level applications.\n    In the frontend, I like using Vue, Svelte, and TypeScript. I also like Linux and\n    "),n("abbr",{attrs:{title:"platforms without a traditional operating system like Linux or Windows"}},[t._v("embedded")]),t._v("\n    development in Rust, as well as robotics programming with C++ and ROS.\n  ")]),n("br"),n("p",[n("g-link",{attrs:{to:"/#projects"}},[t._v("Check out my various projects")]),t._v(", or my\n    "),n("a",{attrs:{target:"_blank",href:"https://github.com/lights0123"}},[t._v("GitHub profile")]),t._v(".\n  ")],1),n("h1",{staticClass:"mt-8"},[t._v("Contact")]),n("contact-form")],1)}),[],!1,null,null,null);e.default=s.exports}}]);