const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css到单独文件的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件

module.exports = {
    module:{
        rules:[
            {
                test:/\.css$/,
                //loader:'style-loader!css-loader'
                //从右到左执行
                use:[
                    MiniCssExtractPlugin.loader,//注意这边
                    {
                        loader:'css-loader'
                    },
                    {loader:'postcss-loader'}//配合postcss.config文件来加CSS前缀
                ],
                exclude:[path.resolve('./dist'),/node_modules/],//排除解析dist文件夹
                include:[path.resolve('./src')]//只编译src文件夹 但是node_modules除外
            },
            {
                test:/\.less/,
                //loader:'style-loader!css-loader'
                use:[
                    MiniCssExtractPlugin.loader,//注意这边

                    {
                        loader:'css-loader'
                    },
                    {loader:'postcss-loader'},//配合postcss.config文件来加CSS前缀
                    {
                        loader:"less-loader"
                    }
                ],
                exclude:[path.resolve('./dist'),/node_modules/],//排除解析dist文件夹
                include:[path.resolve('./src')]//只编译src文件夹 但是node_modules除外
            }
        ]
    },
    plugins:[
        //抽取CSS
        new MiniCssExtractPlugin({
            filename: "css/style.css",
            chunkFilename: "css/style.[hash:8].css"}),
        //css压缩
        new OptimizeCssAssetsPlugin(),
    ]
}