const express = require('express')
const merge = require('webpack-merge')
const app = express()
const webpack  = require('webpack')
let webpackConfig = process.env.NODE_ENV === 'production' ?
    require('./webpack.pro.config') :
    require('./webpack.dev.config');
const webpackBaseConfig = require('./webpack.base.config');
let finallyConfig = merge(webpackBaseConfig,webpackConfig);
var compiler = webpack(finallyConfig)


//////////////////////热更新////////////////////////////
// 开发环境下加自动刷新的entry
if(process.env.NODE_ENV === 'development'){
    Object.keys(webpackBaseConfig.entry).forEach(function (name) {
        webpackBaseConfig.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(webpackBaseConfig.entry[name])
    })
}
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
})
app.use(hotMiddleware);
//////////////////////热更新////////////////////////////


//////////////////////开发服务器配置////////////////////////////
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    quiet: true
})
app.use(devMiddleware);
//////////////////////开发服务器配置////////////////////////////


//////////////////////代理////////////////////////////
let proxyList = {
    '/mobile': {
        target: 'http://192.168.28.250:8899/'
        // changeOrigin: false
    }
}
const proxyMiddleware = require('http-proxy-middleware')
Object.keys(proxyList).forEach(function (context) {
    var options = proxyList[context]
    if (typeof options === 'string') {
        options = {target: options}
    }
    app.use(proxyMiddleware(context, options))
})
//////////////////////代理////////////////////////////

// 启动服务
app.listen('8081');