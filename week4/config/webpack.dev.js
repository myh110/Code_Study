const path = require('path');
const webpack = require('webpack');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Manifest= require('webpack-manifest');
var Manifest= require('webpack-manifest');
// var DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
    entry: {
        // index: [
        //     path.join(__dirname, '../src/public/js/index.es6')
        // ],
        tag: [
            path.join(__dirname, '../src/public/js/tag.es6'),
            path.join(__dirname, '../src/public/js/star.es6')
        ]
    },
    output: {
        filename: 'public/js/[name]-[hash:5].js',
        // publicPath: 'http://192.169.10.201:8088/',
        path: path.join(__dirname, '../build/')
    },
    module: {
        rules: [
            //编译es6
            {
                test: /\.es6$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        //DefinePlugin 配置全局变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"dev"'
            }
        }),
        //浏览器自动刷新 
        new LiveReloadPlugin({
            appendScriptTag: true
        }),
        //css提取
        new ExtractTextPlugin({
            filename: 'public/css/vendor-[hash:5].css',
            // allChunks: true,
        }),
        //通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存到缓存中供后续使用
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
            filename: 'public/js/vendor-[hash:5].js',
        }),
        new HtmlWebpackPlugin({
            filename:'./views/layout.html',
            template:'src/widget/layout.html',
            inject:false,
        }),
        new HtmlWebpackPlugin({
            filename:'./views/index.html',
            template:'src/views/index.js',
            chunks:['vendor','tag'],
            inject:false,
        }),
        new HtmlWebpackPlugin({
            filename:'./views/star.html',
            template:'src/views/star.js',
            chunks:['vendor','tag'],
            inject:false,
        }),
        new HtmlWebpackPlugin({
            filename:'./widget/index.html',
            template:'src/widget/index.html',
            inject:false,
        }),
        new HtmlWebpackPlugin({ // Also generate a test.html 
            filename: './widget/star.html',
            template: 'src/widget/star.html',
            inject: false,
        }),
        new Manifest({
            cache: [
              '../public/css/vendor.css', 
            ],
            //Add time in comments.
            timestamp: true,
            // 生成的文件名字，选填
            // The generated file name, optional.
            filename:'cache.manifest', 
            // 注意*星号前面用空格隔开
            network: [
              ' *'
            ],
            // 注意中间用空格隔开
            // manifest 文件中添加注释
            // Add notes to manifest file.
            headcomment: "spa",
            master: ['../views/layout.html']
        })
    ],

}