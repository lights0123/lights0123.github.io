(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{ArTR:function(t,e,n){"use strict";n("yayr")},"B+lc":function(t,e,n){"use strict";n("BYuV")},"BWX/":function(t,e,n){"use strict";n("v8ht")},BYuV:function(t,e,n){},WpOP:function(t,e,n){"use strict";var r,a=n("G0B5"),o=(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),s=function(t,e,n,r){var a,o=arguments.length,s=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,r);else for(var i=t.length-1;i>=0;i--)(a=t[i])&&(s=(o<3?a(s):o>3?a(e,n,s):a(e,n))||s);return o>3&&s&&Object.defineProperty(e,n,s),s},i=function(t,e,n,r){return new(n||(n=Promise))((function(a,o){function s(t){try{c(r.next(t))}catch(t){o(t)}}function i(t){try{c(r.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?a(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,i)}c((r=r.apply(t,e||[])).next())}))},c=function(t,e){var n,r,a,o,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function i(o){return function(i){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(a=s.trys,(a=a.length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){s.label=o[1];break}if(6===o[0]&&s.label<a[1]){s.label=a[1],a=o;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(o);break}a[2]&&s.ops.pop(),s.trys.pop();continue}o=e.call(t,s)}catch(t){o=[6,t],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}},l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.action="https://formcarry.com/s/p4I9mQz2DRQv",e.fallback_email="developer@lights0123.com",e.email="",e.name="",e.message="",e.status="",e.changed=!1,e}return o(e,t),e.prototype.onChange=function(){this.changed||(this.changed=!0,window._paq.push(["trackEvent","Contact","Touch"]))},e.prototype.submit=function(){return i(this,void 0,void 0,(function(){var t;return c(this,(function(e){switch(e.label){case 0:this.status="submit",e.label=1;case 1:if(e.trys.push([1,3,,4]),2022===(t=new Date).getFullYear()&&(1===t.getMonth()||2===t.getMonth()))throw new Error("Ran out of Formcarry submissions");return[4,fetch(this.action,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({email:this.email,name:this.name,message:this.message})})];case 2:if(!e.sent().ok)throw new Error("err");return this.email="",this.name="",this.message="",this.status="success",window._paq.push(["trackEvent","Contact","Submit"]),[3,4];case 3:return e.sent(),this.status="fail",[3,4];case 4:return[2]}}))}))},s([Object(a.e)("email"),Object(a.e)("name"),Object(a.e)("message")],e.prototype,"onChange",null),e=s([a.a],e)}(a.d),u=(n("ArTR"),n("KHd+")),p=Object(u.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("form",{attrs:{action:t.action,method:"POST","accept-charset":"UTF-8"},on:{submit:function(e){return e.preventDefault(),t.submit.apply(null,arguments)}}},[n("div",{staticClass:"grid md:grid-cols-2 md:gap-4"},[n("div",[n("label",{staticClass:"label",attrs:{for:"email"}},[t._v("\n\t\t\t\tEmail\n\t\t\t")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"input",attrs:{type:"email",name:"email",placeholder:"user@example.com",id:"email",required:""},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),n("div",[n("label",{staticClass:"label",attrs:{for:"name"}},[t._v("\n\t\t\t\tName\n\t\t\t")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"input",attrs:{type:"text",name:"name",placeholder:"John Smith",id:"name",required:""},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})])]),n("div",[n("label",{staticClass:"label",attrs:{for:"message"}},[t._v("\n\t\t\tMessage\n\t\t")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.message,expression:"message"}],staticClass:"textarea",attrs:{name:"message",id:"message",required:""},domProps:{value:t.message},on:{input:function(e){e.target.composing||(t.message=e.target.value)}}})]),n("input",{attrs:{type:"hidden",name:"_gotcha"}}),n("button",{staticClass:"button",attrs:{type:"submit",disabled:"submit"===t.status}},[n("div",{staticClass:"flex"},["submit"===t.status?n("div",{staticClass:"lds-dual-ring"}):t._e(),t._v("\n\t\t\tSubmit\n\t\t")])]),"fail"===t.status?n("div",{staticClass:"error border mt-4 border-red-400 text-red-700 px-4 py-3 rounded relative",attrs:{role:"alert"}},[n("strong",{staticClass:"font-bold"},[t._v("Failed to submit")]),n("span",{staticClass:"block"},[t._v("\n\t\t\tSomething went wrong. Please try again or\n\t\t\t"),n("a",{staticClass:"border-b border-red-600",attrs:{href:"mailto:"+t.fallback_email}},[t._v("email me directly")]),t._v(".\n\t\t")])]):t._e(),"success"===t.status?n("div",{staticClass:"success border mt-4 border-green-400 text-green-700 px-4 py-3 rounded relative",attrs:{role:"alert"}},[n("strong",{staticClass:"font-bold"},[t._v("Success!")])]):t._e()])}),[],!1,null,"03f17a62",null);e.a=p.exports},iyQ6:function(t,e,n){"use strict";n.r(e);var r,a=n("1dEK"),o=n("EH7w"),s=n("WpOP"),i=n("G0B5"),c=(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),l=function(t,e,n,r){var a,o=arguments.length,s=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,r);else for(var i=t.length-1;i>=0;i--)(a=t[i])&&(s=(o<3?a(s):o>3?a(e,n,s):a(e,n))||s);return o>3&&s&&Object.defineProperty(e,n,s),s},u=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return c(e,t),l([Object(i.b)(Object)],e.prototype,"project",void 0),e=l([i.a],e)}(i.d),p=(n("B+lc"),n("KHd+")),f=Object(p.a)(u,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",{staticClass:"image-wrapper rounded shadow-even p-4 md:mr-4 mb-4 md:mb-0 flex flex-col",class:t.$props.class,attrs:{target:"_blank",href:t.project.link}},[t.project.image?n("g-image",{attrs:{src:t.project.image,height:"300"}}):t._e(),n("h2",{staticClass:"text-center mt-2 mb-2"},[t._v(t._s(t.project.title))]),n("div",{directives:[{name:"g-image",rawName:"v-g-image"}],domProps:{innerHTML:t._s(t.project.content)}})],1)}),[],!1,null,"a7efe0d0",null).exports,m={components:{ContactForm:s.a,NavMenu:a.a,PageFooter:o.a,ProjectCard:f},metaInfo:{title:"Home"},methods:{row:function(t){return this.$page.allProject.edges.slice(3*(t-1),3*t)}},computed:{rowCount:function(){return Math.ceil(this.$page.allProject.edges.length/3)}}},d=(n("BWX/"),null),h=Object(p.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"flex flex-col h-full"},[n("header",{staticClass:"header text-white pb-4"},[n("nav-menu",{attrs:{large:""}}),t._m(0)],1),n("main",{staticClass:"container mx-auto flex-grow px-2"},[n("h1",{staticClass:"text-4xl mt-4",attrs:{id:"projects"}},[t._v("Projects")]),t._l(t.rowCount,(function(e){return n("div",{staticClass:"flex flex-col md:flex-row md:mb-4 items-stretch"},t._l(t.row(e),(function(t){var e=t.node;return n("project-card",{key:e.id,staticClass:"card",attrs:{project:e}})})),1)})),n("h1",{staticClass:"mt-12",attrs:{id:"contact"}},[t._v("Contact")]),n("contact-form")],2),n("page-footer")],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container mx-auto mt-4 text-center"},[e("h1",{staticClass:"text-6xl text-white"},[this._v("Ben Schattinger")])])}],!1,null,null,null);"function"==typeof d&&d(h);e.default=h.exports},v8ht:function(t,e,n){},yayr:function(t,e,n){}}]);