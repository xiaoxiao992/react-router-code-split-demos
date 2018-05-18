// if (!process.env.NODE_ENV)
//     process.env.NODE_ENV = 'production';

var path = require('path');
const webpack = require("webpack");
// var utils = require('./utils');
// var config = require('../config');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

var os = require('os');
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
// console.log('opop', path.resolve(__dirname, '../dll/js/*.js'))

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  name: "main",
  entry: {
    app: ['babel-polyfill', './src/app'],
  },
  output: {
    path: resolve("dist"),
    filename: 'js/[name].[hash].js',
    publicPath: '/'
  },
  // devtool: 'cheap-module-eval-source-map',
  devtool: false,
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      // '@': resolve('src'),
      // 'antd': resolve('src/assets/antd'),
      // 'api': resolve('src/api'),
      // 'jstree': resolve('src/assets/jstree/src/jstree'),
    }
  },
  module: {
    rules: [
      // babel-loader
      {
        test: /\.(js|jsx)$/,
        // loader: 'babel-loader',
        use: 'happypack/loader?id=jsx',
        exclude: [/node_modules/],
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024, //文件小于1kb 转成Data URL
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024, //小于1kb 转成Data URL
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }, {
        test: /\.less$/,

        // 开发模式下不开启ExtractTextPlugin
        // ** 开启 happy模式 并且启用ExtractTextPlugin
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: 'happypack/loader?id=less',
        }),

      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: 'happypack/loader?id=less',
        }),
        use: 'happypack/loader?id=css',
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin([resolve('dist')]),
    // babel-loader
    new HappyPack({
      id: 'jsx',
      // 是否向cmd 输出信息
      verbose: false,
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'babel-loader',
        options: { cacheDirectory: true }
      }]
    }),
    // css
    new HappyPack({
      id: 'css',
      // 是否向cmd 输出信息
      verbose: false,
      threadPool: happyThreadPool,
      loaders: [
        // 'style-loader',
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            importLoaders: 1 // 前面有几个loader
          }
        }, {
          loader: "postcss-loader",
          options: {
            sourceMap: true,
            config: { path: './build/postcss.config' }
          }
        }
      ]
    }),
    // less
    new HappyPack({
      id: 'less',
      // 是否向cmd 输出信息
      verbose: false,
      threadPool: happyThreadPool,
      loaders: [
        // 'style-loader',
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            importLoaders: 2 // 前面有几个loader
          }
        }, {
          loader: "postcss-loader",
          options: {
            sourceMap: true,
            config: { path: './build/postcss.config' }
          }
        }, {
          loader: "less-loader",
          options: {
            sourceMap: true,
          }
        }
      ]
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
        // return b;
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),

    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll/manifest.json'),
    }),

    new ExtractTextPlugin({
      filename: "css/[name].[contenthash:8].css",
      // Extract from all additional chunks too (by default it extracts only from the initial chunk(s))
      // When using CommonsChunkPlugin and there are extracted chunks (from ExtractTextPlugin.extract) in the commons chunk, allChunks must be set to true
      // 默认的只会合并初始的模块内的样式，如果使用CommonsChunkPlugin，想要把后续添加的模块中的样式也添加进来，则allChunks必须设为true
      allChunks: true,
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
      excludeChunks: ['login', 'flow']
    }),

    new AddAssetHtmlPlugin({
      includeSourcemap: false,
      filepath: path.resolve(__dirname, '../dll/js/*.js'),
      //
      publicPath: '/js',
      outputPath: 'js'
    }),

    // new BundleAnalyzerPlugin({ analyzerPort: 18010 }),

    // webpack-hot-middleware 配置
    // new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    // new webpack.NoEmitOnErrorsPlugin(),
    /*
      @desc: https://webpack.js.org/plugins/module-concatenation-plugin/
      "作用域提升(scope hoisting)",使代码体积更小[函数申明会产生大量代码](#webpack3)
    */
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en/),
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      // other uglify options
      uglifyJS: {
        output: {
          // 最紧凑的输出
          beautify: false,
          // 删除所有的注释
          comments: false,
        },

        compress: {
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          // 删除所有的 `console` 语句
          // 还可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true,
        },
        sourceMap: false
      }
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSAssetsPlugin({
      canPrint: false,
      cssProcessorOptions: {
        safe: true,
      }
    })
  ]
}