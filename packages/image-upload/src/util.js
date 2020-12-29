 /* eslint-disable */ 
require('som-ui/src/utils/canvas-toBlob-polyfill.js');
const EXIF = require('./exif');

function compress (file, quality, callback) {
    let reader = new FileReader(), 
    img = new Image();
    reader.readAsDataURL(file);
    let canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
    reader.onload = (e) => {
        img.src = e.target.result;
    }
    img.onload = (e) => {
        let width = img.width, height = img.height, zoomRatio = 1;
        let shortSide = Math.min(width, height);
        let longSide = Math.max(width, height);
        let scale = shortSide / longSide;
        if (scale > 0.5625 && scale <= 1) {
            if (longSide < 1664) {
                zoomRatio = 1;
            } else if (longSide >= 1664 && longSide < 4990) {
                zoomRatio = 2;
            } else if (longSide >= 4990 && longSide < 10240) {
                zoomRatio = 4;
            } else {
                zoomRatio = longSide > 1280 ? Math.floor(longSide / 1280) : 1;
            }
        } else if (scale > 0.5 && scale <= 0.5625) {
            zoomRatio = longSide > 1280 ? Math.floor(longSide / 1280) : 1;
        } else {
            zoomRatio = Math.ceil(longSide / (1280 / scale));
        }
        width = width / Math.pow(2, zoomRatio - 1);
        height = height / Math.pow(2, zoomRatio - 1);
        EXIF.getData(img, function () { // ios方向纠正
            let orientation = EXIF.getTag(this, 'Orientation');
            switch (orientation) {
                case 3:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.rotate(180 * Math.PI / 180);
                    ctx.drawImage(img, 0, 0, -width, -height);
                    break;
                case 6:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.rotate(90 * Math.PI / 180);
                    ctx.drawImage(img, 0, 0, width, -height);
                    break;
                case 8:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.rotate(270 * Math.PI / 180);
                    ctx.drawImage(img, 0, 0, -width, height);
                    break;
                default:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, width, height);
            }
            canvas.toBlob((blob) => {
                callback(blob);
            }, 'image/jpeg', quality || 0.5);
        });
    };
}

export default {
    compress
};
