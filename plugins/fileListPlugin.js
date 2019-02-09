//把webpack最后输出的所有文件记录在md上，形成一个最终输出文件列表
class fileListPlugin{
    constructor({fileName}){
        this.fileName = fileName
    }
    apply(compiler){
        compiler.hooks.emit.tapAsync('fileListPlugin',(compilation,cb)=>{
            let fileContent = ``
            Object.keys(compilation.assets).forEach((key)=>{
                fileContent+=`fileName:${key}    fileSize:${compilation.assets[key].size()}\r\n`
            })
            //console.log(fileContent);
            compilation.assets[this.fileName]={
                source(){
                    return fileContent
                },
                size(){
                    //获取字符串长度可把中文拆成字节
                    return Buffer.byteLength(fileContent)
                }
            }
            cb()

        })
    }
}
module.exports = fileListPlugin
