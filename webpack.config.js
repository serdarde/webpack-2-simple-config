/**
 * Get environment
 * @type {string}
 */
const env = process.env.NODE_ENV;

/**
 * Is env development
 * @type {boolean}
 */
const isDev = env === 'development';

/**
 * extract CSS files
 * @type {ExtractTextPlugin}
 */
const ExtractTextPlugin = require("extract-text-webpack-plugin");

/**
 * Put css and js tag in html-template
 * @type {HtmlWebpackPlugin}
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * Path plugin
 */
const path = require('path');


/**
 * Webpack
 * @type {webpack}
 */
const webpack = require('webpack');

/**
 * Set CSS rules
 * @type {Array}
 */
var cssRule = isDev ?
  ["style-loader", "css-loader", "sass-loader"] // development
  : ExtractTextPlugin.extract({ // production
    fallback: "style-loader",
    use: ["css-loader", "sass-loader"]
  });

/**
 * Set Plugins
 * @type {Array}
 */
var plugins = isDev ?
  [ // dev plugins
    new webpack.HotModuleReplacementPlugin()
  ]
  : [ // production plugins
    new ExtractTextPlugin("styles-[contenthash:10].css"),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      compress: {
        warnings: true
      }
    }),
    new HtmlWebpackPlugin({
      template: "index-template.html",
      minify: {
        // collapseWhitespace: true
      }
    })
  ];


// push plugins for both env
//plugins.push();

module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: isDev ? "/dist/" : "/",
    filename: isDev ? "bundle.js" : "bundle-[hash:10].min.js",
  },
  externals: {
    // to leave outside big 3rd party modules like jquery
    //"jquery": "jQuery"
  },
  devtool: isDev ? "source-map" : false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: cssRule
      }
    ]
  },
  plugins,
  devServer: {
    hot: true, // hot loading for css and js
    open: false, // open a new browser tab on start
    stats: "errors-only", // show only errors
    compress: true, // gzip
    port: 4040
  }
};