//TODO: 높이 대신 너비로 설정하기도 가능하게
class Serolizer {
    constructor() {
        this._regexDictionary = {
            '。': /\./g,
            '？': /\?/g,
            '（': /\)/g,
            '）': /\(/g,
            '／': /\//g,
            '　': /( |\t)/g,
        };
        this._quotationDictionary = {
            '「」＇': '\'',
            '『』』': '"',
        };
        this._charDictionary = {
            '、': ',',
            '！': '!',
            '＠': '@',
            'ㅣ': '-',
            '「': '‘',
            '」': '’',
            '『': '“',
            '』': '”',
        };
        const list = "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｘｙｘｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ".split('');
        const dict = this._charDictionary;
        for (const char of list) {
            dict[char] = String.fromCharCode(char.charCodeAt(0) - 65248);
        }
    }
    convert(target, height) {
        const lines = this._replaceToFullWidth(target).split("\n");
        const results = lines.map(line => this._transformDirection(line, height));
        const mergedLineArray = this._mergeMultipleTransformedArrays(results);
        return this._optimizeLines(mergedLineArray).join("\r\n");
    }
    _replaceToFullWidth(target) {
        for (const fullwidth in this._regexDictionary) {
            target = target.replace(this._regexDictionary[fullwidth], fullwidth);
        }
        for (const fullwidth in this._charDictionary) {
            target = target.replace(new RegExp(this._charDictionary[fullwidth], 'g'), fullwidth);
        }
        return this._replaceQuotations(target);
    }
    _replaceQuotations(target) {
        for (const quotationMark in this._quotationDictionary) {
            let first = true;
            const match = target.match(new RegExp(this._quotationDictionary[quotationMark], 'g'));
            if (match) {
                const regexp = new RegExp(this._quotationDictionary[quotationMark]);
                for (let i = 0; i < Math.floor(match.length / 2) * 2; i++) {
                    target = target.replace(regexp, quotationMark[first ? 0 : 1]);
                    first = !first;
                }
                if (first && match.length != Math.floor(match.length / 2) * 2) {
                    target = target.replace(regexp, quotationMark[2]);
                }
            }
        }
        return target;
    }
    _transformDirection(target, height) {
        const result = '';
        const splitted = this._splitByLength(target, height);
        //this.getTransformedEmptyArray(splitted).forEach((str: string) => {
        //    result += str + "\r\n";
        //});
        return this._getTransformedArray(splitted);
    }
    _splitByLength(target, height) {
        const result = [];
        while (target.length > height) {
            result.push(this._fillSpace(target.slice(0, height), height));
            target = target.slice(height);
        }
        result.push(this._fillSpace(target, height));
        return result;
    }
    _fillSpace(target, length) {
        while (target.length < length) {
            target += '　';
        }
        return target;
    }
    _getTransformedArray(strarray) {
        const extraSpace = extraspace.checked ? '　' : '';
        const resultarray = new Array(strarray[0].length).fill('');
        for (let i = 0; i < resultarray.length; i++) {
            for (let i2 = strarray.length - 1; i2 >= 0; i2--) {
                resultarray[i] += extraSpace + strarray[i2][i];
            }
        }
        return resultarray;
    }
    _mergeTransformedArrays(strarray1, strarray2) {
        const result = [];
        for (let i = 0; i < strarray1.length; i++) {
            result.push(strarray2[i] + strarray1[i]);
        }
        return result;
    }
    _mergeMultipleTransformedArrays(strarrays) {
        let result = strarrays[0];
        strarrays = strarrays.splice(1);
        while (strarrays.length > 0) {
            result = this._mergeTransformedArrays(result, strarrays[0]);
            strarrays = strarrays.splice(1);
        }
        return result;
    }
    _optimizeLines(strarray) {
        const insertExtraSpace = extraspace.checked;
        const resultarray = strarray.map(str => {
            if (insertExtraSpace) {
                str = str.slice(1);
            }
            while (str[str.length - 1] === '　') {
                str = str.slice(0, str.length - 1);
            }
            return str;
        });
        while (resultarray[resultarray.length - 1].length === 0) {
            resultarray.pop();
        }
        return resultarray;
    }
}
function convert() {
    textvertical.innerHTML = new Serolizer().convert(text.value, Number.parseInt(height.value)).replace(/\n/g, '<br />');
}
function selectAll() {
    const range = document.createRange();
    range.selectNodeContents(textvertical);
    getSelection().addRange(range);
}
function getImage() {
    const popup = window.open();
    setImage(popup.document);
}
function setImage(doc) {
    while (doc.body.firstChild) {
        doc.body.removeChild(doc.body.firstChild);
    }
    const img = doc.createElement("img");
    img.src = Imagenator.convertText(new Serolizer().convert(text.value, Number.parseInt(height.value)));
    doc.body.appendChild(img);
}
document.addEventListener("DOMContentLoaded", () => {
    convert();
    convertButton.addEventListener("click", () => convert());
    selectAllButton.addEventListener("click", () => selectAll());
    getImageButton.addEventListener("click", () => getImage());
});
