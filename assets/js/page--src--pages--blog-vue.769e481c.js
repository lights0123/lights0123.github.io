(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"1zU8":function(t,a,e){"use strict";e("p5jC")},"6R9h":function(t,a){t.exports={functional:!0,render(t,a){const{_c:e,_v:r,data:n,children:s=[]}=a,{class:i,staticClass:l,style:o,staticStyle:c,attrs:u={},...p}=n;return e("svg",{class:["feather feather-arrow-right",i,l],style:[o,c],attrs:Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},u),...p},s.concat([e("path",{attrs:{d:"M5 12h14M12 5l7 7-7 7"}})]))}}},"8tYL":function(t,a,e){"use strict";e.r(a);e("oCYn");var r=e("DOVJ"),n=(e("Y6W1"),e("VTBJ")),s=(e("qePV"),e("rB9j"),e("UxlC"),e("2B1R"),e("ALS0"),e("ma9I"),e("fVfk")),i={functional:!0,props:{info:{type:Object,required:!0},showLinks:{type:Boolean,default:!0},showNavigation:{type:Boolean,default:!0},firstLabel:{type:String,default:"«"},firstClass:{type:String,default:""},prevLabel:{type:String,default:"‹"},prevClass:{type:String,default:""},nextLabel:{type:String,default:"›"},nextClass:{type:String,default:""},lastLabel:{type:String,default:"»"},lastClass:{type:String,default:""},navClass:{type:String,default:""},linkClass:{type:String,default:""},range:{type:Number,default:5},activeLinkClass:{type:String,default:void 0},exactActiveLinkClass:{type:String,default:void 0},ariaLabel:{type:String,default:"Pagination Navigation"},ariaLinkLabel:{type:String,default:"Go to page %n"},ariaFirstLabel:{type:String,default:"Go to first page"},ariaCurrentLabel:{type:String,default:"Current page. Page %n"},ariaPrevLabel:{type:String,default:"Go to previous page. Page %n"},ariaNextLabel:{type:String,default:"Go to next page. Page %n"},ariaLastLabel:{type:String,default:"Go to last page. Page %n"}},render:function(t,a){var e=a.props,i=a.data,o=a.parent,c=e.info,u=e.showLinks,p=e.showNavigation,d=e.ariaLabel,g=function(t,a){var e=t.currentPage,r=void 0===e?1:e,n=t.totalPages,s=void 0===n?1:n,i=Math.ceil(a/2),l=Math.floor(r-i),o=Math.floor(r+i);s<=a?(l=0,o=s):r<=i?(l=0,o=a):r+i>=s&&(l=s-a,o=s);for(var c=[],u=l+1;u<=o;u++)c.push(u);return{current:r,total:s,start:l,end:o,pages:c}}(c,e.range),f=g.current,v=g.total,h=g.pages,b=g.start,C=g.end,L=Object(s.d)(o.$route),w=function(a){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:s,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";a===f&&(i=e.ariaCurrentLabel);var c={to:l(L,a),exact:!0};return e.activeLinkClass&&(c.activeClass=e.activeLinkClass),e.exactActiveLinkClass&&(c.exactActiveClass=e.exactActiveLinkClass),t(r.a,{class:[e.linkClass,o],attrs:Object(n.a)(Object(n.a)({},c),{},{"aria-label":i.replace("%n",a),"aria-current":f===a})},[s])},y=u?h.map((function(t){return w(t,t,e.ariaLinkLabel)})):[];if(p){var x=e.firstLabel,k=e.prevLabel,S=e.nextLabel,m=e.lastLabel,_=e.ariaFirstLabel,j=e.ariaPrevLabel,P=e.ariaNextLabel,O=e.ariaLastLabel,M=e.firstClass,B=e.prevClass,A=e.nextClass,N=e.lastClass,R=e.navClass;f>1&&y.unshift(w(f-1,k,j,[B,R])),b>0&&y.unshift(w(1,x,_,[M,R])),f<v&&y.push(w(f+1,S,P,[A,R])),C<v&&y.push(w(v,m,O,[N,R]))}return y.length<2?null:t("nav",Object(n.a)(Object(n.a)({},i),{},{attrs:{role:"navigation","aria-label":d}}),y)}};function l(t,a){var e=/\/$/.test(t)?"/":"";return a>1?Object(s.g)(t)+"/".concat(a).concat(e):t}e("6NbQ");var o=e("6R9h"),c=e.n(o),u=e("l3To"),p=e.n(u),d={metaInfo:{title:"Blog"},components:{Pager:i,Arrow:c.a,Frown:p.a},name:"Blog"},g=(e("1zU8"),e("KHd+")),f=null,v=Object(g.a)(d,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("Layout",[e("div",{staticClass:"container mx-auto mt-4"},[0===t.$page.allPost.edges.length?e("div",{staticClass:"mt-10 text-center"},[e("p",[e("Frown",{staticClass:"inline w-4 mb-1",attrs:{preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"}}),t._v(" There's nothing here")],1)]):t._e(),t._l(t.$page.allPost.edges,(function(a){var r=a.node;return e("div",{key:r.id,staticClass:"w-full rounded shadow-even p-4 mb-4"},[e("g-link",{attrs:{to:r.path}},[e("h1",{staticClass:"text-5xl"},[t._v(t._s(r.title))])]),e("p",{staticClass:"text-gray-600 text-sm"},[t._v(" "+t._s(r.date)+" · "),e("i",[t._v(t._s(r.timeToRead)+" min read")])]),e("p",[t._v(t._s(r.description))]),e("p",[e("g-link",{attrs:{to:r.path}},[t._v("\n\t\t\t\t\tRead more\n\t\t\t\t\t"),e("div",{staticClass:"inline-flex",attrs:{"aria-hidden":"true"}},[e("arrow",{staticClass:"relative top-1/8",attrs:{viewBox:"0 0 24 24",width:"1em",height:"1em"}})],1)])],1)],1)})),e("Pager",{staticClass:"pager",attrs:{info:t.$page.allPost.pageInfo}})],2)])}),[],!1,null,"75be4092",null);"function"==typeof f&&f(v);a.default=v.exports},l3To:function(t,a){t.exports={functional:!0,render(t,a){const{_c:e,_v:r,data:n,children:s=[]}=a,{class:i,staticClass:l,style:o,staticStyle:c,attrs:u={},...p}=n;return e("svg",{class:["feather feather-frown",i,l],style:[o,c],attrs:Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},u),...p},s.concat([e("circle",{attrs:{cx:"12",cy:"12",r:"10"}}),e("path",{attrs:{d:"M16 16s-1.5-2-4-2-4 2-4 2M9 9h.01M15 9h.01"}})]))}}},p5jC:function(t,a,e){}}]);