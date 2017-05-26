//original code is from http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
class Imagenator {
    static convertText(text: string = "표　　　표　　　고　으　로　리\r\n로　온　랑　문　　　로　　　스\r\n　　점　　　자　죽　　　만　트\r\n치　과　마　더　간　스　들　도\r\n환　　　침　　　배　크　고\r\n！　꺾　표　따　경　롤　　　세\r\n　　음　를　옴　에　하　옆　로") {
        const canvas = document.createElement('canvas');
        canvas.width = 578;
        canvas.height = 120;
        const maxWidth = 440;
        const lineHeight = 28;
        const context = canvas.getContext('2d');
        context.font = '22px/28px Georgia, "Times New Roman", serif';
        canvas.height += this._measureHeight(context, text, maxWidth, lineHeight);
        const x = (canvas.width - maxWidth) / 2;
        const y = 60;

        //context = canvas.getContext('2d');
        context.font = '22px/28px Georgia, "Times New Roman", serif';
        context.fillStyle = "#FFF";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#000';

        this._writeText(context, text, x, y, maxWidth, lineHeight);
        return canvas.toDataURL('image/png');
    }

    private static _writeText(context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
        const words = text.split('');
        let line = '';

        for (var n = 0; n < words.length; n++) {
            if (words[n] == '\n') {
                y += lineHeight;
                context.fillText(line, x, y);
                line = '';
                continue;
            }

            const testLine = line + words[n] + ' ';
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                y += lineHeight;
                context.fillText(line, x, y);
                line = words[n] + ' ';
            }
            else {
                line = testLine;
            }
        }
        if (line.length > 0) {
            y += lineHeight;
            context.fillText(line, x, y);
        }
    }

    private static _measureHeight(context: CanvasRenderingContext2D, text: string, maxWidth: number, lineHeight: number) {
        const words = text.split('');
        let line = '';
        let height = 0;

        for (var n = 0; n < words.length; n++) {
            if (words[n] == '\n') {
                line = '';
                height += lineHeight;
                continue;
            }

            const testLine = line + words[n] + ' ';
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                line = words[n] + ' ';
                height += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        if (line.length > 0) {
            height += lineHeight;
        }
        return height;
    }
}