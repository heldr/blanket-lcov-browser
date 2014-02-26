'use strict';
var page = require('webpage').create();
    fs   = require('fs'),
    args = require('system').args,
    cwd  = args[1] + '/',
    url  = 'http://localhost:' + args + '/test/specRunner.html#_blanket-lcov-browser';

page.onLoadFinished = function(status){
    page.evaluateAsync(function () {
        document.addEventListener('coverage.ready', function () {
            window.callPhantom(_$blanket_LCOV);
        });
    });
};

page.onCallback = function (data) {
    try {
        data = data.replace(/\.\.\//g, cwd);
        console.log(data);
        fs.write(cwd + 'coverage.info', data);
    } catch(e) {
        console.log(e);
    }
    phantom.exit(0);
}

page.open(url);
