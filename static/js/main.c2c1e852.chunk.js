(this.webpackJsonpcolorpickerjs=this.webpackJsonpcolorpickerjs||[]).push([[0],{14:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),o=n(6),i=n.n(o),r=(n(5),n(3)),a=function(){var e=Object(c.useState)(50),t=Object(r.a)(e,2),n=t[0],s=t[1];return Object(c.useEffect)((function(){var e=function(e){!function(e){return e.wheelDelta?e.wheelDelta>0:e.deltaY<0}(e)?s(n-2):s(n+2)};return window.addEventListener("wheel",e),function(){window.removeEventListener("wheel",e)}}),[n]),n>100&&s(100),n<0&&s(0),n},u=n(0),d=n(16),l=n(17),j=n(18),b=n(19);var h=function(){var e=Object(c.useRef)(!1),t=Object(c.useState)(!1),n=Object(r.a)(t,2),s=n[0],o=n[1],i=Object(c.useState)(0),h=Object(r.a)(i,2),p=h[0],O=h[1],f=Object(c.useState)(0),v=Object(r.a)(f,2),m=v[0],x=v[1],w=Object(c.useState)(0),g=Object(r.a)(w,2),E=g[0],L=g[1],y=function(){var e=Object(c.useState)({x:window.innerWidth/2,y:window.innerHeight/2}),t=Object(r.a)(e,2),n=t[0],s=t[1],o=Object(c.useState)(!1),i=Object(r.a)(o,2),a=i[0],u=i[1];return Object(c.useEffect)((function(){var e=function(e){"mousedown"===e.type?u(!0):u(!1)};return window.addEventListener("mouseup",e),window.addEventListener("mousedown",e),function(){window.removeEventListener("mousedown",e),window.removeEventListener("mouseup",e)}}),[]),Object(c.useEffect)((function(){var e=function(e){!0===a&&s({x:e.clientX,y:e.clientY})};return window.addEventListener("mousemove",e),function(){window.removeEventListener("mousemove",e)}}),[a]),n}(),k=a(),S=Object(c.useRef)(null),N=Object(c.useRef)(null),C=Object(c.useRef)(null),B=document.getElementById("background"),H=document.getElementById("copyPopup"),P=document.getElementsByClassName("copyBtn"),M=function t(){e.current=!0,document.removeEventListener("mousedown",t),document.removeEventListener("wheel",t)};if(document.addEventListener("mousedown",M,{once:!0}),document.addEventListener("wheel",M,{once:!0}),P)for(var R=0;R<P.length;R++)P[R].addEventListener("mouseover",(function(){o(!0)})),P[R].addEventListener("mouseout",(function(){o(!1)}));!function(e){var t=e.props,n=t.hue,c=t.setHue,s=t.saturation,o=t.setSaturation,i=t.lightness,r=t.setLightness;n>360?c(360):n<0?c(0):s>100?o(100):s<0?o(0):i>100?r(100):i<0&&r(0)}(Object(c.useMemo)((function(){return{props:{hue:p,setHue:O,saturation:m,setSaturation:x,lightness:E,setLightness:L}}}),[p,m,E])),Object(c.useEffect)((function(){if(!s){var e=y.y/window.innerHeight;x(100*e)}}),[y.y]),Object(c.useEffect)((function(){if(!s){var e=y.x/window.innerWidth;O(360*e)}}),[y.x]),Object(c.useEffect)((function(){L(k)}),[k]);var I,T,X,D=function(e){navigator.clipboard.writeText(e.current.innerHTML).then((function(){H.classList.contains("popup")||(H.classList.add("popup"),setTimeout((function(){H.classList.remove("popup")}),1200))}),(function(){console.log("Copy to clipboard failed")}))},G=(I=B)?window.getComputedStyle(I,null).getPropertyValue("background-color"):Object(u.jsx)("p",{children:"Loading"}),J=function(e){return e?function(e){return"#".concat(e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map((function(e){return parseInt(e,10).toString(16).padStart(2,"0")})).join(""))}(window.getComputedStyle(e,null).getPropertyValue("background-color")):Object(u.jsx)("p",{children:"Loading"})}(B),V="hsl(".concat(Math.round(p),", ").concat(Math.round(m),"%, ").concat(E,"%)");return Object(u.jsx)("div",{className:"container",children:Object(u.jsxs)("div",{className:"background",id:"background",style:{backgroundColor:(T=m,X=E,T=m,X=E,"hsl(".concat(p,", ").concat(T,"%, ").concat(X,"%)"))},children:[Object(u.jsx)("div",{className:"about",children:Object(u.jsx)(d.a,{})}),Object(u.jsx)("div",{children:e.current?Object(u.jsxs)("div",{id:"colorProps",className:"colorProps absolute disable-select cursor glass",children:[Object(u.jsxs)("span",{children:[Object(u.jsxs)("span",{children:[Object(u.jsx)("h2",{children:"HSL"}),Object(u.jsx)("p",{ref:S,value:"HSL",children:V})]}),Object(u.jsx)(l.a,{className:"copyBtn",onClick:function(){return D(S)}})]}),Object(u.jsx)("div",{className:"line"}),Object(u.jsxs)("span",{children:[Object(u.jsxs)("span",{children:[Object(u.jsx)("h2",{children:"RGB"}),Object(u.jsx)("p",{ref:C,value:"RGB",children:G})]}),Object(u.jsx)(l.a,{className:"copyBtn",onClick:function(){return D(C)}})]}),Object(u.jsx)("div",{className:"line"}),Object(u.jsxs)("span",{children:[Object(u.jsxs)("span",{children:[Object(u.jsx)("h2",{children:"HEX"}),Object(u.jsx)("p",{ref:N,value:"HEX",children:J})]}),Object(u.jsx)(l.a,{className:"copyBtn",onClick:function(){return D(N)}})]}),Object(u.jsx)("div",{className:"line"}),Object(u.jsxs)("div",{className:"instructions",children:[Object(u.jsxs)("span",{children:[Object(u.jsx)(j.a,{}),Object(u.jsx)("p",{children:"Click and drag left and right to change hue"})]}),Object(u.jsxs)("span",{children:[Object(u.jsx)(j.a,{}),Object(u.jsx)("p",{children:"Click and drag up and down to change saturation"})]}),Object(u.jsxs)("span",{children:[Object(u.jsx)(j.a,{}),Object(u.jsx)("p",{children:"Scroll to change lightness"})]})]})]}):Object(u.jsx)("div",{className:"infoMsg absolute disable-select",children:"Click and drag cursor to change the background color"})}),Object(u.jsx)("div",{id:"copyPopup",className:"copyPopup absolute disable-select cursor glass",children:Object(u.jsxs)("div",{children:[Object(u.jsx)("p",{children:"Copied"}),Object(u.jsx)(b.a,{})]})})]})})};i.a.render(Object(u.jsx)(s.a.StrictMode,{children:Object(u.jsx)(h,{})}),document.getElementById("root"))},5:function(e,t,n){}},[[14,1,2]]]);
//# sourceMappingURL=main.c2c1e852.chunk.js.map