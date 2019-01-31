module.exports = loader
let loaderUtils = require('loader-utils')
let mime = require('mime')
function loader(source){
    //console.log(source.length);//转成2进制后直接打印length能打印出b
    // console.log(this.resourcePath)
    let options = loaderUtils.getOptions(this)
    let {limit} = options
    if(limit&&limit>source.length){
        return `module.exports = "data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
    } else {
        return require('../lwhImgLoader/lwhImgLoader').call(this,source)
    }
}
//转2进制要不输出的是乱码
loader.raw = true