(function () {

    window._ = Lazy;

    function BiltFileManager() {}

    BiltFileManager.prototype = new less.FileManager();

    BiltFileManager.prototype.loadFile = function(filename, currentDirectory, options, environment, callback) {
        var that = this;
        var path = currentDirectory + filename;
        if(path.match(/^bilt\/|mixins\//)) {
            if(path.match(/^mixins\//)) {
                path = 'bilt/' + path;
            }
            if(typeof window['BILT_LESS'][path] != 'undefined') {
                callback(null, { contents: window['BILT_LESS'][path](), filename: filename, webInfo: { lastModified: new Date() }});
            }
            else {
                callback({message: "Error loading file " + filename + " error was Not found in Bilt"});
            }
        }
        else {
            return FileManager.prototype.loadFile.call(that, filename, '', options, environment, callback);
        }
    };

    less.environment.clearFileManagers();
    less.environment.addFileManager(new BiltFileManager());

    $(function () {
        $('style[data-overload]').each(function (n, el) {
            var $el = $(el);
            var orig = '';
            var overload = $el.data('overload');
            if(typeof window['BILT_LESS'][overload] != 'undefined') {
                orig = window['BILT_LESS'][overload]();
            }
            window['BILT_LESS'][overload] = function() {
                return orig + $el.text();
            };
            $el.remove();
        });
        $('style[data-override]').each(function (n, el) {
            var $el = $(el);
            var override = $el.data('overload');
            window['BILT_LESS'][override] = function() {
                return $el.text();
            };
            $el.remove();
        });
        $('style[type="text/less"]').each(function (n, el) {
            var $el = $(el);
            less.render($el.text()).done(function (output) {
                $el.text(output.css).attr('type', 'text/css').appendTo('head');
            });
        });
    });

})();
