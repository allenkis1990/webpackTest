const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//分成两个CSS文件
const ExtractTextWebpackPlugin1 = require('extract-text-webpack-plugin');
//const ExtractTextWebpackPlugin2 = require('extract-text-webpack-plugin');
//分成两个CSS文件

const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
module.exports = {
    entry: {
        main: './src/js/index.js',
        assets:['./src/assets/jquery-1.9.1.min.js','./src/assets/vue-validator.min.js']//把两个库打包成assets.js
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/[name].[hash:8].bundle.js',
        publicPath: ""
        //publicPath:"dist"//页面上引入的路径 比如js/xxx就会变成dist/js/xxx
    },
    //devServer自动刷新的代码存在内存中
    //打包后文件的内存路径 = devServer.contentBase + output.publicPath + output.filename，只能通过浏览器来访问这个路由来访问内存中的bundle
    //使用webpack打包更新的文件硬盘路径 = output.path + output.filename
    devServer: {
        host:'127.0.0.1',
        port:'8080',
        //open:true,
        hotOnly:true,
        hot:true,//热更新配合new webpack.HotModuleReplacementPlugin()使用
        contentBase:'./dist'//devServer.contentBase + output.publicPath + output.filename = ./dist/js/xx
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                //loader:'style-loader!css-loader'
                //从右到左执行
                use:ExtractTextWebpackPlugin1.extract({
                    fallback:'style-loader',
                    use:[
                        /*{
                            loader:'style-loader'
                        },*/
                        {
                            loader:'css-loader'
                        },
                        {loader:'postcss-loader'}//配合postcss.config文件来加CSS前缀
                    ]
                })
            },
            {
                test:/\.less/,
                //loader:'style-loader!css-loader'
                use:ExtractTextWebpackPlugin1.extract({
                    //disable:true的时候之后会插入到style里如果不设置就分离CSS
                    fallback:'style-loader',
                    use:[
                        /*{
                            loader:'style-loader'
                        },*/
                        {
                            loader:'css-loader'
                        },
                        {loader:'postcss-loader'},//配合postcss.config文件来加CSS前缀
                        {
                            loader:"less-loader"
                        }
                    ]
                })
            }
        ]
    },
    resolve: {
        //import时可以省去后缀名js vue json
        extensions: ['.js', '.vue', '.json','.less'],
        modules: ["src", "node_modules"]//添加node_modules否则运行webpack-dev-server报错
    },
    plugins: [
        new CleanWebpackPlugin(['./dist']),//删除文件夹插件
        //设置成disable:true就不会抽离CSS(抽离css不会自动更新页面样式)
        new ExtractTextWebpackPlugin1({filename:'css/style.css',disable:true}),
        //new ExtractTextWebpackPlugin2({filename:'less/style.css'}),
        //清除没用到的样式，只有在抽离css的模式生效指定的是模板html文件
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, './*.html')),
        }),
        new webpack.HotModuleReplacementPlugin(),
        //指定html位置指定后打包的js会自动被引入
        new HtmlWebpackPlugin({
            filename: 'index.html',//真正输出的地址output.path+filename=./dist/index.html
            template:'./index.html',//INdex的模板
            inject: true,
            hash:true,
            title:'lwh-webpack-test',
            minify: {
                removeAttributeQuotes: true, // 移除属性的引号
                collapseWhitespace:true//html片段变成一行
            }
        })
    ]
}