const path = require('path');
const webpack = require('webpack');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// console.log(webpack)
module.exports = {
    entry: {
        // index: [
        //     path.join(__dirname, '../src/public/js/index.es6')
        // ],
        tag: [
            path.join(__dirname, '../src/public/js/tag.es6')
        ]
    },
    output: {
        filename: 'public/js/[name]-[hash:5].js',
        path: path.join(__dirname, '../build/')
    },
    module: {
        rules: [
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
        //压缩js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        }),
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
            filename:'./widget/index.html',
            template:'src/widget/index.html',
            inject:false,
        }),
        // 构建优化插件
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'vendor',
        //   filename: 'vendor-[hash].min.js',
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //   compress: {
        //     warnings: false,
        //     drop_console: false,
        //   }
        // }),
        // new ExtractTextPlugin({
        //   filename: 'build.min.css',
        //   allChunks: true,
        // }),
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // // 编译时(compile time)插件
        // new webpack.DefinePlugin({
        //   'process.env.NODE_ENV': '"production"',
        // }),
        // // webpack-dev-server 强化插件
        // new DashboardPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
      ],
      
}