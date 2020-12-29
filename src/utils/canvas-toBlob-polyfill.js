if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (callback, type, quality) {
            let dataURL = this.toDataURL(type, quality).split(',')[1];
            setTimeout(function() {
                let binStr = atob(dataURL);
                let len = binStr.length;
                let arr = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    arr[i] = binStr.charCodeAt(i);
                }
                callback(new Blob([arr], {type: type || 'image/png'}));
            });
        }
    });
}
