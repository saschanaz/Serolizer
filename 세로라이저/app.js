var Serolizer = (function () {
    function Serolizer() {
        this.regexDictionary = {
            '、': /,/g,
            '。': /\./g,
            '！': /!/g,
            '？': /\?/g,
            '「': /\//g,
            '』': /"/g,
            '　': /( |\t)/g
        };
    }
    Serolizer.prototype.convert = function (target, height) {
        var _this = this;
        var lines = this.replaceToFullWidth(target).split("\n");
        var results = [];
        lines.forEach(function (line) {
            results.push(_this.transformDirection(line, height));
        });

        var mergedLineArray = this.mergeMultipleTransformedArrays(results);
        return this.mergeLines(mergedLineArray);
    };

    Serolizer.prototype.mergeLines = function (lines) {
        var merged = '';
        lines.forEach(function (line) {
            merged += line + "\r\n";
        });
        return merged;
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

        //this.getTransformedEmptyArray(splitted).forEach((str: string) => {
        //    result += str + "\r\n";
        //});
        return this.getTransformedEmptyArray(splitted);
    };

    Serolizer.prototype.splitByLength = function (target, height) {
        var result = [];
        while (target.length > height) {
            result.push(this.fillSpace(target.slice(0, height), height));
            target = target.slice(height);
        }
        result.push(this.fillSpace(target, height));
        return result;
    };

    Serolizer.prototype.fillSpace = function (target, length) {
        while (target.length < length)
            target += '　';
        return target;
    };

    Serolizer.prototype.getTransformedEmptyArray = function (strarray) {
        var resultarray = [];
        for (var i = 0; i < strarray[0].length; i++) {
            resultarray.push('');
        }

        for (var i = 0; i < resultarray.length; i++)
            for (var i2 = strarray.length - 1; i2 >= 0; i2--)
                resultarray[i] += '　' + strarray[i2][i];
        return resultarray;
    };

    Serolizer.prototype.mergeTransformedArrays = function (strarray1, strarray2) {
        var result = [];
        for (var i = 0; i < strarray1.length; i++)
            result.push(strarray2[i] + strarray1[i]);
        return result;
    };

    Serolizer.prototype.mergeMultipleTransformedArrays = function (strarrays) {
        var result = strarrays[0];
        strarrays = strarrays.splice(1);
        while (strarrays.length > 0) {
            result = this.mergeTransformedArrays(result, strarrays[0]);
            strarrays = strarrays.splice(1);
        }
        return result;
    };
    return Serolizer;
})();
function convert() {
    textvertical.value = new Serolizer().convert(text.value, height.value);
}
convert();
//# sourceMappingURL=app.js.map
