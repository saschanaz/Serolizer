//TODO: 높이 대신 너비로 설정하기도 가능하게
var Serolizer = (function () {
    function Serolizer() {
        this.regexDictionary = {
            '。': /\./g,
            '？': /\?/g,
            '（': /\)/g,
            '）': /\(/g,
            '／': /\//g,
            '　': /( |\t)/g
        };
        this.quotationDictionary = {
            '「」＇': '\'',
            '『』』': '"'
        };
        this.charDictionary = {
            '、': ',',
            '！': '!',
            '＠': '@',
            'ㅣ': '-',
            '「': '‘',
            '」': '’',
            '『': '“',
            '』': '”'
        };
        var list = "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｘｙｘｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ".split('');
        var dict = this.charDictionary;
        list.forEach(function (char) {
            dict[char] = String.fromCharCode(char.charCodeAt(0) - 65248);
        });
    }
    Serolizer.prototype.convert = function (target, height) {
        var _this = this;
        var lines = this.replaceToFullWidth(target).split("\n");
        var results = [];
        lines.forEach(function (line) {
            results.push(_this.transformDirection(line, height));
        });

        var mergedLineArray = this.mergeMultipleTransformedArrays(results);
        return this.mergeLines(this.optimizeLines(mergedLineArray));
    };

    Serolizer.prototype.mergeLines = function (lines) {
        var merged = '';
        lines.forEach(function (line) {
            merged += line + "\r\n";
        });
        return merged;
    };

    Serolizer.prototype.replaceToFullWidth = function (target) {
        for (var fullwidth in this.regexDictionary)
            target = target.replace(this.regexDictionary[fullwidth], fullwidth);
        for (var fullwidth in this.charDictionary)
            target = target.replace(new RegExp(this.charDictionary[fullwidth], 'g'), fullwidth);
        return this.replaceQuotations(target);
    };

    Serolizer.prototype.replaceQuotations = function (target) {
        for (var quotationmark in this.quotationDictionary) {
            var first = true;
            var match = target.match(new RegExp(this.quotationDictionary[quotationmark], 'g'));
            if (match) {
                var regexp = new RegExp(this.quotationDictionary[quotationmark]);
                for (var i = 0; i < Math.floor(match.length / 2) * 2; i++) {
                    if (first)
                        target = target.replace(regexp, quotationmark[0]);
else
                        target = target.replace(regexp, quotationmark[1]);
                    first = !first;
                }
                if (first && match.length != Math.floor(match.length / 2) * 2)
                    target = target.replace(regexp, quotationmark[2]);
            }
        }
        return target;
    };

    Serolizer.prototype.transformDirection = function (target, height) {
        var result = '';
        var splitted = this.splitByLength(target, height);

        //this.getTransformedEmptyArray(splitted).forEach((str: string) => {
        //    result += str + "\r\n";
        //});
        return this.getTransformedArray(splitted);
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

    Serolizer.prototype.getTransformedArray = function (strarray) {
        var insertExtraSpace = extraspace.checked;
        var resultarray = [];
        for (var i = 0; i < strarray[0].length; i++) {
            resultarray.push('');
        }

        if (insertExtraSpace)
            for (var i = 0; i < resultarray.length; i++)
                for (var i2 = strarray.length - 1; i2 >= 0; i2--)
                    resultarray[i] += '　' + strarray[i2][i];
else
            for (var i = 0; i < resultarray.length; i++)
                for (var i2 = strarray.length - 1; i2 >= 0; i2--)
                    resultarray[i] += strarray[i2][i];
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

    Serolizer.prototype.optimizeLines = function (strarray) {
        var resultarray = [];
        var insertExtraSpace = extraspace.checked;
        strarray.forEach(function (str) {
            if (insertExtraSpace)
                str = str.slice(1);
            while (str[str.length - 1] === '　')
                str = str.slice(0, str.length - 1);
            resultarray.push(str);
        });
        while (resultarray[resultarray.length - 1].length == 0)
            resultarray.pop();
        return resultarray;
    };
    return Serolizer;
})();
function convert() {
    textvertical.innerHTML = new Serolizer().convert(text.value, height.value).replace(/\n/g, '<br />');
}
function selectAll() {
    var range = document.createRange();
    range.selectNodeContents(textvertical);
    getSelection().addRange(range);
}
function getImage() {
    var popup = window.open();
    setImage(popup.document);
}
function setImage(doc) {
    while (doc.body.firstChild)
        doc.body.removeChild(doc.body.firstChild);
    var img = doc.createElement('img');
    img.src = Imagenator.convertText(new Serolizer().convert(text.value, height.value));
    doc.body.appendChild(img);
}
convert();
//# sourceMappingURL=app.js.map
