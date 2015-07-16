!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror"),require("../xml/xml"),require("../meta")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../xml/xml","../meta"],t):t(CodeMirror)}(function(t){"use strict";t.defineMode("markdown",function(e,i){function n(i){if(t.findModeByName){var n=t.findModeByName(i);n&&(i=n.mime||n.mimes[0])}var r=t.getMode(e,i);return"null"==r.name?null:r}function r(t,e,i){return e.f=e.inline=i,i(t,e)}function a(t,e,i){return e.f=e.block=i,i(t,e)}function o(t){return t.linkTitle=!1,t.em=!1,t.strong=!1,t.strikethrough=!1,t.quote=0,L||t.f!=h||(t.f=m,t.block=l),t.trailingSpace=0,t.trailingSpaceNewLine=!1,t.thisLineHasContent=!1,null}function l(t,e){var a=t.sol(),o=e.list!==!1;e.list!==!1&&e.indentationDiff>=0?(e.indentationDiff<4&&(e.indentation-=e.indentationDiff),e.list=null):e.list!==!1&&e.indentation>0?(e.list=null,e.listDepth=Math.floor(e.indentation/4)):e.list!==!1&&(e.list=!1,e.listDepth=0);var l=null;if(e.indentationDiff>=4)return e.indentation-=4,t.skipToEnd(),M;if(t.eatSpace())return null;if(l=t.match(P))return e.header=l[0].length<=6?l[0].length:6,i.highlightFormatting&&(e.formatting="header"),e.f=e.inline,f(e);if(e.prevLineHasContent&&(l=t.match(z)))return e.header="="==l[0].charAt(0)?1:2,i.highlightFormatting&&(e.formatting="header"),e.f=e.inline,f(e);if(t.eat(">"))return e.indentation++,e.quote=a?1:e.quote+1,i.highlightFormatting&&(e.formatting="quote"),t.eatSpace(),f(e);if("["===t.peek())return r(t,e,p);if(t.match(U,!0))return T;if((!e.prevLineHasContent||o)&&(t.match(R,!1)||t.match(A,!1))){var h=null;return t.match(R,!0)?h="ul":(t.match(A,!0),h="ol"),e.indentation+=4,e.list=!0,e.listDepth++,i.taskLists&&t.match(I,!1)&&(e.taskList=!0),e.f=e.inline,i.highlightFormatting&&(e.formatting=["list","list-"+h]),f(e)}return i.fencedCodeBlocks&&t.match(/^```[ \t]*([\w+#]*)/,!0)?(e.localMode=n(RegExp.$1),e.localMode&&(e.localState=e.localMode.startState()),e.f=e.block=g,i.highlightFormatting&&(e.formatting="code-block"),e.code=!0,f(e)):r(t,e,e.inline)}function h(t,e){var i=F.token(t,e.htmlState);return(L&&null===e.htmlState.tagStart&&!e.htmlState.context||e.md_inside&&t.current().indexOf(">")>-1)&&(e.f=m,e.block=l,e.htmlState=null),i}function g(t,e){return t.sol()&&t.match("```",!1)?(e.localMode=e.localState=null,e.f=e.block=s,null):e.localMode?e.localMode.token(t,e.localState):(t.skipToEnd(),M)}function s(t,e){t.match("```"),e.block=l,e.f=m,i.highlightFormatting&&(e.formatting="code-block"),e.code=!0;var n=f(e);return e.code=!1,n}function f(t){var e=[];if(t.formatting){e.push(y),"string"==typeof t.formatting&&(t.formatting=[t.formatting]);for(var n=0;n<t.formatting.length;n++)e.push(y+"-"+t.formatting[n]),"header"===t.formatting[n]&&e.push(y+"-"+t.formatting[n]+"-"+t.header),"quote"===t.formatting[n]&&e.push(!i.maxBlockquoteDepth||i.maxBlockquoteDepth>=t.quote?y+"-"+t.formatting[n]+"-"+t.quote:"error")}if(t.taskOpen)return e.push("meta"),e.length?e.join(" "):null;if(t.taskClosed)return e.push("property"),e.length?e.join(" "):null;if(t.linkHref)return e.push(O),e.length?e.join(" "):null;if(t.strong&&e.push(E),t.em&&e.push(j),t.strikethrough&&e.push(W),t.linkText&&e.push(N),t.code&&e.push(M),t.header&&(e.push(q),e.push(q+"-"+t.header)),t.quote&&(e.push(w),e.push(!i.maxBlockquoteDepth||i.maxBlockquoteDepth>=t.quote?w+"-"+t.quote:w+"-"+i.maxBlockquoteDepth)),t.list!==!1){var r=(t.listDepth-1)%3;e.push(r?1===r?D:H:C)}return t.trailingSpaceNewLine?e.push("trailing-space-new-line"):t.trailingSpace&&e.push("trailing-space-"+(t.trailingSpace%2?"a":"b")),e.length?e.join(" "):null}function u(t,e){return t.match(G,!0)?f(e):void 0}function m(e,n){var r=n.text(e,n);if("undefined"!=typeof r)return r;if(n.list)return n.list=null,f(n);if(n.taskList){var o="x"!==e.match(I,!0)[1];return o?n.taskOpen=!0:n.taskClosed=!0,i.highlightFormatting&&(n.formatting="task"),n.taskList=!1,f(n)}if(n.taskOpen=!1,n.taskClosed=!1,n.header&&e.match(/^#+$/,!0))return i.highlightFormatting&&(n.formatting="header"),f(n);var l=e.sol(),g=e.next();if("\\"===g&&(e.next(),i.highlightFormatting)){var s=f(n);return s?s+" formatting-escape":"formatting-escape"}if(n.linkTitle){n.linkTitle=!1;var u=g;"("===g&&(u=")"),u=(u+"").replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");var m="^\\s*(?:[^"+u+"\\\\]+|\\\\\\\\|\\\\.)"+u;if(e.match(new RegExp(m),!0))return O}if("`"===g){var k=n.formatting;i.highlightFormatting&&(n.formatting="code");var p=f(n),v=e.pos;e.eatWhile("`");var x=1+e.pos-v;return n.code?x===b?(n.code=!1,p):(n.formatting=k,f(n)):(b=x,n.code=!0,f(n))}if(n.code)return f(n);if("!"===g&&e.match(/\[[^\]]*\] ?(?:\(|\[)/,!1))return e.match(/\[[^\]]*\]/),n.inline=n.f=d,B;if("["===g&&e.match(/.*\](\(.*\)| ?\[.*\])/,!1))return n.linkText=!0,i.highlightFormatting&&(n.formatting="link"),f(n);if("]"===g&&n.linkText&&e.match(/\(.*\)| ?\[.*\]/,!1)){i.highlightFormatting&&(n.formatting="link");var s=f(n);return n.linkText=!1,n.inline=n.f=d,s}if("<"===g&&e.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/,!1)){n.f=n.inline=c,i.highlightFormatting&&(n.formatting="link");var s=f(n);return s?s+=" ":s="",s+_}if("<"===g&&e.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/,!1)){n.f=n.inline=c,i.highlightFormatting&&(n.formatting="link");var s=f(n);return s?s+=" ":s="",s+$}if("<"===g&&e.match(/^\w/,!1)){if(-1!=e.string.indexOf(">")){var S=e.string.substring(1,e.string.indexOf(">"));/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(S)&&(n.md_inside=!0)}return e.backUp(1),n.htmlState=t.startState(F),a(e,n,h)}if("<"===g&&e.match(/^\/\w*?>/))return n.md_inside=!1,"tag";var L=!1;if(!i.underscoresBreakWords&&"_"===g&&"_"!==e.peek()&&e.match(/(\w)/,!1)){var q=e.pos-2;if(q>=0){var M=e.string.charAt(q);"_"!==M&&M.match(/(\w)/,!1)&&(L=!0)}}if("*"===g||"_"===g&&!L)if(l&&" "===e.peek());else{if(n.strong===g&&e.eat(g)){i.highlightFormatting&&(n.formatting="strong");var p=f(n);return n.strong=!1,p}if(!n.strong&&e.eat(g))return n.strong=g,i.highlightFormatting&&(n.formatting="strong"),f(n);if(n.em===g){i.highlightFormatting&&(n.formatting="em");var p=f(n);return n.em=!1,p}if(!n.em)return n.em=g,i.highlightFormatting&&(n.formatting="em"),f(n)}else if(" "===g&&(e.eat("*")||e.eat("_"))){if(" "===e.peek())return f(n);e.backUp(1)}if(i.strikethrough)if("~"===g&&e.eatWhile(g)){if(n.strikethrough){i.highlightFormatting&&(n.formatting="strikethrough");var p=f(n);return n.strikethrough=!1,p}if(e.match(/^[^\s]/,!1))return n.strikethrough=!0,i.highlightFormatting&&(n.formatting="strikethrough"),f(n)}else if(" "===g&&e.match(/^~~/,!0)){if(" "===e.peek())return f(n);e.backUp(2)}return" "===g&&(e.match(/ +$/,!1)?n.trailingSpace++:n.trailingSpace&&(n.trailingSpaceNewLine=!0)),f(n)}function c(t,e){var n=t.next();if(">"===n){e.f=e.inline=m,i.highlightFormatting&&(e.formatting="link");var r=f(e);return r?r+=" ":r="",r+_}return t.match(/^[^>]+/,!0),_}function d(t,e){if(t.eatSpace())return null;var n=t.next();return"("===n||"["===n?(e.f=e.inline=k("("===n?")":"]"),i.highlightFormatting&&(e.formatting="link-string"),e.linkHref=!0,f(e)):"error"}function k(t){return function(e,n){var r=e.next();if(r===t){n.f=n.inline=m,i.highlightFormatting&&(n.formatting="link-string");var a=f(n);return n.linkHref=!1,a}return e.match(S(t),!0)&&e.backUp(1),n.linkHref=!0,f(n)}}function p(t,e){return t.match(/^[^\]]*\]:/,!1)?(e.f=v,t.next(),i.highlightFormatting&&(e.formatting="link"),e.linkText=!0,f(e)):r(t,e,m)}function v(t,e){if(t.match(/^\]:/,!0)){e.f=e.inline=x,i.highlightFormatting&&(e.formatting="link");var n=f(e);return e.linkText=!1,n}return t.match(/^[^\]]+/,!0),N}function x(t,e){return t.eatSpace()?null:(t.match(/^[^\s]+/,!0),void 0===t.peek()?e.linkTitle=!0:t.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/,!0),e.f=e.inline=m,O)}function S(t){return J[t]||(t=(t+"").replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1"),J[t]=new RegExp("^(?:[^\\\\]|\\\\.)*?("+t+")")),J[t]}var L=t.modes.hasOwnProperty("xml"),F=t.getMode(e,L?{name:"xml",htmlMode:!0}:"text/plain");void 0===i.highlightFormatting&&(i.highlightFormatting=!1),void 0===i.maxBlockquoteDepth&&(i.maxBlockquoteDepth=0),void 0===i.underscoresBreakWords&&(i.underscoresBreakWords=!0),void 0===i.fencedCodeBlocks&&(i.fencedCodeBlocks=!1),void 0===i.taskLists&&(i.taskLists=!1),void 0===i.strikethrough&&(i.strikethrough=!1);var b=0,q="header",M="comment",w="quote",C="variable-2",D="variable-3",H="keyword",T="hr",B="tag",y="formatting",_="link",$="link",N="link",O="string",j="em",E="strong",W="strikethrough",U=/^([*\-=_])(?:\s*\1){2,}\s*$/,R=/^[*\-+]\s+/,A=/^[0-9]+\.\s+/,I=/^\[(x| )\](?=\s)/,P=/^#+/,z=/^(?:\={1,}|-{1,})$/,G=/^[^#!\[\]*_\\<>` "'(~]+/,J=[],K={startState:function(){return{f:l,prevLineHasContent:!1,thisLineHasContent:!1,block:l,htmlState:null,indentation:0,inline:m,text:u,formatting:!1,linkText:!1,linkHref:!1,linkTitle:!1,em:!1,strong:!1,header:0,taskList:!1,list:!1,listDepth:0,quote:0,trailingSpace:0,trailingSpaceNewLine:!1,strikethrough:!1}},copyState:function(e){return{f:e.f,prevLineHasContent:e.prevLineHasContent,thisLineHasContent:e.thisLineHasContent,block:e.block,htmlState:e.htmlState&&t.copyState(F,e.htmlState),indentation:e.indentation,localMode:e.localMode,localState:e.localMode?t.copyState(e.localMode,e.localState):null,inline:e.inline,text:e.text,formatting:!1,linkTitle:e.linkTitle,em:e.em,strong:e.strong,strikethrough:e.strikethrough,header:e.header,taskList:e.taskList,list:e.list,listDepth:e.listDepth,quote:e.quote,trailingSpace:e.trailingSpace,trailingSpaceNewLine:e.trailingSpaceNewLine,md_inside:e.md_inside}},token:function(t,e){if(e.formatting=!1,t.sol()){var i=!!e.header;if(e.header=0,t.match(/^\s*$/,!0)||i)return e.prevLineHasContent=!1,o(e),i?this.token(t,e):null;e.prevLineHasContent=e.thisLineHasContent,e.thisLineHasContent=!0,e.taskList=!1,e.code=!1,e.trailingSpace=0,e.trailingSpaceNewLine=!1,e.f=e.block;var n=t.match(/^\s*/,!0)[0].replace(/\t/g,"    ").length,r=4*Math.floor((n-e.indentation)/4);r>4&&(r=4);var a=e.indentation+r;if(e.indentationDiff=a-e.indentation,e.indentation=a,n>0)return null}return e.f(t,e)},innerMode:function(t){return t.block==h?{state:t.htmlState,mode:F}:t.localState?{state:t.localState,mode:t.localMode}:{state:t,mode:K}},blankLine:o,getType:f,fold:"markdown"};return K},"xml"),t.defineMIME("text/x-markdown","markdown")});