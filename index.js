/*
 * Nowdoc - Heredocs, with extras
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/nowdoc/
 *
 * Released under the MIT license
 * https://github.com/asmblah/nowdoc/raw/master/MIT-LICENSE.txt
 */

'use strict';

var _ = require('microdash'),
    functionToString = function () {}.toString,
    templateString = require('template-string');

/**
 * Extracts an embedded block of text from the provided function,
 * and replaces any placeholders with the variables provided
 *
 * @param {function} fn
 * @param {Object.<string, string>} variables
 * @returns {string}
 * @throws {Error} Throws when function does not contain a valid heredoc comment
 */
function nowdoc(fn, variables) {
    var match = functionToString.call(fn).match(/\/\*<<<(\w+)[\r\n](?:([\s\S]*)[\r\n])?\1\s*\*\//),
        string;

    if (!match) {
        throw new Error('nowdoc() :: Function does not contain a nowdoc');
    }

    string = match[2] || '';

    string = templateString(string, variables);

    return string;
}

module.exports = nowdoc;
