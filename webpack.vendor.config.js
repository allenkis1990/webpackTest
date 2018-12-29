let path = require('path');
let webpack = require('webpack');
module.exports = {
    entry:{
        vueAll:['./node_modules/vue/dist/vue.min.js']
    },
    output:{
        //生成动态链接库JS
        path:path.resolve('./src/assets'),
        filename:'[name]_dll.js',
        library:'_dll_[name]'
    },
    plugins:[
        //生成动态链接库json
        new webpack.DllPlugin({
            name:'_dll_[name]',
            path:path.resolve('./src/assets','manifest.json')
        })
    ]
}
