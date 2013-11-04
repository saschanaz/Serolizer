var Imagenator = (function () {
    function Imagenator() {
    }
    Imagenator.convertText = function (text) {
        if (typeof text === "undefined") { text = "표　　　표　　　고　으　로　리\r\n로　온　랑　문　　　로　　　스\r\n　　점　　　자　죽　　　만　트\r\n치　과　마　더　간　스　들　도\r\n환　　　침　　　배　크　고\r\n！　꺾　표　따　경　롤　　　세\r\n　　음　를　옴　에　하　옆　로"; }
        var canvas = document.createElement('canvas');
        canvas.width = 578;
        canvas.height = 120;
        var maxWidth = 440;
        var lineHeight = 28;
        var context = canvas.getContext('2d');
        context.font = '22px/28px Georgia, "Times New Roman", serif';
        canvas.height += this.measureHeight(context, text, maxWidth, lineHeight);
        var x = (canvas.width - maxWidth) / 2;
        var y = 60;

        //context = canvas.getContext('2d');
        context.font = '22px/28px Georgia, "Times New Roman", serif';
        context.fillStyle = "#FFF";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#333';

        this.wrapText(context, text, x, y, maxWidth, lineHeight);
        return canvas.toDataURL('image/png');
    };

    Imagenator.wrapText = function (context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for (var n = 0; n < words.length; n++) {
            //for (var i = 0; i < words[n].length; i++) {
            //    if (words[n][i] === '\n') {
            //        y += lineHeight;
            //        context.fillText(line, x, y);
            //        line = '';
            //        break;
            //    }
            //}
            //if (
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                y += lineHeight;
                context.fillText(line, x, y);
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }
        if (line.length > 0) {
            y += lineHeight;
            context.fillText(line, x, y);
        }
    };

    Imagenator.measureHeight = function (context, text, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';
        var height = 0;

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                line = words[n] + ' ';
                height += lineHeight;
            } else {
                line = testLine;
            }
        }
        if (line.length > 0)
            height += lineHeight;
        return height;
    };
    return Imagenator;
})();
//# sourceMappingURL=imaginator.js.map
