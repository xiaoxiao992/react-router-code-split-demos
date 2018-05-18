首先，关于 webpack 打包优化网上已经有很多文章，这里主要是做个记录。


我们的项目使用的框架: react + antd 。在打包时遇到的主要问题是：
 1. 构建太慢，主要体现在生产模式下，三个项目同时构建，居然要6分钟之久；
 2. 生产模式下打包出来的文件过大。（可能是文件存在重复打包的现象）；
 3. 开发模式下太耗内存，经常出现内存被占满的情况。   


### 开发模式下主要的优化手段：


**1、避免在生产环境下才会用到的工具**   

* UglifyJsPlugin
* ExtractTextPlugin
* [hash]/[chunkhash]
* AggressiveSplittingPlugin
* AggressiveMergingPlugin
* ModuleConcatenationPlugin

**2、使用 [happypack][2]**   
**3、babel-loader 开启缓存功能**
```js
{
    loader: 'babel-loader',
    options: { cacheDirectory: true }
}
```
**4、当然 DllPlugin 还是少不了的**   
**5、设置 devtool ——使用一个高性能的 source map工具，一般使用 cheap-module-eval-source-map**   
其他的可以 [参考][1]，*多看文档还是有好处的*。

### 生产模式下主要的优化手段：

首先要把开发模式才使用的 plugins 去掉，一般是 webpack-dev-server、webpack-hot-middleware、webpack-dev-middleware 等所使用的插件。


其次 webpack-parallel-uglify-plugin、happypack、ExtractTextPlugin、ModuleConcatenationPlugin、OptimizeCSSPlugin 还是要使用上的。webpack-parallel-uglify-plugin 记得开启缓存功能，设置*cacheDir: '.cache/'*


以上是生产模式常规的优化手段，这里讲一个我发现的优化手段。因为我们有三个项目，发布时都是三个项目一起发布的，所以一开始我们的 build.js 文件是这样子的*基于vue的配置改造的*：
```js
/* build.js*/
process.env.NODE_ENV = 'production';

var ora = require('ora');
var rm = require('rimraf');
var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var config = require('../config');

var config1 = require('./1.prod.conf');
var config2 = require('./2.prod.conf');
var config3 = require('./3.prod.conf');

var spinner = ora('building for production...');
spinner.start();

// 删除dist文件夹
rm(path.join(config.build.assetsRoot), err => {
    if (err) throw err;

    webpack([config1,config2,config3], (err, stats) => {
        spinner.stop();
        if (err) throw err;

        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');

        var date = new Date(stats.endTime - stats.startTime);

        console.log(chalk.cyan(`  Build complete.\n  Total time:${date.getMinutes()}m${date.getSeconds()}s\n`));
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ));
    });
});

```

这种是把三个 webpack 的配置文件是放在一个数组中传入 webpack 中的。但是我发现这种方式居然比三个配置文件独立编译使用的时间总和多了将近一倍。于是做了一些优化，优化后的 build.js 文件变成如下：
```js

process.env.NODE_ENV = 'production';

var ora = require('ora');
var rm = require('rimraf');
var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var config = require('../config');
var config1 = require('./1.prod.conf');
var config2 = require('./2.prod.conf');
var config3 = require('./3.prod.conf');

var spinner = ora('building for production...');
spinner.start();

const configs = [config1, config2, config3];
const times = [];

rm(path.join(config.build.assetsRoot), err => {

    if (err) throw err;

    (async() => {

        for (let i = 0; i < configs.length; i++) {
            await run(configs[i], i, configs.length);
        }

        const total = times.reduce((prev, current, i) => {
            var date = new Date(current);
            console.log(chalk.cyan(`  [${i}] Time:${date.getMinutes()}m${date.getSeconds()}s\n`));
            return prev + current;
        }, 0);

        var date = new Date(total);
        console.log(chalk.cyan(`  Total time:${date.getMinutes()}m${date.getSeconds()}s\n`));
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ));

    })();
});

function run(config, i, len) {

    console.log(chalk.cyan(`正在执行 ${i+1}/${len}\n`));

    return new Promise((resolve, reject) => {

        webpack(config, (err, stats) => {
            if (i >= len - 1)
                spinner.stop();

            if (err)
                throw err;

            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n');

            times.push(stats.endTime - stats.startTime);

            resolve();

        });

    });

}

```
改造成这样后时间居然整整缩短了一半，好神奇！


