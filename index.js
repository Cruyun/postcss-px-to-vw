var postcss = require('postcss');

// !singlequotes|!doublequotes|!url()|pixelunit
var pxRegex = /"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)px/g;

var Default = {
    vwUnit: 360
}

module.exports = postcss.plugin('postcss-px-to-vw', function (options) {
 
    return function (css) {
        options = options || {};

        var opts = Object.assign({}, Default, options);

        css.walkRules(function (rule) {
            rule.walkDecls(function (decl, i) {
                if (decl.prop === 'font-size' || (decl.prop.indexOf('border') != -1)) return;
                if (decl.value.indexOf('px') === -1) return;

                decl.value = decl.value.replace(pxRegex, function(pxSize) {
                    var num = parseInt(pxSize);
                    var vwNum = num * opts.vwUnit / 100;
                    return vwNum + 'vw';
                });
            });
        });
    }
});
