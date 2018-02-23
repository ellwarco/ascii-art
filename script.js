var canvas = document.getElementById('canvas');
var input = document.getElementById('file-input');
var ctx = canvas.getContext('2d');

input.addEventListener('change', function() {
    var file = input.files[0];
    var reader  = new FileReader();

    reader.addEventListener('load', function () {
        var img = new Image();
        img.src = reader.result;
        img.addEventListener('load', function() {
            ctx.drawImage(img, 0, 0);
        }, false);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
});
