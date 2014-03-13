(function (hash, blanket) {
    'use strict';

    if (hash === '#_blanket-lcov-browser') {
        blanket.options("reporter", "/lib/vendor/lcov_reporter.js");

        blanket._onTestsDone = blanket.onTestsDone;
        blanket.onTestsDone = function () {
            var phantomMessageCallback = document.createEvent("Events");

            blanket._onTestsDone.apply(this, arguments);
            phantomMessageCallback.initEvent('coverage.done', true, true);
            document.dispatchEvent(phantomMessageCallback);
        };
    }
} (window.location.hash, window.blanket));
