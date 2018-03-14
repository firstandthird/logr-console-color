'use strict';
const prettyFormat = require('pretty-format');
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

const appColors = {};
const availableColors = [
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'red'
];
let lastColorIndex = 0;

exports.log = function(options, tags, message) {
  const colors = new chalk.constructor({ enabled: (options.colors !== false) });
  const ts = (options.timestamp) ? `${colors.gray(timeStamp(options.timestamp))} ` : '';

  if (typeof message === 'object') {
    const indent = (options.timestamp) ? 9 : 2;
    try {
      message = prettyFormat(message, {
        indent,
        highlight: true,
        theme: {
          prop: 'bold',
          comment: 'red',
          value: 'blue',
        },
        plugins: [
          {
            test: (val) => isNaN(val) && typeof val === 'string',
            serialize(val) {
              return chalk.green(`"${val}"`);
            }
          },
          {
            test: (val) => !isNaN(val),
            serialize(val) {
              return chalk.yellow(+val);
            }
          }
        ]
      });
    } catch (e) {
      console.log('[error, pretty-format]', e); // eslint-disable-line no-console
      message = JSON.stringify(message);
    }
  }

  tags.forEach((tag, i) => {
    let color = options.colors[tag];
    if (i === 0 && options.appColor) {
      if (!appColors[tag]) {
        appColors[tag] = availableColors[lastColorIndex];
        lastColorIndex++;
        if (lastColorIndex > availableColors.length - 1) {
          lastColorIndex = 0;
        }
      }
      color = appColors[tag];
    }
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
