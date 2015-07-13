var _ = require('lodash'),
    expect = require('chai').expect,
    nowdoc = require('./index');

describe('nowdoc()', function () {
    _.each([
        {
            nowdoc: nowdoc(function () {/*<<<EOS
Line 1
Line 2
EOS
*/;}), // jshint ignore:line
            expectedString: 'Line 1\nLine 2'
        },
        {
            nowdoc: nowdoc(function () {/*<<<EOS
${person} walked up the stairs in ${person}'s flat.
EOS
*/;}, {person: 'Fred'}), // jshint ignore:line
            expectedString: 'Fred walked up the stairs in Fred\'s flat.'
        },
        {
            nowdoc: nowdoc(function () {/*<<<EOS
The ladder is ${length}cm long.
EOS
*/;}, {length: 12}), // jshint ignore:line
            expectedString: 'The ladder is 12cm long.'
        }
    ], function (scenario, index) {
        it('should return the correct string for nowdoc #' + (index + 1), function () {
            expect(scenario.nowdoc).to.equal(scenario.expectedString);
        });
    });
});
