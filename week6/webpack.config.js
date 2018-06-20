const webpack = require('webpack');
const glob = require('glob');
const files = glob.sync('./src/webapp/**/*.js');
const merge = require('webpack-merge');
const {join, resolve, basename} = require('path');
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode;
const _modeflag = (_mode == "production" ? true : false);
const _mergeconfig = require(`./config/webpack.${_mode}.js`);
console.log(_mergeconfig);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const htmlAfterWebpackPlugin = require('./config/htmlAfterWebpackPlugin.js');
let _entry = {};
let _plugins = [];
for (let item of files) {
    if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item)) {
        const entrykey = RegExp.$1;
        // console.log(entrykey);
        _entry[entrykey] = item;
        //dist外层文件夹名字 template内部html名字
        const [dist, template] = entrykey.split("-");
        _plugins.push(new HtmlWebpackPlugin({
            filename: `../views/${dist}/pages/${template}.html`,
            template: `src/webapp/views/${dist}/pages/${template}.html`,
            minify: _modeflag,
            inject: false
        }))
    }
}
console.log(_entry)
let webpackConfig = {
    entry:_entry,
    output:{
        path: join(__dirname, "./dist/assets"),
        publicPath: "/",
        filename: "scripts/[name].boudle.js"
    },
    plugins:[
        ..._plugins,
        new htmlAfterWebpackPlugin()
    ],
    module:{
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            minimize: _modeflag //是否开启压缩
                        }
                    },
                        "postcss-loader"
                    ]
                })
            }
        ]

    },
    watch:!_modeflag,
    optimization: {
        splitChunks: {
            // chunks:"async",
            // name:false,
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: 2,   
                    minSize: 0,
                    name: "conmons"
                }
            }
        },
        runtimeChunk: {
            name: "runtime"
        }
    },
}
// console.log(merge(webpackConfig, _mergeconfig))
module.exports = merge(webpackConfig, _mergeconfig)