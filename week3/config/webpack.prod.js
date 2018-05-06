const path = require('path');
const webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
    entry: {
        index: [
            path.join(__dirname, '../src/public/js/index.es6')
        ],
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
            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: "style-loader",
            //         use: "css-loader"
            //     })
            // }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"prod"'
            }
        })
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