
/**
 * Gist object
 */
var gist = function (gistNumber, file, lines = null)
{
    document.write('<script src="https://gist.github.com/'+gistNumber+'.js?file='+file+'"></script>');

    if (lines != null) {
        var id = '#gist' + gistNumber + ' #file-' + file.replace('.', '-') + '-LC%d';
        var style = $('style[for=gists]');
        parts = lines.split(',');
        for (var i in parts) {
            lines = parts[i].split('-');
            if (lines.length == 2) {
                for (var line = lines[0]; line <= lines[1]; line++) {
                    style.html(style.html() + id.replace('%d', line) + '{background-color:rgb(255,255,204);}');
                }
            } else {
                style.html(style.html() + id.replace('%d', lines[0]) + '{background-color:rgb(255,255,204);}');
            }
        }
    }
}

