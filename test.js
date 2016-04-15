/*
 * Nowdoc - Heredocs, with extras
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/nowdoc/
 *
 * Released under the MIT license
 * https://github.com/asmblah/nowdoc/raw/master/MIT-LICENSE.txt
 */

var _ = require('microdash'),
    expect = require('chai').expect,
    nowdoc = require('./index');

describe('nowdoc()', function () {
    _.each({
        'multiline nowdoc with no replacements': {
            nowdoc: nowdoc(function () {/*<<<EOS
Line 1
Line 2
EOS
*/;}), // jshint ignore:line
            expectedString: 'Line 1\nLine 2'
        },
        'using the same placeholder more than once': {
            nowdoc: nowdoc(function () {/*<<<EOS
${person} walked up the stairs in ${person}'s flat.
EOS
*/;}, {person: 'Fred'}), // jshint ignore:line
            expectedString: 'Fred walked up the stairs in Fred\'s flat.'
        },
        'placeholder that touches text': {
            nowdoc: nowdoc(function () {/*<<<EOS
The ladder is ${length}cm long.
EOS
*/;}, {length: 12}), // jshint ignore:line
            expectedString: 'The ladder is 12cm long.'
        },
        'special characters in replacement string should be escaped and ignored': {
            nowdoc: nowdoc(function () {/*<<<EOS
My ${special} replacement
EOS
*/;}, {special: '$`'}), // jshint ignore:line
            expectedString: 'My $` replacement'
        }
    }, function (scenario, description) {
        describe(description, function () {
            it('should return the correct string', function () {
                expect(scenario.nowdoc).to.equal(scenario.expectedString);
            });
        });
    });
});
