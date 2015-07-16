(function(){var e=[].indexOf||function(e){for(var n=0,t=this.length;t>n;n++)if(n in this&&this[n]===e)return n;return-1};angular.module("localytics.directives",[]),angular.module("localytics.directives").directive("chosen",function(){var n,t,r,a;return t=/^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/,n=["noResultsText","allowSingleDeselect","disableSearchThreshold","disableSearch","enableSplitWordSearch","inheritSelectClasses","maxSelectedOptions","placeholderTextMultiple","placeholderTextSingle","searchContains","singleBackstrokeDelete","displayDisabledOptions","displaySelectedOptions","width"],a=function(e){return e.replace(/[A-Z]/g,function(e){return"_"+e.toLowerCase()})},r=function(e){var n;if(angular.isArray(e))return 0===e.length;if(angular.isObject(e))for(n in e)if(e.hasOwnProperty(n))return!1;return!0},{restrict:"A",require:"?ngModel",terminal:!0,link:function(i,s,l,o){var c,u,d,h,f,g,p,v,$,w,b,y,S;return s.addClass("localytics-chosen"),p=i.$eval(l.chosen)||{},angular.forEach(l,function(t,r){return e.call(n,r)>=0?p[a(r)]=i.$eval(t):void 0}),w=function(){return s.addClass("loading").attr("disabled",!0).trigger("chosen:updated")},b=function(){return s.removeClass("loading").attr("disabled",!1).trigger("chosen:updated")},c=null,u=null,h=!1,f=function(){return c?s.trigger("chosen:updated"):(c=s.chosen(p).data("chosen"),u=c.default_text)},$=function(){return h=!1,s.attr("data-placeholder",u)},d=function(){return h=!0,s.attr("data-placeholder",c.results_none_found).attr("disabled",!0).trigger("chosen:updated")},o?(v=o.$render,o.$render=function(){return v(),f()},l.multiple&&(S=function(){return o.$viewValue},i.$watch(S,o.$render,!0))):f(),l.$observe("disabled",function(){return s.trigger("chosen:updated")}),l.ngOptions&&o?(g=l.ngOptions.match(t),y=g[7],i.$watchCollection(y,function(e){return angular.isUndefined(e)?w():(h&&$(),b(),r(e)?d():void 0)})):void 0}}})}).call(this);