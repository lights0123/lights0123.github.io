(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"0lLy":function(t,e,o){},fHs2:function(t,e,o){"use strict";var r=o("0lLy");o.n(r).a},rqz7:function(t,e,o){"use strict";o.r(e);var r,a=o("YKMj"),n=o("fBXv"),s=o("oCXO"),l=(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),i=function(t,e,o,r){var a,n=arguments.length,s=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(a=t[l])&&(s=(n<3?a(s):n>3?a(e,o,s):a(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s},c=Math.random().toString(36).substring(7),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.warnBrowser=!1,e.lunchOdd=null,e.lunchEven=null,e.periods=["","","","","","","",""],e.rooms=["","","","","","","",""],e.crewRoom="",e.changed=!1,e}return l(e,t),e.prototype.mounted=function(){/(snapchat|instagram)/i.test(navigator.userAgent)&&(this.warnBrowser="social")},e.prototype.onChange=function(){this.changed||(this.changed=!0,window._paq.push(["trackEvent","2020Schedule","Touch"]))},Object.defineProperty(e.prototype,"url",{get:function(){var t=JSON.stringify({p:this.periods,r:this.rooms,5:this.lunchOdd||void 0,6:this.lunchEven||void 0,c:this.crewRoom,u:c}),e=new Uint8Array(512),o=Object(n.unishox2_compress_simple)(t,t.length,e);if(o>e.length)return{error:"Too long"};var r="webcal://sched.lights0123.com/s2021/"+Object(s.a)(new Uint8Array(e.buffer,0,o));return r.length>256?{error:"Too long"}:{url:r}},enumerable:!1,configurable:!0}),i([Object(a.e)("periods",{deep:!0})],e.prototype,"onChange",null),e=i([Object(a.a)({metaInfo:{title:"Shaker 2021-2022 Schedule",meta:[{property:"og:title",content:"Shaker 2021-2022 Schedule"},{name:"description",content:"Add your class times to your calendar for the Shaker Heights High School year 2021-2022."},{property:"og:description",content:"Add your class times to your calendar for the Shaker Heights High School year 2021-2022.",key:"og:description"}]}})],e)}(a.d),d=(o("fHs2"),o("KHd+")),p=o("oCYn"),h=p.a.config.optionMergeStrategies.computed,m={metadata:{siteUrl:"https://lights0123.com"}},f=function(t){var e=t.options;e.__staticData?e.__staticData.data=m:(e.__staticData=p.a.observable({data:m}),e.computed=h({$static:function(){return e.__staticData.data}},e.computed))},g=Object(d.a)(u,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("Layout",[t.warnBrowser?o("div",{staticClass:"mt-2 p-1 bg-orange-200 text-gray-800"},[o("p",{staticClass:"text-3xl font-bold"},[t._v("Tip: open in Safari")]),t._v('\n    Click the three dots in the top left and click "Open in Safari". This will allow you to easily\n    switch between your schedule and this website, without loosing your place.\n  ')]):t._e(),o("div",{staticClass:"my-2 rounded max-w-sm overflow-hidden"},[o("p",{staticClass:"bg-gradient text-white inline-block p-2 text-xl w-full font-bold"},[t._v("\n      New: Auto-updates\n    ")]),o("p",{staticClass:"border-t-0 border-2 border-ui-border p-1"},[t._v("\n      After adding your schedule to your calendar, it will automatically update when the schedule\n      changes.\n    ")])]),o("h1",{staticClass:"mb-0"},[t._v("Shaker 2021-2022 Schedule")]),o("p",{staticClass:"mb-4"},[t._v("\n    Use this tool to add your class times to your calendar for the Shaker Heights High School year\n    2021-2022.\n    "),o("a",{staticClass:"italic mb-3",attrs:{href:"https://docs.google.com/document/d/1NO09hg8JbsfhGaH-YjlhP-NVy1SP0VXk8QUEhfEcxYU/edit",target:"_blank",rel:"noopener"}},[t._v("\n      Schedule from Shaker\n    ")])]),o("form",{attrs:{"accept-charset":"UTF-8"},on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[o("small",[o("b",{staticClass:"text-sm text-ui-emph"},[t._v("5"),o("sup",[t._v("th")])]),t._v(" Period lunch group assignment\n    ")]),o("div",{staticClass:"space-x-2"},t._l(["A","B","C","D"],(function(e){return o("label",{key:e,staticClass:"inline-flex items-center"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.lunchOdd,expression:"lunchOdd"}],staticClass:"form-radio h-5 w-5 text-blue-600",attrs:{type:"radio"},domProps:{value:e,checked:t._q(t.lunchOdd,e)},on:{change:function(o){t.lunchOdd=e}}}),o("span",{staticClass:"ml-1 pl-1 pr-3"},[t._v(t._s(e))])])})),0),o("small",[o("b",{staticClass:"text-sm text-ui-emph"},[t._v("6"),o("sup",[t._v("th")])]),t._v(" Period lunch group assignment\n    ")]),o("div",{staticClass:"space-x-2"},t._l(["A","B","C","D"],(function(e){return o("label",{key:e,staticClass:"inline-flex items-center"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.lunchEven,expression:"lunchEven"}],staticClass:"form-radio h-5 w-5 text-blue-600",attrs:{type:"radio"},domProps:{value:e,checked:t._q(t.lunchEven,e)},on:{change:function(o){t.lunchEven=e}}}),o("span",{staticClass:"ml-1 pl-1 pr-3"},[t._v(t._s(e))])])})),0),o("div",{staticClass:"grid sm:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-2"},[t._l(t.periods,(function(e,r){return o("div",{key:r},[o("div",{staticClass:"grid grid-cols-3"},[o("label",{staticClass:"label col-span-2 mr-2"},[o("p",{staticClass:"mb-2"},[t._v("Period "+t._s(r+1))]),o("input",{staticClass:"input",attrs:{type:"text",placeholder:"Class Name"},domProps:{value:e},on:{input:function(e){return t.$set(t.periods,r,e.target.value)}}})]),o("label",{staticClass:"label"},[o("p",{staticClass:"mb-2"},[t._v("Room")]),o("input",{staticClass:"input",attrs:{type:"text",placeholder:"Room"},domProps:{value:t.rooms[r]},on:{input:function(e){return t.$set(t.rooms,r,e.target.value)}}})])])])})),o("label",{staticClass:"label"},[o("p",{staticClass:"mb-2"},[t._v("Crew room")]),o("input",{directives:[{name:"model",rawName:"v-model",value:t.crewRoom,expression:"crewRoom"}],staticClass:"input",attrs:{type:"text",placeholder:"Room"},domProps:{value:t.crewRoom},on:{input:function(e){e.target.composing||(t.crewRoom=e.target.value)}}})])],2),o("a",{staticClass:"button bg-ui-primary mr-2",attrs:{href:t.url.url,disabled:t.url.error}},[t._v("Download")]),o("a",{staticClass:"button bg-green-500",attrs:{href:t.url.url&&"https://calendar.google.com/calendar/r?cid="+t.url.url,disabled:t.url.error,target:"_blank",rel:"noopener noreferrer nofollow"}},[t._v("\n      Add to Google Calendar\n    ")]),o("br"),t.url.error?o("p",{staticClass:"mt-2 bg-red-700 p-2 text-white inline-block rounded"},[t._v("\n      Your class information is too long. Try making your class names shorter.\n    ")]):o("p",{staticClass:"mt-2"},[t._v('\n      Download your schedule to import it into your calendar. Click "OK" when prompted.\n    ')]),o("p",[t._v("\n      While you're at it, need a map of the school?\n      "),o("a",{attrs:{href:"https://www.shaker.org/Downloads/SHHS%20map%202015.pdf",target:"_blank",rel:"noopener noreferrer"}},[t._v("\n        Download it here")]),t._v(".\n    ")])])])}),[],!1,null,"0cb20910",null);"function"==typeof f&&f(g);e.default=g.exports}}]);