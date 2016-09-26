const path = require('path');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    'react-validator': path.join(src, 'index.js')
  },
  output: {
    path: dist,
    filename: '[name].js',
    library: 'ReactValidator',
    libraryTarget: 'umd'
  },
  externals: [{
    validatorjs: 'validatorjs'
  }],
  plugins: [
    new CopyWebpackPlugin([{
      from: 'node_modules/validatorjs/src/lang', to: '../lang'
    }])
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          plugins: ['transform-object-rest-spread'],
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
