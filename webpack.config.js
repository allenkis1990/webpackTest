//console.log(process.env.mode);//在cmd里输入set mode=xxx设置env.mode如果想清空就是set mode=
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
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
//const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
//const haha = require('./src/haha');//找haha文件如果没有就找哈哈文件夹package.json找main或者module配置的映射
module.exports = {
    entry: {
        //main1 main2都有 jquery的
        main: './src/js/index.js',
        main2: './src/js/index2.js',
        //jquery:['./src/assets/jquery-1.9.1.min.js']
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/[name].[hash:8].bundle.js',
        publicPath: ""
        //publicPath:"dist"//页面上引入的路径 比如js/xxx就会变成dist/js/xxx
    },
    resolve: {
        //import时可以省去后缀名js vue json默认require先找.js从左到右
        //作用于项目中，webpack配置文件中无法使用
        extensions: ['.js', '.vue', '.json','.less'],
        //require('xxx')先去src目录下找没有才去node_modules从左到右
        //作用于项目中，webpack配置文件中无法使用
        modules: [path.resolve("node_modules"),path.resolve("src")],
        //原本在文件夹里去找package.json只会找main和module现在fuck和shit也会去找优先级从左到右
        mainFields:['main','module','fuck','shit'],
        //给引入的模块取个别名可以是文件全路径也可以是文件夹
        alias:{
            'lwh':path.resolve('./src/assets/lwh.js')
        }
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
    watch:false,
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,//每多少秒询问一次
        aggregateTimeout: 1000//发现改动后多少秒执行打包
    },
    devtool:'source-map',//在--mode production模式下也能精准定位报错位置
    module:{
        //不去解析的文件
        noParse: [/lwh\.js/],
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
                }),
                exclude:[path.resolve('./dist'),/node_modules/],//排除解析dist文件夹
                include:[path.resolve('./src')]//只编译src文件夹 但是node_modules除外
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
                    ],
                }),
                exclude:[path.resolve('./dist'),/node_modules/],//排除解析dist文件夹
                include:[path.resolve('./src')]//只编译src文件夹 但是node_modules除外
            },
            //解析并且正确引入打包后的图片file-loader和url-loader功能一样url多了一个转base64 功能
            {
                test:/\.(gif|png|jpg|svg)/,
                use:{
                    loader:'url-loader',
                    options: {
                        outputPath:'images',
                        name:'[name].[hash:8].[ext]',
                        limit:1024*8//小于8KB会被转成base64
                    }
                },
                exclude:[path.resolve('./dist'),/node_modules/],//排除解析dist文件夹
                include:[path.resolve('./src')]//只编译src文件夹 但是node_modules除外
            },
            //解析html页面上的img标签 但是htmlWebpackPlugin.options.title无法读取
            {
                test:/\.(html|htm)/,
                loader:'html-withimg-loader'
            },
            {
                test:/\.js/,
                use:{
                    loader:'babel-loader',
                    query:{
                        presets:['env','stage-0','react']//把es6 es7转成es语法
                    }
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    chunks:'all',
                    name: 'common',
                    priority: 10,
                    enforce: true,
                    minChunks:2//最小被引用两次的公共库才被抽离到公共代码
                }
            }
        }
    },
    plugins: [

        /*//在这边配置全局引入后哪个模块不用require都可以用
        new webpack.ProvidePlugin({
            $:'jquery'
        }),*/
        new CleanWebpackPlugin(['./dist']),//删除文件夹插件
        //设置成disable:true就不会抽离CSS(抽离css不会自动更新页面样式)
        new ExtractTextWebpackPlugin1({filename:'css/style.css',disable:false}),
        //new ExtractTextWebpackPlugin2({filename:'less/style.css'}),
        //清除没用到的样式，只有在抽离css的模式生效,指定的是模板html文件
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, './*.html')),
        }),
        //css压缩
        new OptimizeCssnanoPlugin({
            sourceMap: true,
            cssnanoOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true,
                    }
                }]
            },
        }),
        //复制文件夹文件
        new copyWebpackPlugin([
            {from:path.resolve(__dirname,'./copy1'),to:path.resolve(__dirname,'./dist/copy1')},
            {from:path.resolve(__dirname,'./copy2'),to:path.resolve(__dirname,'./dist/copy2')}
        ]),
        //new uglifyjsWebpackPlugin(),//webpack4会对JS进行自动压缩
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