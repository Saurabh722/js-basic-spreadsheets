"use strict";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var s=Object.prototype.toString.call(e).slice(8,-1);return"Object"===s&&e.constructor&&(s=e.constructor.name),"Map"===s||"Set"===s?Array.from(e):"Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s)?_arrayLikeToArray(e,t):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var s=0,n=new Array(t);s<t;s++)n[s]=e[s];return n}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(e){var t={};function s(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==_typeof(e)&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(n,o,function(t){return e[t]}.bind(null,o));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=1)}([function(e,t){window.qs=function(e,t){return(t||document).querySelector(e)},window.qsa=function(e,t){return(t||document).querySelectorAll(e)},window.$on=function(e,t,s,n){e.addEventListener(t,s,!!n)},window.$live=function(){var e={};function t(t){var s=t.target;e[t.type].forEach(function(e){var n=window.qsa(e.selector);Array.prototype.indexOf.call(n,s)>=0&&e.handler.call(s,t)})}return function(s,n,o){e[n]||(e[n]=[],"contextmenu"===n?window.contextMenu(s.split(","),n,t,!0):window.$on(document.documentElement,n,t,!0)),e[n].push({selector:s,handler:o})}}(),NodeList.prototype.forEach=Array.prototype.forEach},function(e,t,s){s.r(t),s(2),s(0);var n=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],o=n.length;function r(e){if(e<n.length)return n[e];for(var t=e%o,s=Math.ceil((e+1)/o),r="",a=0;a<s;a++)r+=n[t];return r}function a(e){var t=parseInt(e);return t==t&&"number"==typeof t?t:-1}function c(e){e.selectedRow=-1,e.selectedColumn=-1,e.selected=[],store.setState(e)}function l(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;t<e.rows;t++)e.matrixData[t].splice(e.selectedColumn,1);--e.columns,c(e)}var i={"update-spreadsheet-data":function(e,t){e.matrixData[t.rowIndex][t.colIndex]=t.value,store.setState(e)},"update-spreadsheet-columns":function(e,t){e.columns=t,store.setState(e)},"update-spreadsheet-rows":function(e,t){e.rows=t,store.setState(e)},"update-selected-column":function(e,t){e.selectedColumn=t,e.selectedRow=-1,e.selected=[t],store.setState(e)},"update-selected-columns":function(e,t){e.selectedColumn=t,e.selectedRow=-1,e.selected.push(t),store.setState(e)},"update-selected-row":function(e,t){e.selectedColumn=-1,e.selectedRow=t,e.selected=[t],store.setState(e)},"update-selected-rows":function(e,t){e.selectedColumn=-1,e.selectedRow=t,e.selected.push(t),store.setState(e)},"update-selected-row-column":function(e,t){e.selectedColumn=t.colIndex,e.selectedRow=t.rowIndex,store.setState(e),t.handler(t.rowIndex,t.colIndex,e.selected)},"sort-column":function(e){e.matrixData.sort(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"asc";return function(s,n){if(void 0===s[e]||void 0===n[e])return void 0!==s[e]?-1:0;var o="string"==typeof s[e]?s[e].toUpperCase():s[e],r="string"==typeof n[e]?n[e].toUpperCase():n[e],a=0;return o>r?a=1:o<r&&(a=-1),"desc"===t?-1*a:a}}(e.selectedColumn)),store.setState(e)},"reset-selected":function(e,t){t(e.selectedRow,e.selectedColumn),c(e)},"insert-above":function(e){e.matrixData.splice(e.selectedRow,0,new Array(e.columns)),++e.rows,store.setState(e)},"insert-below":function(e){e.matrixData.splice(e.selectedRow+1,0,new Array(e.columns)),++e.rows,store.setState(e)},"insert-left":function(e){for(var t=0;t<e.rows;t++)e.matrixData[t].splice(e.selectedColumn,0,[]);++e.columns,store.setState(e)},"insert-right":function(e){for(var t=0;t<e.rows;t++)e.matrixData[t].splice(e.selectedColumn+1,0,[]);++e.columns,store.setState(e)},"delete-row":function(e){e.matrixData.splice(e.selectedRow,1),e.selected=[],--e.rows,c(e)},"delete-rows":function(e){if(e.selected.length){var t=Math.min.apply(Math,_toConsumableArray(e.selected)),s=Math.max.apply(Math,_toConsumableArray(e.selected));e.matrixData.splice(t,s),e.rows=e.matrixData.length-1,c(e)}},"delete-column":l,"delete-columns":function(e){if(e.selected.length){for(var t=Math.min.apply(Math,_toConsumableArray(e.selected)),s=Math.max.apply(Math,_toConsumableArray(e.selected)),n=t;n<=s;n++)l(e,n);e.selected=[],c(e)}}};!function(){var e={stateInit:!1,rows:20,columns:20,selectedRow:-1,selectedColumn:-1,matrixData:[],selected:[]};window.store={getState:function(){return e},setState:function(t){e=t},publish:function(t,s){i[t](e,s)}}}();var d;function u(e,t){var s=e.srcElement||e.target;if(s.classList.contains(t))return s;for(;s=s.parentNode;)if(s.classList&&s.classList.contains(t))return s;return!1}function p(){contextMenu.show&&(contextMenu.show=!1,d.style.display="none")}function h(e,t,s){for(var n=!1,o=0;o<t.length;o++)u(e,t[o].trim().substring(1))&&(n=!0);n?(e.preventDefault(),contextMenu.show||(contextMenu.show=!0,d.style.display="block"),function(e){var t=function(e){var t=0,s=0;return e||(e=window.event),e.pageX||e.pageY?(t=e.pageX,s=e.pageY):(e.clientX||e.clientY)&&(t=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,s=e.clientY+document.body.scrollTop+document.documentElement.scrollTop),{x:t,y:s}}(e),s=t.x,n=t.y,o=d.offsetWidth+4,r=d.offsetHeight+4,a=window.innerWidth,c=window.innerHeight;d.style.left=a-s<o?a-o+"px":s+"px",d.style.top=c-n<r?c-r+"px":n+"px"}(e),s(e)):p()}!function(){var e=document.createElement("NAV");e.setAttribute("id","js-spreadsheet-context-menu"),e.classList.add("js-spreadsheet-context-menu"),e.innerHTML='\n\t\t<ul class="js-spreadsheet-context-menu__items">\n\t\t\t<li class="js-spreadsheet-context-menu__item">\n\t\t\t\t<a href="#" class="js-spreadsheet-context-menu__link js-spreadsheet-context-menu__col" data-action="trigger-sort">Sort</a>\n\t\t\t</li>\n\t\t\t<li class="js-spreadsheet-context-menu__item">\n\t\t\t\t<a href="#" class="js-spreadsheet-context-menu__link js-spreadsheet-context-menu__col" data-action="insert-left">Insert Left</a>\n\t\t\t</li>\n\t\t\t<li class="js-spreadsheet-context-menu__item">\n\t\t\t\t<a href="#" class="js-spreadsheet-context-menu__link js-spreadsheet-context-menu__col" data-action="insert-right">Insert Right</a>\n\t\t\t</li>\n\t\t\t<li class="js-spreadsheet-context-menu__item">\n\t\t\t\t<a href="#" class="js-spreadsheet-context-menu__link js-spreadsheet-context-menu__col" data-action="delete-column">Delete Column</a>\n\t\t\t</li>\n\t\t\t<li class="js-spreadsheet-context-menu__item">\n\t\t\t\t<a href="#" class="js-spreadsheet-context-menu__link js-spreadsheet-context-menu__col js-spreadsheet-context-menu__cols" data-action="delete-columns">Delete Columns</a>\n\t\t\t</li>\n\t\t\t<li class="js-spreadsheet-context-menu__item">\n\t\t\t\t<a href="#" class="js-spreadsheet-context-menu__link js-spreadsheet-context-menu__row" data-action="insert-above">Insert Above</a>\n\t\t\t</li>\n\t\t\t<li class="js-spreadsheet-context-menu__item">\n\t\t\t\t<a href="#" class="js-spreadsheet-context-menu__link js-spreadsheet-context-menu__row" data-action="insert-below">Insert Below</a>\n\t\t\t</li>\n\t\t\t<li class="js-spreadsheet-context-menu__item">\n\t\t\t\t<a href="#" class="js-spreadsheet-context-menu__link js-spreadsheet-context-menu__row" data-action="delete-row">Delete Row</a>\n\t\t\t</li>\n\t\t\t<li class="js-spreadsheet-context-menu__item">\n\t\t\t\t<a href="#" class="js-spreadsheet-context-menu__link js-spreadsheet-context-menu__row js-spreadsheet-context-menu__rows" data-action="delete-rows">Delete Rows</a>\n\t\t\t</li>\n\t\t</ul>',document.body.appendChild(e),window.contextMenu=function(e,t,s){d=qs("#js-spreadsheet-context-menu"),contextMenu.show=0,document.addEventListener("contextmenu",function(t){h(t,e,s)}),$on(document,"click",function(e){var t=u(e,"js-spreadsheet-context-menu__link"),s=u(e,"js-spreadsheet-head-menu-btn");t?(e.preventDefault(),p()):s||1===(e.which||e.button)&&p()})}}();var m={show:h,handler:function(e,t,s){var n=qs(".js-spreadsheet-context-menu__items");n.classList.remove("js-spreadsheet-context-menu__items--selected_row","js-spreadsheet-context-menu__items--selected_col","js-spreadsheet-context-menu__items--selected_rows","js-spreadsheet-context-menu__items--selected_cols"),"number"==typeof e&&-1!==e?s.length>1?n.classList.add("js-spreadsheet-context-menu__items--selected_rows"):n.classList.add("js-spreadsheet-context-menu__items--selected_row"):"number"==typeof t&&-1!==t&&(s.length>1?n.classList.add("js-spreadsheet-context-menu__items--selected_cols"):n.classList.add("js-spreadsheet-context-menu__items--selected_col"))}},f=function(){for(var e=store.getState(),t="",s=function(t,s){return e.matrixData[t][s]||""},n=0;n<=e.rows;n++){var o="";!e.stateInit&&n>0&&(e.matrixData[n-1]=new Array(e.columns));for(var a=0;a<=e.columns;a++)o+=0===n&&0===a?'<a class="js-spreadsheet-col js-spreadsheet-origin"></a>':0===n?'<a class="js-spreadsheet-col js-spreadsheet-col__index js-spreadsheet-col__'.concat(a,'" data-col="').concat(a-1,'">').concat(r(a-1),'<span class="js-spreadsheet-head-menu-btn" data-col="').concat(a-1,'">&#9660;</span></a>'):0===a?'<a class="js-spreadsheet-col js-spreadsheet-row__index js-spreadsheet-col__0" data-row="'.concat(n-1,'">').concat(n,'<span class="js-spreadsheet-head-menu-btn" data-row="').concat(n-1,'">&#9660;</span></a>'):'<a class="js-spreadsheet-col js-spreadsheet-col__'.concat(a,'" data-col="').concat(a-1,'"><textarea class="js-spreadsheet-cell" disabled data-row="').concat(n-1,'" data-col="').concat(a-1,'">').concat(s(n-1,a-1),"</textarea></a>");t+='<div class="js-spreadsheet-row js-spreadsheet-row_'.concat(n,'">').concat(o,"</div>")}return e.stateInit=!0,t},_=function(){return'\n    <section class="js-spreadsheet">\n        <div class="js-spreadsheet__container"></div>\n    </section>\n    '},w={jsSpreadsheet:null,render:function(){w.jsSpreadsheet.innerHTML=f()},selectColumn:function(e){qsa(".js-spreadsheet-col__"+(e+1)).forEach(function(e){e.classList.add("js-spreadsheet-col-selected")})},selectRow:function(e){qs(".js-spreadsheet-row_"+(e+1)).classList.add("js-spreadsheet-row-selected")},deSelectRowColumns:function(e,t){"number"==typeof t&&-1!==t&&qsa(".js-spreadsheet-col__"+(t+1)).forEach(function(e){e.classList.remove("js-spreadsheet-col-selected")}),"number"==typeof e&&-1!==e&&qs(".js-spreadsheet-row_"+(e+1)).classList.remove("js-spreadsheet-row-selected")},iterateSelected:function(e){var t=store.getState();if(t.selected.length)for(var s=Math.min.apply(Math,_toConsumableArray(t.selected)),n=Math.max.apply(Math,_toConsumableArray(t.selected)),o=s;o<=n;o++)w[e](o,o)},updateSelected:function(){},bind:function(){$live(".js-spreadsheet-cell","click",function(){a(this.getAttribute("data-row")),a(this.getAttribute("data-col")),this.disabled=!1,this.focus(),w.iterateSelected("deSelectRowColumns"),store.publish("reset-selected",w.deSelectRowColumns)}),$live(".js-spreadsheet-cell","blur",function(e){var t=a(this.getAttribute("data-row")),s=a(this.getAttribute("data-col"));store.publish("update-spreadsheet-data",{rowIndex:t,colIndex:s,value:this.value}),this.disabled=!0}),$live(".js-spreadsheet-col__index, .js-spreadsheet-row__index","contextmenu",function(){var e=a(this.getAttribute("data-row")),t=a(this.getAttribute("data-col"));store.publish("update-selected-row-column",{rowIndex:e,colIndex:t,handler:m.handler})}),$on(qs("[data-action=trigger-sort]"),"click",function(){store.publish("sort-column"),w.render()}),$live(".js-spreadsheet-head-menu-btn","click",function(e){e.preventDefault();var t=a(this.getAttribute("data-col")),s=a(this.getAttribute("data-row"));m.show(e,[".js-spreadsheet-head-menu-btn"],function(){store.publish("update-selected-row-column",{rowIndex:s,colIndex:t,handler:m.handler})})}),$live(".js-spreadsheet-col__index","click",function(e){var t=a(this.getAttribute("data-col")),s=store.getState();e.shiftKey?(-1!==s.selectedRow&&store.publish("reset-selected",w.deSelectRowColumns),store.publish("update-selected-columns",t),w.iterateSelected("selectColumn")):(-1!==s.selectedRow&&s.selected.length?w.iterateSelected("deSelectRowColumns"):store.publish("reset-selected",w.deSelectRowColumns),store.publish("update-selected-column",t),w.selectColumn(t))}),$live(".js-spreadsheet-row__index","click",function(e){var t=a(this.getAttribute("data-row")),s=store.getState();e.shiftKey?(-1!==s.selectedColumn&&store.publish("reset-selected",w.deSelectRowColumns),store.publish("update-selected-rows",t),w.iterateSelected("selectRow")):(-1!==s.selectedColumn&&s.selected.length?w.iterateSelected("deSelectRowColumns"):store.publish("reset-selected",w.deSelectRowColumns),store.publish("update-selected-row",t),w.selectRow(t))}),$on(qs("[data-action=insert-above]"),"click",function(){store.publish("insert-above"),w.render()}),$on(qs("[data-action=insert-below]"),"click",function(){store.publish("insert-below"),w.render()}),$on(qs("[data-action=insert-left]"),"click",function(){store.publish("insert-left"),w.render()}),$on(qs("[data-action=insert-right]"),"click",function(){store.publish("insert-right"),w.render()}),$on(qs("[data-action=delete-row]"),"click",function(){store.publish("delete-row"),w.render()}),$on(qs("[data-action=delete-rows]"),"click",function(){store.publish("delete-rows"),w.render()}),$on(qs("[data-action=delete-column]"),"click",function(){store.publish("delete-column"),w.render()}),$on(qs("[data-action=delete-columns]"),"click",function(){store.publish("delete-columns"),w.render()})},mainView:function(){var e=qs("#js-spreadsheet-app"),t=a(e.getAttribute("data-rows")),s=a(e.getAttribute("data-columns"));t&&store.publish("update-spreadsheet-rows",t),s&&store.publish("update-spreadsheet-columns",s),e.innerHTML=_(),w.jsSpreadsheet=qs(".js-spreadsheet__container")},init:function(){w.mainView(),w.render(),w.bind()}};w.init()},function(e,t){}]);