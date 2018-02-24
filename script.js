var input = document.getElementById('file-input');
var result = document.getElementById('result');

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

input.addEventListener('change', function() {
    var file = input.files[0];
    var reader  = new FileReader();

    reader.addEventListener('load', function () {
        var img = new Image();
        img.src = reader.result;
        img.addEventListener('load', function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            console.time('processImage');
            processImage(img);
            console.timeEnd('processImage');
        }, false);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
});

function processImage(img) {
    var chars =  ['&nbsp;', '\'', '.', ':', '|', 'T',  'X', '0', '#'];

    var width = img.width;
    var height = img.height;
    var markup = '';

    // in here our scale is 3 - it means we count only 1 of 3 pixels
    for(var y = 0; y < height; y += 3) {
        for(var x = 0; x < width; x += 3) {
            // get rgb
            var pixel = ctx.getImageData(x, y, 1, 1);
            var data = pixel.data;
            var r = data[0];
            var g = data[1];
            var b = data[2];

            // get the relevant character
            var index = Math.floor((r + g + b) * (chars.length - 1) /(255 * 3));
            var ch = chars[index];
            markup += ch;
        }
        markup += '<br>';
    }
    result.innerHTML = markup;
}
