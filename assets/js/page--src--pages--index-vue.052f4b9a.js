(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"8WKv":function(t,e,a){},"B+lc":function(t,e,a){"use strict";var n=a("BYuV");a.n(n).a},"BWX/":function(t,e,a){"use strict";var n=a("v8ht");a.n(n).a},BYuV:function(t,e,a){},WpOP:function(t,e,a){"use strict";var n,r=a("YKMj"),s=(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])})(t,e)},function(t,e){function a(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(a.prototype=e.prototype,new a)}),o=function(t,e,a,n){var r,s=arguments.length,o=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,a,n);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(o=(s<3?r(o):s>3?r(e,a,o):r(e,a))||o);return s>3&&o&&Object.defineProperty(e,a,o),o},i=function(t,e,a,n){return new(a||(a=Promise))((function(r,s){function o(t){try{c(n.next(t))}catch(t){s(t)}}function i(t){try{c(n.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?r(t.value):(e=t.value,e instanceof a?e:new a((function(t){t(e)}))).then(o,i)}c((n=n.apply(t,e||[])).next())}))},c=function(t,e){var a,n,r,s,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return s={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function i(s){return function(i){return function(s){if(a)throw new TypeError("Generator is already executing.");for(;o;)try{if(a=1,n&&(r=2&s[0]?n.return:s[0]?n.throw||((r=n.return)&&r.call(n),0):n.next)&&!(r=r.call(n,s[1])).done)return r;switch(n=0,r&&(s=[2&s[0],r.value]),s[0]){case 0:case 1:r=s;break;case 4:return o.label++,{value:s[1],done:!1};case 5:o.label++,n=s[1],s=[0];continue;case 7:s=o.ops.pop(),o.trys.pop();continue;default:if(!(r=o.trys,(r=r.length>0&&r[r.length-1])||6!==s[0]&&2!==s[0])){o=0;continue}if(3===s[0]&&(!r||s[1]>r[0]&&s[1]<r[3])){o.label=s[1];break}if(6===s[0]&&o.label<r[1]){o.label=r[1],r=s;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(s);break}r[2]&&o.ops.pop(),o.trys.pop();continue}s=e.call(t,o)}catch(t){s=[6,t],n=0}finally{a=r=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,i])}}},l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.action="https://formcarry.com/s/p4I9mQz2DRQv",e.fallback_email="developer@lights0123.com",e.email="",e.name="",e.message="",e.status="",e.changed=!1,e}return s(e,t),e.prototype.onChange=function(){this.changed||(this.changed=!0,window._paq.push(["trackEvent","Contact","Touch"]))},e.prototype.submit=function(){return i(this,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:this.status="submit",t.label=1;case 1:return t.trys.push([1,3,,4]),[4,fetch(this.action,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({email:this.email,name:this.name,message:this.message})})];case 2:if(!t.sent().ok)throw new Error("err");return this.email="",this.name="",this.message="",this.status="success",window._paq.push(["trackEvent","Contact","Submit"]),[3,4];case 3:return t.sent(),this.status="fail",[3,4];case 4:return[2]}}))}))},o([Object(r.e)("email"),Object(r.e)("name"),Object(r.e)("message")],e.prototype,"onChange",null),e=o([r.a],e)}(r.d),u=(a("tBJ2"),a("KHd+")),p=Object(u.a)(l,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("form",{attrs:{action:t.action,method:"POST","accept-charset":"UTF-8"},on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[a("div",{staticClass:"grid md:grid-cols-2 md:gap-4"},[a("div",[a("label",{staticClass:"label",attrs:{for:"email"}},[t._v("\n\t\t\t\tEmail\n\t\t\t")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"input",attrs:{type:"email",name:"email",placeholder:"user@example.com",id:"email",required:""},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),a("div",[a("label",{staticClass:"label",attrs:{for:"name"}},[t._v("\n\t\t\t\tName\n\t\t\t")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"input",attrs:{type:"text",name:"name",placeholder:"John Smith",id:"name",required:""},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})])]),a("div",[a("label",{staticClass:"label",attrs:{for:"message"}},[t._v("\n\t\t\tMessage\n\t\t")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.message,expression:"message"}],staticClass:"textarea",attrs:{name:"message",id:"message",required:""},domProps:{value:t.message},on:{input:function(e){e.target.composing||(t.message=e.target.value)}}})]),a("input",{attrs:{type:"hidden",name:"_gotcha"}}),a("button",{staticClass:"button",attrs:{type:"submit",disabled:"submit"===t.status}},[a("div",{staticClass:"flex"},["submit"===t.status?a("div",{staticClass:"lds-dual-ring"}):t._e(),t._v("\n\t\t\tSubmit\n\t\t")])]),"fail"===t.status?a("div",{staticClass:"error border mt-4 border-red-400 text-red-700 px-4 py-3 rounded relative",attrs:{role:"alert"}},[a("strong",{staticClass:"font-bold"},[t._v("Failed to submit")]),a("span",{staticClass:"block"},[t._v("\n\t\t\tSomething went wrong. Please try again or\n\t\t\t"),a("a",{staticClass:"border-b border-red-600",attrs:{href:"mailto:"+t.fallback_email}},[t._v("email me directly")]),t._v(".\n\t\t")])]):t._e(),"success"===t.status?a("div",{staticClass:"success border mt-4 border-green-400 text-green-700 px-4 py-3 rounded relative",attrs:{role:"alert"}},[a("strong",{staticClass:"font-bold"},[t._v("Success!")])]):t._e()])}),[],!1,null,null,null);e.a=p.exports},iyQ6:function(t,e,a){"use strict";a.r(e);var n,r=a("1dEK"),s=a("EH7w"),o=a("WpOP"),i=a("YKMj"),c=(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])})(t,e)},function(t,e){function a(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(a.prototype=e.prototype,new a)}),l=function(t,e,a,n){var r,s=arguments.length,o=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,a,n);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(o=(s<3?r(o):s>3?r(e,a,o):r(e,a))||o);return s>3&&o&&Object.defineProperty(e,a,o),o},u=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return c(e,t),l([Object(i.b)(Object)],e.prototype,"project",void 0),e=l([i.a],e)}(i.d),p=(a("B+lc"),a("KHd+")),m=Object(p.a)(u,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a",{staticClass:"image-wrapper rounded shadow-even p-4 md:mr-4 mb-4 md:mb-0 flex flex-col",class:t.$props.class,attrs:{target:"_blank",href:t.project.link}},[t.project.image?a("g-image",{attrs:{src:t.project.image,height:"300"}}):t._e(),a("h2",{staticClass:"text-center mt-2 mb-2"},[t._v(t._s(t.project.title))]),a("div",{directives:[{name:"g-image",rawName:"v-g-image"}],domProps:{innerHTML:t._s(t.project.content)}})],1)}),[],!1,null,"a7efe0d0",null).exports,f={components:{ContactForm:o.a,NavMenu:r.a,PageFooter:s.a,ProjectCard:m},metaInfo:{title:"Home"},methods:{row:function(t){return this.$page.allProject.edges.slice(3*(t-1),3*t)}},computed:{rowCount:function(){return Math.ceil(this.$page.allProject.edges.length/3)}}},d=(a("BWX/"),null),h=Object(p.a)(f,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex flex-col h-full"},[a("header",{staticClass:"header text-white pb-4"},[a("nav-menu",{attrs:{large:""}}),t._m(0)],1),a("main",{staticClass:"container mx-auto flex-grow px-2"},[a("h1",{staticClass:"text-4xl mt-4",attrs:{id:"projects"}},[t._v("Projects")]),t._l(t.rowCount,(function(e){return a("div",{staticClass:"flex flex-col md:flex-row md:mb-4 items-stretch"},t._l(t.row(e),(function(t){var e=t.node;return a("project-card",{key:e.id,staticClass:"card",attrs:{project:e}})})),1)})),a("h1",{staticClass:"mt-12",attrs:{id:"contact"}},[t._v("Contact")]),a("contact-form")],2),a("page-footer")],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container mx-auto mt-4 text-center"},[e("h1",{staticClass:"text-6xl text-white"},[this._v("Ben Schattinger")])])}],!1,null,null,null);"function"==typeof d&&d(h);e.default=h.exports},tBJ2:function(t,e,a){"use strict";var n=a("8WKv");a.n(n).a},v8ht:function(t,e,a){}}]);