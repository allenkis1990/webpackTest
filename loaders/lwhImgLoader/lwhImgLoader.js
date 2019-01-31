module.exports = loader
let loaderUtils = require('loader-utils')
function loader(source){
    //console.log(source.length);//转成2进制后直接打印length能打印出b
    console.log(this.resourcePath)
    let options = loaderUtils.getOptions(this)
    //生成文件名
    let fileName = loaderUtils.interpolateName(this,'[hash].[ext]',{content:source})
    console.log(fileName);
    //发射文件
    this.emitFile(options.filePath+'/'+fileName,source)
    return `module.exports = "${options.filePath}/${fileName}"`
}
//转2进制要不输出的是乱码
loader.raw = true