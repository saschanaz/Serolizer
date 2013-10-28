declare var text: HTMLTextAreaElement;
declare var textvertical: HTMLTextAreaElement;
declare var height: HTMLInputElement;

class Serolizer {
    private regexDictionary = {
        '、': /,/g,
        '。': /\./g,
        '！': /!/g,
        '？': /\?/g,
        '「': /\//g,
        '』': /"/g,
        '　': / /g
    }

    convert(target: string, height: number) {
        var result = this.replaceToFullWidth(target.replace(/(\r|\n|\t)/g, ''));

        return this.transformDirection(result, height);
    }

    private replaceToFullWidth(target: string) {
        for (var fullwidth in this.regexDictionary) {
            target = target.replace(<RegExp>this.regexDictionary[fullwidth], fullwidth);
        }
        return target;
    }

    private transformDirection(target: string, height: number) {
        var result = '';
        var splitted = this.splitByLength(target, height);
        this.getTransformedEmptyArray(splitted).forEach((str: string) => {
            result += str + "\r\n";
        });

        return result;
    }

    private splitByLength(target: string, height: number) {
        var result: string[] = [];
        while (target.length > height) {
            result.push(target.slice(0, height));
            target = target.slice(height);
        }
        result.push(target);
        return result;
    }

    private getTransformedEmptyArray(strarray: string[]) {
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
    }
}
function convert() {
    textvertical.value = new Serolizer().convert(text.value, <number><any>height.value);
}
convert();