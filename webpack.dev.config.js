const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
//分成两个CSS文件
const ExtractTextWebpackPlugin1 = require('extract-text-webpack-plugin');
//const ExtractTextWebpackPlugin2 = require('extract-text-webpack-plugin');
//分成两个CSS文件
module.exports = {
    devtool:'source-map',//在--mode production模式下也能精准定位报错位置
    //devServer自动刷新的代码存在内存中
    //打包后文件的内存路径 = devServer.contentBase + output.publicPath + output.filename，只能通过浏览器来访问这个路由来访问内存中的bundle
    //使用webpack打包更新的文件硬盘路径 = output.path + output.filename
    // devServer: {
    //     host:'127.0.0.1',
    //     port:'8081',
    //     //open:true,
    //     hotOnly:true,
    //     hot:true,//热更新配合new webpack.HotModuleReplacementPlugin()使用
    //     contentBase:'./dist'//devServer.contentBase + output.publicPath + output.filename = ./dist/js/xx
    // },
    watch:false,
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,//每多少秒询问一次
        aggregateTimeout: 1000//发现改动后多少秒执行打包
    },
    module:{
        rules:[
            // {
            //     test:/\.css$/,
            //     //loader:'style-loader!css-loader'
            //     //从右到左执行
            //     use:[
            //         {
            //             loader:'style-loader'
            //         },
            //         {
            //             loader:'css-loader'
            //         },
            //         {loader:'postcss-loader'}//配合postcss.config文件来加CSS前缀
            //     ],
            //     exclude:[path.resolve('./dist'),/node_modules/],//排除解析dist文件夹
            //     include:[path.resolve('./src')]//只编译src文件夹 但是node_modules除外
            // },
            // {
            //     test:/\.less/,
            //     //loader:'style-loader!css-loader'
            //     use:[
            //         {
            //             loader:'style-loader'
            //         },
            //
            //         {
            //             loader:'css-loader'
            //         },
            //         {loader:'postcss-loader'},//配合postcss.config文件来加CSS前缀
            //         {
            //             loader:"less-loader"
            //         }
            //     ],
            //     exclude:[path.resolve('./dist'),/node_modules/],//排除解析dist文件夹
            //     include:[path.resolve('./src')]//只编译src文件夹 但是node_modules除外
            // }
        ]
    },
    // mode:'development',
    plugins:[
        //设置成disable:false就不会抽离CSS(抽离css不会自动更新页面样式)
        //new ExtractTextWebpackPlugin1({filename:'css/style.css'}),
        //new ExtractTextWebpackPlugin2({filename:'less/style.css'}),
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin()
    ]
}