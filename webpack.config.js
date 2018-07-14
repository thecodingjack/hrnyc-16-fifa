var webpack = require('webpack');
var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  // entry: {
  //   './dist/app': path.resolve(__dirname, 'src/index.js')
  // },
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },

  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        include: SRC_DIR,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'stage-0']
        }
      },
      {
        test:/\.css$/,
        include: SRC_DIR,
        loader: ['style-loader','css-loader']
      }
    ]
  },
  externals: {
    'react/addons': true, // important!!
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true
  }
};
