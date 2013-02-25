
/**
 * Gist object
 */
var gist = function (gistNumber, file, lines)
{
    document.write('<script src="https://gist.github.com/'+gistNumber+'.js?file='+encodeURIComponent(file)+'"></script>');

    if (lines != undefined && lines != null) {
        var gistNumberParts = gistNumber.split('/');
        if (gistNumberParts.length == 2) {
            gistNumber = gistNumberParts[1];
        }
        var id = '#gist' + gistNumber + ' #file-' + file.replace('.', '-').toLowerCase() + '-LC%d';
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

