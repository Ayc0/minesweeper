/* eslint no-param-reassign: off */

const path = require('path');

module.exports = {
  webpack: (config, env) => {
    if (env === 'production') {
      config.output.publicPath = '/minesweeper/';
      config.output.path = path.resolve(__dirname, 'docs');
    }
    return config;
  },
};
