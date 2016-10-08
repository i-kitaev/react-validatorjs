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
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    },
    validatorjs: {
      commonjs: 'validatorjs'
    }
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
