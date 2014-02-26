(function (hash, blanket){
    'use strict';

    if (hash === '#_blanket-lcov-browser') {
        blanket.options("reporter", "/lib/vendor/lcov_reporter.js");
        blanket.options("reporter_options", {
          toHTML: false
        });

        blanket._onTestsDone = blanket.onTestsDone;
        blanket.onTestsDone = function () {
          var phantomMessageCallback = document.createEvent("Events");

          blanket._onTestsDone.apply(this, arguments);
          phantomMessageCallback.initEvent('coverage.ready', true, true);
          document.dispatchEvent(phantomMessageCallback);
        }
    }
}(window.location.hash, window.blanket));
