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
        '　': /( |\t)/g
    }

    convert(target: string, height: number) {
        var lines = this.replaceToFullWidth(target).split("\n");
        var results: string[][] = [];
        lines.forEach((line) => {
            results.push(this.transformDirection(line, height));
        });

        var mergedLineArray = this.mergeMultipleTransformedArrays(results);
        return this.mergeLines(mergedLineArray);
    }

    private mergeLines(lines: string[]) {
        var merged = '';
        lines.forEach((line) => {
            merged += line + "\r\n";
        });
        return merged;
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
        //this.getTransformedEmptyArray(splitted).forEach((str: string) => {
        //    result += str + "\r\n";
        //});

        return this.getTransformedEmptyArray(splitted);
    }

    private splitByLength(target: string, height: number) {
        var result: string[] = [];
        while (target.length > height) {
            result.push(this.fillSpace(target.slice(0, height), height));
            target = target.slice(height);
        }
        result.push(this.fillSpace(target, height));
        return result;
    }

    private fillSpace(target: string, length: number) {
        while (target.length < length)
            target += '　';
        return target;
    }

    private getTransformedEmptyArray(strarray: string[]) {
        var resultarray = [];
        for (var i = 0; i < strarray[0].length; i++) {
            resultarray.push('');
        }

        for (var i = 0; i < resultarray.length; i++)
            for (var i2 = strarray.length - 1; i2 >= 0; i2--)
                resultarray[i] += '　' + strarray[i2][i];
        return resultarray;
    }

    private mergeTransformedArrays(strarray1: string[], strarray2: string[]) {
        var result: string[] = [];
        for (var i = 0; i < strarray1.length; i++)
            result.push(strarray2[i] + strarray1[i]);
        return result;
    }

    private mergeMultipleTransformedArrays(strarrays: string[][]) {
        var result = strarrays[0];
        strarrays = strarrays.splice(1);
        while (strarrays.length > 0) {
            result = this.mergeTransformedArrays(result, strarrays[0]);
            strarrays = strarrays.splice(1);
        }
        return result;
    }
}
function convert() {
    textvertical.value = new Serolizer().convert(text.value, <number><any>height.value);
}
convert();