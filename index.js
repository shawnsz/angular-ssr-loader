'use strict';

module.exports = function(source) {

    let retSource = source.replace(/templateUrl\s*:(\s*['"`](.*?)['"`]\s*([,}]))/gm, function(match, tempUrl) {
            return "template:" + addRequire(tempUrl);
        })
        .replace(/styleUrls *:(\s*\[[^\]]*?\])/g, function(match, sUrls) {
            return "styles:" + addRequire(sUrls);
        });

    return retSource;
};

function addRequire(strUrl) {
    return strUrl.replace(/(['`"])((?:[^\\]\\\1|.)*?)\1/g, function(match, p1, p2) {
        if (p2.charAt(0) !== ".") {
            return "require('" + "./" + p2 + "')";
        }
        return "require('" + p2 + "')";
    });
}
