(function () {

    function BiltFileManager() {
    }

    BiltFileManager.prototype = new less.FileManager();

    BiltFileManager.prototype.tryAppendLessExtension = function (path) {
        return path;
    };

    BiltFileManager.prototype.resolve = function (filename, currentDirectory) {
        console.log(filename, currentDirectory);
    };

    less.environment.addFileManager(BiltFileManager);

    /*    _(window['BILT_LESS']).each(function (less_template, n) {
     less.render(less_template()).done(function (output) {
     $('<style type="text/css" id="bilt_' + n.replace(/\W+/, '_') + '" class="bilt_less_css"></style>')
     .text(output.css)
     .appendTo('head');
     });
     });*/

    $(function () {
        $('style[type="text/less"]').each(function (n, el) {
            var $el = $(el);
            less.render($el.text()).done(function (output) {
                $el.text(output.css).attr('type', 'text/css').appendTo('head');
            });
        });
    });

})();
