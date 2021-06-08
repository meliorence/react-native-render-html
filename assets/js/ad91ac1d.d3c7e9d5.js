(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7908],{409:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return o},metadata:function(){return d},toc:function(){return m},default:function(){return c}});var i=n(7560),a=n(8283),r=(n(2784),n(9037)),l=n(2123),s=n(1473),o=(n(6785),{id:"listelementconfig",title:"ListElementConfig"}),d={unversionedId:"listelementconfig",id:"listelementconfig",isDocsHomePage:!1,title:"ListElementConfig",description:"Configuration for ol and ul.",source:"@site/api/listelementconfig.mdx",sourceDirName:".",slug:"/listelementconfig",permalink:"/react-native-render-html/api/listelementconfig",version:"current",frontMatter:{id:"listelementconfig",title:"ListElementConfig"},sidebar:"apiSidebar",previous:{title:"InternalTextualRenderer",permalink:"/react-native-render-html/api/internaltextualrenderer"},next:{title:"ListStyleSpec",permalink:"/react-native-render-html/api/liststylespec"}},m=[{value:"Fields",id:"fields",children:[{value:"<code>enableDynamicMarkerBoxWidth</code>",id:"enabledynamicmarkerboxwidth",children:[]},{value:"<code>enableExperimentalRtl</code>",id:"enableexperimentalrtl",children:[]},{value:"<code>enableRemoveBottomMarginIfNested</code>",id:"enableremovebottommarginifnested",children:[]},{value:"<code>enableRemoveTopMarginIfNested</code>",id:"enableremovetopmarginifnested",children:[]},{value:"<code>getFallbackListStyleTypeFromNestLevel</code>",id:"getfallbackliststyletypefromnestlevel",children:[]}]}],p={toc:m};function c(e){var t=e.components,n=(0,a.Z)(e,["components"]);return(0,r.kt)("wrapper",(0,i.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)(s.Z,{reflectionId:930,version:"6.0.0-beta.0",mdxType:"HeaderTypeBox"}),(0,r.kt)("p",null,"Configuration for ol and ul."),(0,r.kt)("h2",{id:"fields"},"Fields"),(0,r.kt)("h3",{id:"enabledynamicmarkerboxwidth"},(0,r.kt)("inlineCode",{parentName:"h3"},"enableDynamicMarkerBoxWidth")),(0,r.kt)(l.Z,{reflection:"%7B%22id%22%3A931%2C%22name%22%3A%22enableDynamicMarkerBoxWidth%22%2C%22kind%22%3A1024%2C%22kindString%22%3A%22Property%22%2C%22flags%22%3A%7B%22isOptional%22%3Atrue%7D%2C%22comment%22%3A%7B%22shortText%22%3A%22When%20%60true%60%2C%20the%20width%20of%20the%20marker%20box%20will%20be%20adapted%20depending%20on%5Cn%60fontSize%60%20and%20the%20highest%20number%20of%20characters%20in%20the%20printed%20range.%22%2C%22text%22%3A%22If%20this%20length%20is%20superior%20than%20the%20left%20(or%20right%20in%20ltr%20mode)%20padding%2C%5Cna%20supplemental%20space%20will%20be%20added%20before%20every%20list%20child.%5Cn%5CnWhen%20%60false%60%2C%20the%20left%20(or%20right%20in%20ltr%20mode)%20padding%20will%20be%20invariable.%5Cn%22%2C%22tags%22%3A%5B%7B%22tag%22%3A%22defaultvalue%22%2C%22text%22%3A%22false%5Cn%22%7D%5D%7D%2C%22sources%22%3A%5B%7B%22fileName%22%3A%22packages%2Frender-html%2Fsrc%2Fshared-types.ts%22%2C%22line%22%3A89%2C%22character%22%3A29%7D%5D%2C%22type%22%3A%7B%22type%22%3A%22intrinsic%22%2C%22name%22%3A%22boolean%22%7D%7D",mdxType:"DeclarationBox"}),(0,r.kt)("p",null,"When ",(0,r.kt)("inlineCode",{parentName:"p"},"true"),", the width of the marker box will be adapted depending on\n",(0,r.kt)("inlineCode",{parentName:"p"},"fontSize")," and the highest number of characters in the printed range."),(0,r.kt)("p",null,"If this length is superior than the left (or right in ltr mode) padding,\na supplemental space will be added before every list child."),(0,r.kt)("p",null,"When ",(0,r.kt)("inlineCode",{parentName:"p"},"false"),", the left (or right in ltr mode) padding will be invariable."),(0,r.kt)("h3",{id:"enableexperimentalrtl"},(0,r.kt)("inlineCode",{parentName:"h3"},"enableExperimentalRtl")),(0,r.kt)(l.Z,{reflection:"%7B%22id%22%3A934%2C%22name%22%3A%22enableExperimentalRtl%22%2C%22kind%22%3A1024%2C%22kindString%22%3A%22Property%22%2C%22flags%22%3A%7B%22isOptional%22%3Atrue%7D%2C%22comment%22%3A%7B%22shortText%22%3A%22If%20%60true%60%20and%20the%20direction%20is%20set%20to%20%60'rtl'%60%20(either%20via%20%60dir%60%20attribute%5Cnor%20%60direction%60%20CSS%20property)%3A%22%2C%22text%22%3A%22-%20lists%20markers%20will%20be%20flushed%20to%20the%20right%20when%20%60I18nManager.isRtl%60%20is%20%60false%60.%5Cn-%20list%20markers%20prefixes%20and%20suffixes%20print%20order%20will%20be%20reversed.%5Cn%22%2C%22tags%22%3A%5B%7B%22tag%22%3A%22remarks%22%2C%22text%22%3A%22Beware%20that%20left%20and%20right%20padding%20of%20li%20elements%20*will%20not*%5Cnbe%20switched.%5Cn%22%7D%2C%7B%22tag%22%3A%22defaultvalue%22%2C%22text%22%3A%22false%5Cn%22%7D%5D%7D%2C%22sources%22%3A%5B%7B%22fileName%22%3A%22packages%2Frender-html%2Fsrc%2Fshared-types.ts%22%2C%22line%22%3A116%2C%22character%22%3A23%7D%5D%2C%22type%22%3A%7B%22type%22%3A%22intrinsic%22%2C%22name%22%3A%22boolean%22%7D%7D",mdxType:"DeclarationBox"}),(0,r.kt)("p",null,"If ",(0,r.kt)("inlineCode",{parentName:"p"},"true")," and the direction is set to ",(0,r.kt)("inlineCode",{parentName:"p"},"'rtl'")," (either via ",(0,r.kt)("inlineCode",{parentName:"p"},"dir")," attribute\nor ",(0,r.kt)("inlineCode",{parentName:"p"},"direction")," CSS property):"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"lists markers will be flushed to the right when ",(0,r.kt)("inlineCode",{parentName:"li"},"I18nManager.isRtl")," is ",(0,r.kt)("inlineCode",{parentName:"li"},"false"),"."),(0,r.kt)("li",{parentName:"ul"},"list markers prefixes and suffixes print order will be reversed.")),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"Remarks")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"Beware that left and right padding of li elements ",(0,r.kt)("em",{parentName:"p"},"will not"),"\nbe switched."))),(0,r.kt)("h3",{id:"enableremovebottommarginifnested"},(0,r.kt)("inlineCode",{parentName:"h3"},"enableRemoveBottomMarginIfNested")),(0,r.kt)(l.Z,{reflection:"%7B%22id%22%3A933%2C%22name%22%3A%22enableRemoveBottomMarginIfNested%22%2C%22kind%22%3A1024%2C%22kindString%22%3A%22Property%22%2C%22flags%22%3A%7B%22isOptional%22%3Atrue%7D%2C%22comment%22%3A%7B%22shortText%22%3A%22Remove%20bottom%20margin%20if%20this%20element%20parent%20is%20an%20%60li%60%20element%20and%20it%5Cnis%20its%20last%20child.%22%2C%22tags%22%3A%5B%7B%22tag%22%3A%22defaultvalue%22%2C%22text%22%3A%22true%5Cn%22%7D%5D%7D%2C%22sources%22%3A%5B%7B%22fileName%22%3A%22packages%2Frender-html%2Fsrc%2Fshared-types.ts%22%2C%22line%22%3A103%2C%22character%22%3A34%7D%5D%2C%22type%22%3A%7B%22type%22%3A%22intrinsic%22%2C%22name%22%3A%22boolean%22%7D%7D",mdxType:"DeclarationBox"}),(0,r.kt)("p",null,"Remove bottom margin if this element parent is an ",(0,r.kt)("inlineCode",{parentName:"p"},"li")," element and it\nis its last child."),(0,r.kt)("h3",{id:"enableremovetopmarginifnested"},(0,r.kt)("inlineCode",{parentName:"h3"},"enableRemoveTopMarginIfNested")),(0,r.kt)(l.Z,{reflection:"%7B%22id%22%3A932%2C%22name%22%3A%22enableRemoveTopMarginIfNested%22%2C%22kind%22%3A1024%2C%22kindString%22%3A%22Property%22%2C%22flags%22%3A%7B%22isOptional%22%3Atrue%7D%2C%22comment%22%3A%7B%22shortText%22%3A%22Remove%20top%20margin%20if%20this%20element%20parent%20is%20an%20%60li%60%20element%20and%20it%5Cnis%20its%20first%20child.%22%2C%22tags%22%3A%5B%7B%22tag%22%3A%22defaultvalue%22%2C%22text%22%3A%22true%5Cn%22%7D%5D%7D%2C%22sources%22%3A%5B%7B%22fileName%22%3A%22packages%2Frender-html%2Fsrc%2Fshared-types.ts%22%2C%22line%22%3A96%2C%22character%22%3A31%7D%5D%2C%22type%22%3A%7B%22type%22%3A%22intrinsic%22%2C%22name%22%3A%22boolean%22%7D%7D",mdxType:"DeclarationBox"}),(0,r.kt)("p",null,"Remove top margin if this element parent is an ",(0,r.kt)("inlineCode",{parentName:"p"},"li")," element and it\nis its first child."),(0,r.kt)("h3",{id:"getfallbackliststyletypefromnestlevel"},(0,r.kt)("inlineCode",{parentName:"h3"},"getFallbackListStyleTypeFromNestLevel")),(0,r.kt)(l.Z,{reflection:"%7B%22id%22%3A935%2C%22name%22%3A%22getFallbackListStyleTypeFromNestLevel%22%2C%22kind%22%3A1024%2C%22kindString%22%3A%22Property%22%2C%22flags%22%3A%7B%22isOptional%22%3Atrue%7D%2C%22comment%22%3A%7B%22shortText%22%3A%22Get%20default%20list-style-type%20given%20the%20number%20of%20nest%20level%20for%20this%20list.%22%2C%22tags%22%3A%5B%7B%22tag%22%3A%22param%22%2C%22text%22%3A%22The%20number%20of%20parents%20elements%20with%20the%20same%20tag%20name.%5Cn%22%2C%22param%22%3A%22nestLevel%22%7D%5D%7D%2C%22sources%22%3A%5B%7B%22fileName%22%3A%22packages%2Frender-html%2Fsrc%2Fshared-types.ts%22%2C%22line%22%3A122%2C%22character%22%3A39%7D%5D%2C%22type%22%3A%7B%22type%22%3A%22reflection%22%2C%22declaration%22%3A%7B%22id%22%3A936%2C%22name%22%3A%22__type%22%2C%22kind%22%3A65536%2C%22kindString%22%3A%22Type%20literal%22%2C%22flags%22%3A%7B%7D%2C%22signatures%22%3A%5B%7B%22id%22%3A937%2C%22name%22%3A%22__type%22%2C%22kind%22%3A4096%2C%22kindString%22%3A%22Call%20signature%22%2C%22flags%22%3A%7B%7D%2C%22parameters%22%3A%5B%7B%22id%22%3A938%2C%22name%22%3A%22nestLevel%22%2C%22kind%22%3A32768%2C%22kindString%22%3A%22Parameter%22%2C%22flags%22%3A%7B%7D%2C%22type%22%3A%7B%22type%22%3A%22intrinsic%22%2C%22name%22%3A%22number%22%7D%7D%5D%2C%22type%22%3A%7B%22type%22%3A%22reference%22%2C%22id%22%3A1241%2C%22name%22%3A%22DefaultSupportedListStyleType%22%7D%7D%5D%7D%7D%7D",mdxType:"DeclarationBox"}),(0,r.kt)("p",null,"Get default list-style-type given the number of nest level for this list."))}c.isMDXComponent=!0}}]);