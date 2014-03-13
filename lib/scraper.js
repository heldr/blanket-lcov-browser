'use strict';

var page      = require('webpage').create(),
    fs        = require('fs'),
    args      = require('system').args,
    cwd       = args[1] + '/',
    url       = 'http://localhost:' + args + '/test/specRunner.html#_blanket-lcov-browser',
    reporters = {
        lcov: function (config) {
            var data = config.content;

            data = data.replace(/\.\.\//g, cwd);

            if (config.print) {
                console.log(data);
            }

            fs.write(cwd + 'coverage.info', data);
        }
    };

page.onLoadFinished = function (status) {
    if (status !== 200) {
        console.log('Server error:', status);
        phantom.exit(1);
    } else {
        page.evaluateAsync(function () {
            document.addEventListener('coverage.report', window.callPhantom);
            document.addEventListener('coverage.done', function () {
                window.callPhantom();
            });
        });
    }
};

page.onCallback = function (event) {
    if (!event) {
        phantom.exit(0);
    }

    try {
        reporters[event.reportConfig.type](event.reportConfig);
    } catch (e) {
        console.log(e);
    }
};

page.open(url);
