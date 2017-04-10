'use strict';
const formatObj = require('fmt-obj');
const timeStamp = require('time-stamp');
const chalk = require('chalk');

exports.defaults = {
  timestamp: 'HH:mm:ss',
  colors: {
    error: 'bgRed',
    warning: 'bgYellow',
    success: 'bgGreen',
    notice: 'bgBlue'
  },
  appColor: false
};

exports.log = function(options, tags, message) {
  const colors = new chalk.constructor({ enabled: (options.colors !== false) });
  const ts = (options.timestamp) ? `${colors.gray(timeStamp(options.timestamp))} ` : '';

  if (typeof message === 'object') {
    const formatter = {
      property: colors.bold,
      punctuation: colors.cyan,
      annotation: colors.red,
      literal: colors.blue,
      number: colors.yellow,
      string: colors.green
    };
    const indent = (options.timestamp) ? 9 : 2;
    message = formatObj(message, Infinity, formatter, indent);
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
