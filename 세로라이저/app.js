var Serolizer = (function () {
    function Serolizer() {
        this.regexDictionary = {
            '、': /,/g,
            '。': /\./g,
            '！': /!/g,
            '？': /\?/g,
            '「': /\//g,
            '』': /"/g,
            '　': / /g
        };
    }
    Serolizer.prototype.convert = function (target, height) {
        var result = this.replaceToFullWidth(target.replace(/(\r|\n|\t)/g, ''));

        return this.transformDirection(result, height);
    };

    Serolizer.prototype.replaceToFullWidth = function (target) {
        for (var fullwidth in this.regexDictionary) {
            target = target.replace(this.regexDictionary[fullwidth], fullwidth);
        }
        return target;
    };

    Serolizer.prototype.transformDirection = function (target, height) {
        var result = '';
        var splitted = this.splitByLength(target, height);
        this.getTransformedEmptyArray(splitted).forEach(function (str) {
            result += str + "\r\n";
        });

        return result;
    };

    Serolizer.prototype.splitByLength = function (target, height) {
        var result = [];
        while (target.length > height) {
            result.push(target.slice(0, height));
            target = target.slice(height);
        }
        result.push(target);
        return result;
    };

    Serolizer.prototype.getTransformedEmptyArray = function (strarray) {
        var resultarray = [];
        for (var i = 0; i < strarray[0].length; i++) {
            resultarray.push('');
        }

        for (var i = 0; i < resultarray.length; i++)
            for (var i2 = strarray.length - 1; i2 >= 0; i2--) {
                var char = strarray[i2][i];
                resultarray[i] += '　' + (char !== undefined ? strarray[i2][i] : '　');
            }
        return resultarray;
    };
    return Serolizer;
})();
function convert() {
    textvertical.value = new Serolizer().convert(text.value, height.value);
}
convert();
//# sourceMappingURL=app.js.map
