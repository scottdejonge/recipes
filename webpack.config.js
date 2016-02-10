var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var postcssImport = require('postcss-import');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      }
    ]
  },
  postcss: function(webpack) {
    return [
      autoprefixer({
        browsers: ['last 2 versions']
      }),
      postcssImport({
        path: './src/css/*.css',
        addDependencyTo: webpack
      }),
      precss
    ];
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', {
      allChunks: true
    })
  ]
};