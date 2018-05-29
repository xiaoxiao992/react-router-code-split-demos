var path = require('path');
const webpack = require("webpack");
// var utils = require('./utils')
// var config = require('../config')
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

var HappyPack = require('happypack');
var os = require('os');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
HappyPack.SERIALIZABLE_OPTIONS = HappyPack.SERIALIZABLE_OPTIONS.concat(['postcss']);


function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  name: "redux",
  entry: {
    app: ['babel-polyfill', './redux-demo/app'],
  },
  output: {
    path: resolve("dist"),
    filename: 'js/[name].[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve('redux-demo'),
      // 'antd': resolve('src/assets/antd'),
      // 'api': resolve('src/api'),
      // 'jstree': resolve('src/assets/jstree/src/jstree'),
    }
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        include: [resolve('redux-demo')],
        // loader: 'babel-loader',
        use: [`happypack/loader?id=happybabel`]
      },
      {
        test: /\.(html)$/,
        include: [resolve('redux-demo')],
        use: ['html-loader']
      },
      // url-loader
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024, //文件小于1kb 转成Data URL
          name: 'redux/img/[name].[hash:7].[ext]'
        }
      },
      // url-loader
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024, //小于1kb 转成Data URL
          name: 'redux/fonts/[name].[hash:7].[ext]'
        }
      },
      // less
      {
        test: /\.less$/,
        exclude: /redux-demo/,
        include: [/node_modules/],
        use: [`happypack/loader?id=less1`]
      },
      // less
      {
        test: /\.less$/,
        exclude: /node_modules/,
        include: [/redux-demo/],
        use: [`happypack/loader?id=less2`]
      },
      // less
      {
        test: /\.css$/,
        use: [`happypack/loader?id=css`],
      }
    ]
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env': '"production"',
      // '__API_BASE_URL__': config.dev.env.API_BASE_URL,
    }),
    new HappyPack({
      id: 'happybabel',
      // Enable this to log status messages from HappyPack to STDOUT like start-up banner
      verbose: false,
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'babel-loader',
        // here you configure babel:
        options: {
          babelrc: true,
          cacheDirectory: false
        }
      }]
    }),
    // less1
    new HappyPack({
      id: 'less1',
      verbose: false,
      threadPool: happyThreadPool,
      loaders: ["style-loader", {
          loader: "css-loader",
          options: {
            sourceMap: true,
            importLoaders: 2 // 前面有几个loader
          }
        },
        {
          loader: "postcss-loader",
          options: {
            ident: 'postcss',
            sourceMap: true,
            config: { path: path.join(__dirname, '..', 'build/postcss.config.js') },
          }
        },
        {
          loader: "less-loader",
          options: {
            sourceMap: true,
          }
        }
      ],
    }),
    // less2
    new HappyPack({
      id: 'less2',
      verbose: false,
      threadPool: happyThreadPool,
      loaders: ["style-loader", {
          loader: "css-loader",
          options: {
            sourceMap: true,
            modules: true,
            importLoaders: 2 // 前面有几个loader
          }
        },
        {
          loader: "postcss-loader",
          options: {
            ident: 'postcss',
            sourceMap: true,
            config: { path: path.join(__dirname, '..', 'build/postcss.config.js') },
          }
        },
        {
          loader: "less-loader",
          options: {
            sourceMap: true,
          }
        }
      ],
    }),
    // css
    new HappyPack({
      id: 'css',
      verbose: false,
      threadPool: happyThreadPool,
      loaders: ["style-loader",
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            importLoaders: 1
          }
        },
        {
          loader: "postcss-loader",
          options: {
            ident: 'postcss',
            sourceMap: true,
            config: { path: path.join(__dirname, '..', 'build/postcss.config.js') },
          }
        }
      ]
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './redux-demo/index.html',
      inject: true,
      excludeChunks: ['login', 'flow']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // minChunks: 2,
      minChunks: function(module, count) {
        // any required modules inside node_modules are extracted to vendor

        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        );
        // console.log("module.resource", b, module.resource);
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // webpack-hot-middleware 配置
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),

  ]
}