//lcov_reporter
(function () {
    'use strict';
    //takes the option: toHTML {boolean}

    var reporterHelper = {
        lcov: function (filename, data) {
            var str = "";
            str += 'SF:' + filename + '\n';

            data.source.forEach(function (line, num) {
                // increase the line number, as JS arrays are zero-based
                num++;

                if (data[num] !== undefined) {
                    str += 'DA:' + num + ',' + data[num] + '\n';
                }
            });

            str += 'end_of_record\n';

            return str;
        }
    };

    function _get(report, coverageData) {
        var content = '';

        for (var filename in coverageData.files) {
            if (coverageData.files.hasOwnProperty(filename)) {
                content += reporterHelper[report](filename, coverageData.files[filename]);
            }
        }

        _send(report, content);
    }

    function _send(report, content) {
        var phantomCallback = document.createEvent('Events');

        phantomCallback.initEvent('coverage.report', true, true, {
            reportConfig: {
                type: report,
                content: content
            }
        });
        document.dispatchEvent(phantomCallback);
    }

    blanket.customReporter = function (coverageData) {
        var reporters = window._reporterList;

        for (var report in reporters) {
            if (reporters.hasOwnProperty(report)) {
                _get(report, coverageData);
            }
        }
    };
})();
