(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{211:function(e,t,r){},362:function(e,t,r){"use strict";var n=r(211);r.n(n).a},373:function(e,t,r){"use strict";r.r(t);var n,s=r(11),a=r(254),o=r(361),i=(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),c=function(e,t,r,n){var s,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(o=(a<3?s(o):a>3?s(t,r,o):s(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o},u=function(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var n=Array(e),s=0;for(t=0;t<r;t++)for(var a=arguments[t],o=0,i=a.length;o<i;o++,s++)n[s]=a[o];return n};function l(e){if(/iP(ad|od|hone)/i.test(e)&&/WebKit/i.test(e)){if(/(snapchat|instagram)/i.test(e))return"social";if(/(CriOS|FxiOS|OPiOS|mercury)/i.test(e))return!0}return!1}var d=[{monday:[2020,8,31,8,0],tuesday:[2020,9,1,8,30]},{monday:[2020,8,31,8,45],wednesday:[2020,9,2,8,30]},{monday:[2020,8,31,9,30],tuesday:[2020,9,1,10,0]},{monday:[2020,8,31,10,15],wednesday:[2020,9,2,10,0]},{monday:[2020,8,31,11,55],tuesday:[2020,9,1,12,20]},{monday:[2020,8,31,12,40],wednesday:[2020,9,2,12,20]},{monday:[2020,8,31,13,25],tuesday:[2020,9,1,13,50]},{monday:[2020,8,31,14,10],wednesday:[2020,9,2,13,50]}];function p(e){var t=""+e;return 1===t.length&&(t="0"+t),t}function h(e){var t=p(e[4]||0);return(e[3]||0)>=12?p(e[3]-12||12)+":"+t+"PM":p(e[3]||12)+":"+t+"AM"}function y(e,t){var r=u(e);r[4]=(r[4]||0)+t;var n=Math.trunc(r[4]/60);return r[3]=(r[3]||0)+n,r[4]%=60,r}function m(e,t){for(var r=[],n=t;n<e.length;n+=2){var s=e[n].trim();if(s){var a=d[n];r.push({period:s,start:h("tuesday"in a?a.tuesday:a.wednesday),end:h(y("tuesday"in a?a.tuesday:a.wednesday,80))})}}return r}var f=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.warnBrowser=l(navigator.userAgent),t.includeWorkTime=!0,t.includeConferences=!0,t.periods=["","","","","","","",""],t.changed=!1,t}return i(t,e),t.prototype.onChange=function(){this.changed||(this.changed=!0,window._paq.push(["trackEvent","2020Schedule","Touch"]))},Object.defineProperty(t.prototype,"days",{get:function(){for(var e=[],t=[],r=0;r<8;r++){var n=this.periods[r].trim();if(n){var s=d[r];t.push({period:n,start:h(s.monday),end:h(y(s.monday,40))})}}t.push({period:"Independent Work Time",start:"02:55PM",end:"04:00PM",deemph:!0}),e.push({day:"Monday",classes:t});for(var a=0,o=["Tuesday","Wednesday","Thursday","Friday"];a<o.length;a++){var i=o[a],c=[];c.push({period:["Tuesday","Wednesday"].includes(i)?"Independent Work Time":"Conferences",start:"08:00AM",end:"08:30AM",deemph:!0}),c.push.apply(c,m(this.periods,["Tuesday","Thursday"].includes(i)?0:1)),c.push({period:"Wednesday"===i?"Well Check":"Conferences",start:"03:20PM",end:"04:00PM",deemph:!0}),e.push({day:i,classes:c})}return e},enumerable:!1,configurable:!0}),t.prototype.submit=function(){var e=[];e.push({title:"Well Check",start:[2020,9,2,15,20],duration:{minutes:40},recurrenceRule:"FREQ=WEEKLY;BYDAY=WE;INTERVAL=1;UNTIL=20201031T040000Z",busyStatus:"BUSY"}),this.includeWorkTime&&(e.push({title:"Independent Work Time",start:[2020,8,31,14,55],duration:{hours:1,minutes:5},recurrenceRule:"FREQ=WEEKLY;BYDAY=MO;INTERVAL=1;UNTIL=20201031T040000Z",busyStatus:"FREE"}),e.push({title:"Independent Work Time",start:[2020,9,1,8,0],duration:{minutes:30},recurrenceRule:"FREQ=WEEKLY;BYDAY=TU,WE;INTERVAL=1;UNTIL=20201031T040000Z",busyStatus:"FREE"})),this.includeConferences&&(e.push({title:"Conferences",start:[2020,9,1,15,20],duration:{minutes:40},recurrenceRule:"FREQ=WEEKLY;BYDAY=TU,TH,FR;INTERVAL=1;UNTIL=20201031T040000Z",busyStatus:"FREE"}),e.push({title:"Conferences",start:[2020,9,3,8,0],duration:{minutes:30},recurrenceRule:"FREQ=WEEKLY;BYDAY=TH,FR;INTERVAL=1;UNTIL=20201031T040000Z",busyStatus:"FREE"}));for(var t=0;t<d.length;t++){var r=this.periods[t].trim();if(r){var n=d[t];e.push({title:r,start:n.monday,duration:{minutes:40},recurrenceRule:"FREQ=WEEKLY;BYDAY=MO;INTERVAL=1;UNTIL=20201031T040000Z",busyStatus:"BUSY"}),e.push({title:r,start:"tuesday"in n?n.tuesday:n.wednesday,duration:{hours:1,minutes:20},recurrenceRule:"tuesday"in n?"FREQ=WEEKLY;BYDAY=TU,TH;INTERVAL=1;UNTIL=20201031T040000Z":"FREQ=WEEKLY;BYDAY=WE,FR;INTERVAL=1;UNTIL=20201031T040000Z",busyStatus:"BUSY"})}}for(var s=0,i=e;s<i.length;s++){i[s].calName="Shaker 2020 Quarter 1 Schedule"}var c=Object(a.createEvents)(e),u=c.error,l=c.value;if(u)return console.error(u);console.log(escape(l)),Object(o.saveAs)(new Blob([l],{type:"text/calendar"}),"2020schedule.ics"),window._paq.push(["trackEvent","2020Schedule","Submit"])},c([Object(s.e)("periods",{deep:!0})],t.prototype,"onChange",null),t=c([Object(s.a)({metaInfo:{title:"Shaker 2020 Quarter 1 Class Times",meta:[{property:"og:title",content:"Shaker 2020 Quarter 1 Class Times"},{name:"description",content:"See your class times for Shaker Heights High School 2020 Quarter 1, and export it to your calendar"},{property:"og:description",content:"See your class times for Shaker Heights High School 2020 Quarter 1, and export it to your calendar",key:"og:description"}]}})],t)}(s.d),v=(r(362),r(15)),b=Object(v.a)(f,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Layout",[e.warnBrowser?r("div",{staticClass:"bg-orange-200 text-gray-700"},[r("p",{staticClass:"text-3xl font-bold"},[e._v("Use Safari for best results")]),e._v("\n    Without Safari, you won't be able to export your schedule to your calendar.\n    "),"social"===e.warnBrowser?r("span",[e._v('\n      Click the three dots in the top right corner, and select "Open in Safari".\n    ')]):r("span",[e._v("\n      Please re-open this website in Safari.\n    ")])]):e._e(),r("h1",{staticClass:"mt-8 mb-0"},[e._v("Shaker 2020 Quarter 1 Class Times")]),r("p",{staticClass:"mb-4"},[e._v("\n    Use this tool to see your class times for Shaker Heights High School 2020 Quarter 1, and export it to your\n    calendar. "),r("span",{staticClass:"italic mb-3"},[e._v("Schedule from\n    "),r("a",{attrs:{href:"https://www.shaker.org/SampleSchedules.aspx",target:"_blank",rel:"noopener"}},[e._v("shaker.org/SampleSchedules.aspx")])])]),r("form",{attrs:{"accept-charset":"UTF-8"},on:{submit:function(t){return t.preventDefault(),e.submit(t)}}},[r("small",{staticClass:"block my-2"},[e._v("Leave fields blank if you don't have a class during that period.")]),r("div",{staticClass:"grid sm:grid-cols-2 md:grid-cols-4 sm:gap-4"},e._l(e.periods,(function(t,n){return r("div",{key:n},[r("label",{staticClass:"label",attrs:{for:"period"+n}},[e._v("\n          Period "+e._s(n+1)+"\n        ")]),r("input",{staticClass:"input",attrs:{type:"text",placeholder:"Class Name",id:"period"+n},domProps:{value:t},on:{input:function(t){return e.$set(e.periods,n,t.target.value)}}})])})),0),r("label",{staticClass:"flex items-center"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.includeWorkTime,expression:"includeWorkTime"}],staticClass:"form-checkbox h-5 w-5 text-blue-500",attrs:{type:"checkbox",disabled:e.warnBrowser},domProps:{checked:Array.isArray(e.includeWorkTime)?e._i(e.includeWorkTime,null)>-1:e.includeWorkTime},on:{change:function(t){var r=e.includeWorkTime,n=t.target,s=!!n.checked;if(Array.isArray(r)){var a=e._i(r,null);n.checked?a<0&&(e.includeWorkTime=r.concat([null])):a>-1&&(e.includeWorkTime=r.slice(0,a).concat(r.slice(a+1)))}else e.includeWorkTime=s}}}),r("span",{staticClass:"ml-2"},[e._v("Include Independent Work Time")])]),r("label",{staticClass:"flex items-center my-3"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.includeConferences,expression:"includeConferences"}],staticClass:"form-checkbox h-5 w-5 text-blue-500",attrs:{type:"checkbox",disabled:e.warnBrowser},domProps:{checked:Array.isArray(e.includeConferences)?e._i(e.includeConferences,null)>-1:e.includeConferences},on:{change:function(t){var r=e.includeConferences,n=t.target,s=!!n.checked;if(Array.isArray(r)){var a=e._i(r,null);n.checked?a<0&&(e.includeConferences=r.concat([null])):a>-1&&(e.includeConferences=r.slice(0,a).concat(r.slice(a+1)))}else e.includeConferences=s}}}),r("span",{staticClass:"ml-2"},[e._v("Include Conference Times")])]),r("button",{staticClass:"button",attrs:{type:"submit",disabled:e.warnBrowser}},[e._v("Download")]),e.warnBrowser?r("p",{staticClass:"mt-2"},[e._v("You can't download the schedule in this browser. Please re-open this website\n      in Safari.")]):r("p",{staticClass:"mt-2"},[e._v('\n      Download your schedule to import it into your calendar. Once downloaded, select "Add All".\n    ')]),r("h2",{staticClass:"mt-6"},[e._v("Schedule")]),r("div",{staticClass:"sm:grid sm:grid-cols-5"},e._l(e.days,(function(t){return r("div",{staticClass:"mb-4 sm:m-0"},[r("h4",{staticClass:"text-xl"},[e._v(e._s(t.day))]),e._l(t.classes,(function(t){return r("div",{staticClass:"mb-2",style:{opacity:t.deemph?.75:1}},[r("span",{staticClass:"font-bold mr-2 block"},[e._v(e._s(t.start)+" - "+e._s(t.end))]),r("span",[e._v(e._s(t.period))])])}))],2)})),0)])])}),[],!1,null,null,null);t.default=b.exports}}]);