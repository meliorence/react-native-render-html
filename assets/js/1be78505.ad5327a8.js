(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9514,2075],{3488:function(e,t,n){"use strict";n.d(t,{Z:function(){return y}});var a=n(7560),l=n(2784),r=n(6277),i=n(6540),c=n(7719),o=n(4501),s=n.n(o),u=n(2894),m=n(7921),d="codeBlockTitle_1HP_",p="codeBlockContainer_1dyT",b="codeBlockContent_3uNE",h="codeBlock_3AS9",f="codeBlockWithTitle_2H7o",k="copyButton_1oOY",v="codeBlockLines_2sa4",g=n(1395),E=/{([\d,-]+)}/,Z=function(e){void 0===e&&(e=["js","jsBlock","jsx","python","html"]);var t={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},python:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},n=["highlight-next-line","highlight-start","highlight-end"].join("|"),a=e.map((function(e){return"(?:"+t[e].start+"\\s*("+n+")\\s*"+t[e].end+")"})).join("|");return new RegExp("^\\s*(?:"+a+")\\s*$")};function y(e){var t=e.children,n=e.className,o=e.metastring,y=e.title,C=(0,g.LU)().prism,_=(0,l.useState)(!1),N=_[0],B=_[1],j=(0,l.useState)(!1),I=j[0],L=j[1];(0,l.useEffect)((function(){L(!0)}),[]);var x=(0,g.bc)(o)||y,S=(0,l.useRef)(null),T=[],w=(0,u.Z)(),A=Array.isArray(t)?t.join(""):t;if(o&&E.test(o)){var R=o.match(E)[1];T=s()(R).filter((function(e){return e>0}))}var P=n&&n.replace(/language-/,"");!P&&C.defaultLanguage&&(P=C.defaultLanguage);var H=A.replace(/\n$/,"");if(0===T.length&&void 0!==P){for(var O,U="",M=function(e){switch(e){case"js":case"javascript":case"ts":case"typescript":return Z(["js","jsBlock"]);case"jsx":case"tsx":return Z(["js","jsBlock","jsx"]);case"html":return Z(["js","jsBlock","html"]);case"python":case"py":return Z(["python"]);default:return Z()}}(P),D=A.replace(/\n$/,"").split("\n"),K=0;K<D.length;){var W=K+1,Y=D[K].match(M);if(null!==Y){switch(Y.slice(1).reduce((function(e,t){return e||t}),void 0)){case"highlight-next-line":U+=W+",";break;case"highlight-start":O=W;break;case"highlight-end":U+=O+"-"+(W-1)+","}D.splice(K,1)}else K+=1}T=s()(U),H=D.join("\n")}var $=function(){(0,c.Z)(H),B(!0),setTimeout((function(){return B(!1)}),2e3)};return l.createElement(i.ZP,(0,a.Z)({},i.lG,{key:String(I),theme:w,code:H,language:P}),(function(e){var t,n=e.className,i=e.tokens,c=e.getLineProps,o=e.getTokenProps;return l.createElement("div",{className:p},x&&l.createElement("div",{className:d},x),l.createElement("div",{className:(0,r.Z)(b,P)},l.createElement("div",{tabIndex:0,className:(0,r.Z)(n,h,"thin-scrollbar",(t={},t[f]=x,t))},l.createElement("div",{className:v},i.map((function(e,t){1===e.length&&""===e[0].content&&(e[0].content="\n");var n=c({line:e,key:t});return T.includes(t+1)&&(n.className=n.className+" docusaurus-highlight-code-line"),l.createElement("div",(0,a.Z)({key:t},n),e.map((function(e,t){return l.createElement("span",(0,a.Z)({key:t},o({token:e,key:t})))})))})))),l.createElement("button",{ref:S,type:"button","aria-label":(0,m.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),className:(0,r.Z)(k),onClick:$},N?l.createElement(m.Z,{id:"theme.CodeBlock.copied",description:"The copied button label on code blocks"},"Copied"):l.createElement(m.Z,{id:"theme.CodeBlock.copy",description:"The copy button label on code blocks"},"Copy"))))}))}},8629:function(e,t,n){"use strict";n.d(t,{Z:function(){return H}});var a=n(7560),l=n(8283),r=n(2784),i=n(6277),c=n(1395),o=n(5862),s=n(3157),u=n(1233),m=n(2391),d=n(1510),p=n(1344),b=n(3578),h=n(3030),f=n(8013),k=n(7921),v="sidebar_3jCp",g="sidebarWithHideableNavbar_Uxjr",E="sidebarHidden_22GT",Z="sidebarLogo_8bKs",y="menu_1DcY",C="menuLinkText_5DKa",_="menuWithAnnouncementBar_3IKd",N="collapseSidebarButton_3okl",B="collapseSidebarButtonIcon_1LB5",j="sidebarMenuIcon_wchL",I="sidebarMenuCloseIcon_1m04",L="menuLinkExternal_3iHz",x=function e(t,n){return"link"===t.type?(0,c.Mg)(t.href,n):"category"===t.type&&t.items.some((function(t){return e(t,n)}))},S=(0,r.memo)((function(e){var t=e.items,n=(0,l.Z)(e,["items"]);return t.map((function(e,t){return r.createElement(T,(0,a.Z)({key:t,item:e},n))}))}));function T(e){switch(e.item.type){case"category":return r.createElement(w,e);case"link":default:return r.createElement(A,e)}}function w(e){var t,n=e.item,c=e.onItemClick,o=e.activePath,s=(0,l.Z)(e,["item","onItemClick","activePath"]),u=n.items,m=n.label,d=x(n,o),p=(0,r.useRef)(null);return 0===u.length?null:r.createElement("li",{className:(0,i.Z)("menu__list-item")},r.createElement("span",(0,a.Z)({className:(0,i.Z)("menu__link",(t={"menu__link--sublist":!0,"menu__link--active":d},t[C]=!1,t))},s),m),r.createElement("ul",{className:"menu__list",ref:p},r.createElement(S,{items:u,tabIndex:"0",onItemClick:c,activePath:o})))}function A(e){var t,n=e.item,c=e.onItemClick,o=e.activePath,s=(e.collapsible,(0,l.Z)(e,["item","onItemClick","activePath","collapsible"])),u=n.href,m=n.label,b=x(n,o);return r.createElement("li",{className:"menu__list-item",key:m},r.createElement(d.Z,(0,a.Z)({className:(0,i.Z)("menu__link",(t={"menu__link--active":b},t[L]=!(0,p.Z)(u),t)),to:u},(0,p.Z)(u)&&{isNavLink:!0,exact:!0,onClick:c},s),m))}function R(e){var t=e.onClick;return r.createElement("button",{type:"button",title:(0,k.I)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,k.I)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,i.Z)("button button--secondary button--outline",N),onClick:t},r.createElement(h.Z,{className:B}))}function P(e){var t=e.responsiveSidebarOpened,n=e.onClick;return r.createElement("button",{"aria-label":t?(0,k.I)({id:"theme.docs.sidebar.responsiveCloseButtonLabel",message:"Close menu",description:"The ARIA label for close button of mobile doc sidebar"}):(0,k.I)({id:"theme.docs.sidebar.responsiveOpenButtonLabel",message:"Open menu",description:"The ARIA label for open button of mobile doc sidebar"}),"aria-haspopup":"true",className:"button button--secondary button--sm menu__button",type:"button",onClick:n},t?r.createElement("span",{className:(0,i.Z)(j,I)},"\xd7"):r.createElement(f.Z,{className:j,height:24,width:24}))}var H=function(e){var t,n,a=e.path,l=e.sidebar,d=e.sidebarCollapsible,p=void 0===d||d,h=e.onCollapse,f=e.isHidden,k=function(){var e=(0,o.Z)().isAnnouncementBarClosed,t=(0,r.useState)(!e),n=t[0],a=t[1];return(0,m.Z)((function(t){var n=t.scrollY;e||a(0===n)})),n}(),C=(0,c.LU)(),N=C.navbar.hideOnScroll,B=C.hideableSidebar,j=(0,o.Z)().isAnnouncementBarClosed,I=function(){var e=(0,r.useState)(!1),t=e[0],n=e[1];(0,s.Z)(t);var a=(0,u.Z)();return(0,r.useEffect)((function(){a===u.D.desktop&&n(!1)}),[a]),{showResponsiveSidebar:t,closeResponsiveSidebar:(0,r.useCallback)((function(e){e.target.blur(),n(!1)}),[n]),toggleResponsiveSidebar:(0,r.useCallback)((function(){n((function(e){return!e}))}),[n])}}(),L=I.showResponsiveSidebar,x=I.closeResponsiveSidebar,T=I.toggleResponsiveSidebar;return r.createElement("div",{className:(0,i.Z)(v,(t={},t[g]=N,t[E]=f,t))},N&&r.createElement(b.Z,{tabIndex:-1,className:Z}),r.createElement("div",{className:(0,i.Z)("menu","menu--responsive","thin-scrollbar",y,(n={"menu--show":L},n[_]=!j&&k,n))},r.createElement(P,{responsiveSidebarOpened:L,onClick:T}),r.createElement("ul",{className:"menu__list"},r.createElement(S,{items:l,onItemClick:x,collapsible:p,activePath:a}))),B&&r.createElement(R,{onClick:h}))}},9684:function(e,t,n){"use strict";n.d(t,{Z:function(){return b}});var a=n(7560),l=n(2784),r=n(6566),i=n(7614),c=n(77),o=n(7513),s=n(759),u=n(1395),m=n(4517);function d(){var e=(0,i.Z)().i18n,t=e.defaultLocale,n=e.locales,a=(0,u.l5)();return l.createElement(r.Z,null,n.map((function(e){return l.createElement("link",{key:e,rel:"alternate",href:a.createUrl({locale:e,fullyQualified:!0}),hrefLang:e})})),l.createElement("link",{rel:"alternate",href:a.createUrl({locale:t,fullyQualified:!0}),hrefLang:"x-default"}))}function p(e){var t=e.permalink,n=(0,i.Z)().siteConfig.url,a=function(){var e=(0,i.Z)().siteConfig.url,t=(0,m.TH)().pathname;return e+(0,c.Z)(t)}(),o=t?""+n+t:a;return l.createElement(r.Z,null,l.createElement("meta",{property:"og:url",content:o}),l.createElement("link",{rel:"canonical",href:o}))}function b(e){var t=(0,i.Z)(),n=t.siteConfig.themeConfig.metadatas,c=t.i18n,m=c.currentLocale,b=c.localeConfigs,h=e.title,f=e.description,k=e.image,v=e.keywords,g=e.searchMetadatas,E=(0,u.pe)(h),Z=m,y=b[m].direction;return l.createElement(l.Fragment,null,l.createElement(r.Z,null,l.createElement("html",{lang:Z,dir:y}),l.createElement("title",null,E),l.createElement("meta",{property:"og:title",content:E})),l.createElement(s.Z,{description:f,keywords:v,image:k}),l.createElement(p,null),l.createElement(d,null),l.createElement(o.Z,(0,a.Z)({tag:u.HX,locale:m},g)),l.createElement(r.Z,null,n.map((function(e,t){return l.createElement("meta",(0,a.Z)({key:"metadata_"+t},e))}))))}}}]);