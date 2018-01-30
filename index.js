var postcss = require('postcss');

// !singlequotes|!doublequotes|!url()|pixelunit
var pxRegex = /"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)px/g;

module.exports = postcss.plugin('postcss-px-to-vh', function (options) {
 
    return function (css) {
  
        options = options || {};

        css.walkRules(function (rule) {
            rule.walkDecls(function (decl, i) {
                if (decl === 'font-size') return;
                if (decl.value.indexOf('px') === -1) return;
                
                decl.value = decl.value.replace(pxRegex, function(pxSize) {
                    var num = parseInt(pxSize);
                    var vhNum = num * window.innerHeight / 100;
                    return vhNum + 'vh';
                });

            });
         
        });
    }
 
});
