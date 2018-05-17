import { cssLoaders } from './utils';

var os = require('os')
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

// 不参与css-module的目录和文件
const excludeCssModules = [/node_modules/, /assets/, /\.css/];

const styleLoaders = (opts) => {
    const options = {
        filename: '',
        sourceMap: true, //
        cssModules: true,
        extract: false,
        happy: true,
        ...opts
    };

    const loaders = [];

    const cssOptions = {
        sourceMap: options.sourceMap,
        importLoaders: 2 // 前面有几个loader
    }

    if(options.cssModules)

    const cssLoaders = {

    }


    // use: [
    //     'style-loader',
    //     {
    //         loader: "css-loader",
    //         options: {
    //             sourceMap: true,
    //             importLoaders: 2 // 前面有几个loader
    //         }
    //     }, {
    //         loader: "postcss-loader",
    //         options: {
    //             sourceMap: true,
    //             config: { path: './build/postcss.config' }
    //         }
    //     }, {
    //         loader: "less-loader",
    //         options: {
    //             sourceMap: true,
    //         }
    //     }
    // ]


}