### 关于体积过大

首先先通过工具分析哪些文件体积过大，过大的原因是什么？主要的分析工具 [webpack-bundle-analyzer][3]、[官方][4]、[webpack-chart][5]。


其次，CommonsChunkPlugin 推荐按 vue 的配置，
```js 

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
        )
    }
}),
// extract webpack runtime and module manifest to its own file in order to
// prevent vendor hash from being updated whenever app bundle is updated
new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: ['vendor']
}),

```
这种方式会把当前入口引用的所有来自 *node_modules* 的库打包到 vendor。但是如果你使用的代码分割（code split）则只会把入口文件使用的到的来自 *node_modules* 的文件打包入vendor，并不是把整个项目中所有的来自 *node_modules* 的库全部打包。比如：app.jsx是你的入口文件，page2.jsx是二级页面，app.jsx 没使用 antd,而 page2 使用了antd 。那么 CommonsChunkPlugin 是不会把 antd 相关的库文件打包到 vendor 中的。


最后，开启 eslint,开启 eslint,开启 eslint 重要的事情说三遍！因为项目使用的是 antd，开发时很容易出现引入了组件而未使用的情况。而 webpack 打包时是不会判断你 import 的组件有没有使用，只要你 import 了它就帮你打包进来。当然这只是 eslint 的一个小小功能， 主要的功能还是检查代码规范，统一整个团队的代码风格，提高代码质量。毕竟每个人的代码风格可能差异很大，还有就是看别人的代码是很辛苦的，如果是多人合作开发，后期的维护那可真是件痛苦的事情了。建议还是在开发模式下开启 eslint 就好了，生产模式就不要开启了。


### 踩到的坑：

**1、在 PowerShell 中使用 webpack --profile --json > stats.json 生成的文件无法在 [官方][4] 中使用**   
请使用一下的命令 [参考][6]
```cmd
webpack --profile --json | Out-file 'stats.json' -Encoding OEM
```
**2、eslint 规则修改后不生效**   
这种情况一般是 eslint 开启了缓存功能 *cache: true*，这时要删除缓存文件即可，具体是删除 *node_modules/.cache* 文件夹。

**3、eslint 与 happypack 有一点点冲突**
主要是版本的问题，经过我尝试之后，现在使用的版本是正常的。
```json
"webpack": "^3.11.0",
"eslint": "^4.10.0",
"eslint-config-airbnb": "^16.1.0",
"eslint-friendly-formatter": "^4.0.1",
"eslint-loader": "^2.0.0",
"eslint-plugin-babel": "^4.0.0",
"eslint-plugin-compat": "^2.1.0",
"eslint-plugin-import": "^2.8.0",
"eslint-plugin-jsx-a11y": "^6.0.3",
"eslint-plugin-markdown": "^1.0.0-beta.6",
"eslint-plugin-react": "^7.5.1",
"happypack": "^4.0.1",
```
**4、postcss-loader 与 happypack 也有一点点冲突，反正我遇上了。**   
具体表现是 postcss-loader 的 options 不能正确地传入 postcss 中，导致一些配置无法生效。以下是解决方案：
```js 
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
})
```



更多详情，请参考这个 [demo][7] !




参考文献：
1. https://jeffjade.com/2017/08/12/125-webpack-package-optimization-for-speed
2. [构建性能][1]
2. [happypack][2]
3. [webpack-bundle-analyzer][3]
4. [官方analyse][4]



[1]: https://doc.webpack-china.org/guides/build-performance "构建性能"
[2]: https://github.com/amireh/happypack "happypack"
[3]: https://github.com/webpack-contrib/webpack-bundle-analyzer "webpack-bundle-analyzer"
[4]: http://webpack.github.io/analyse/ "官方"
[5]: http://alexkuz.github.io/webpack-chart/ "webpack-chart"
[6]: https://github.com/webpack-contrib/webpack-bundle-analyzer/issues/47 "stats.json 无法使用"
[7]: https://github.com/jaryway/react-router-code-split-demos "demo"
