'use strict';
const intersection = require('lodash.intersection');
const formatObj = require('fmt-obj');
const timeStamp = require('time-stamp');
const colors = require('chalk');

exports.defaults = {
  timestamp: 'HH:mm:ss',
  bell: ['error'],
  colors: {
    error: 'red',
    warning: 'yellow',
    success: 'green',
    notice: 'blue'
  }
};

exports.log = function(options, tags, message) {
  const ts = (options.timestamp) ? `${colors.gray(timeStamp(options.timestamp))} ` : '';

  if (typeof message === 'object') {
    const formatter = {
      property: colors.bold,
      punctuation: colors.cyan,
      literal: colors.blue,
      number: colors.yellow,
      string: colors.green
    };
    const indent = (options.timestamp) ? 9 : 2;
    message = formatObj(message, Infinity, formatter, indent);
  }

  if (options.bell && (intersection(options.bell, tags).length > 0)) {
    message += '\u0007';
  }

  tags.forEach((tag, i) => {
    const color = options.colors[tag];
    tags[i] = (color) ? colors[color](tag) : colors.gray(tag);
  });

  const renderTags = (localTags) => {
    if (localTags.length === 0) {
      return '';
    }
    return `${colors.gray('[')}${localTags.join(colors.gray(','))}${colors.gray(']')} `;
  };
  const out = `${ts}${renderTags(tags)}${message}`;
  return out;
};
