const { createFormatter } = require('fmt-obj');
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

exports.log = function(options, tags, text) {
  const colors = chalk;
  const ts = (options.timestamp) ? `${colors.gray(timeStamp(options.timestamp))} ` : '';

  if (typeof text === 'object') {
    const indent = (options.timestamp) ? 9 : 2;
    const format = createFormatter({
      offset: indent,
      formatter: {
        property: colors.bold,
        punctuation: colors.cyan,
        annotation: colors.red,
        literal: colors.blue,
        number: colors.yellow,
        string: colors.green
      }
    });
    let message;
    try {
      if (text.message) {
        message = text.message;
        delete text.message;
      }
      text = format(text);
    } catch (e) {
      console.log('[error, fmt-obj]', e); // eslint-disable-line no-console
      text = JSON.stringify(text);
    }
    if (message) {
      text = `${message}${text}`;
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
  const out = `${ts}${renderTags(tags)}${text}`;
  return out;
};
