const { default: merge } = require('webpack-merge');
const base = require('./webpack.config.base');

module.exports = merge(base, {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.main.js'
    },
    devServer: {
      host: 'localhost',
      port: 3000,
      open: true,
      proxy: {
        '/api': 'http://localhost:8888',
      },
    },
  }
);