const path = require('path');
const { default: merge } = require("webpack-merge")
const base = require('./webpack.config.base');

module.exports = merge(base, {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app/bundle.main.js',
  },
});