'use strict';

var _ = require('lodash');

function stringTemplate(string, variables) {
    _.forOwn(variables, function (value, name) {
        var pattern = new RegExp(('${' + name + '}').replace(/[^a-z0-9]/g, '\\$&'), 'g');

        string = string.replace(pattern, value);
    });

    return string;
}

function nowdoc(fn, variables) {
    var match = function () {}.toString.call(fn).match(/\/\*<<<(\w+)[\r\n](?:([\s\S]*)[\r\n])?\1\s*\*\//),
        string;

    if (!match) {
        throw new Error('nowdoc() :: Function does not contain a nowdoc');
    }

    string = match[2] || '';

    string = stringTemplate(string, variables);

    return string;
}

module.exports = nowdoc;
