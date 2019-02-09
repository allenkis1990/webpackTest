/**
 * Created by admin on 2019/2/9.
 */
//"html-webpack-plugin": "^3.2.0",
//把index.html上的引入的资源变成行内标签
const HtmlWebpackPlugin = require('html-webpack-plugin');
function inlineTagPlugin({a}){
    this.a = a
}
inlineTagPlugin.prototype.dataDataItem=function(item,compilation){
    let fileUrl='',type='',tagName='',dataItem
    if(item.tagName==='link'){
        fileUrl = item.attributes.href
        type = 'text/css'
        tagName = 'style'
    }
    if(item.tagName==='script'){
        fileUrl = item.attributes.src
        type = 'text/javascript'
        tagName = 'script'
    }
    if(fileUrl){
        dataItem = {
            attributes:{
                type:type
            },
            tagName:tagName,
            innerHTML:compilation.assets[fileUrl].source()
        }
        delete compilation.assets[fileUrl]
    } else {
        dataItem = item
    }
    return dataItem
}
inlineTagPlugin.prototype.doData=function(data,compilation){
    //console.log(data);
    let headTags = [], bodyTags = []
    data.headTags.forEach((item)=>{
        headTags.push(this.dataDataItem(item,compilation))
    })
    //data.bodyTags.forEach((item)=>{
    //    bodyTags.push(this.dataDataItem(item,compilation))
    //})
    return {...data,headTags}
    //return {...data,headTags,bodyTags}
}
inlineTagPlugin.prototype.apply=function(compiler){
    //console.log(this.a);
    compiler.hooks.compilation.tap('inlineTagPlugin', (compilation) => {
        // Staic Plugin interface |compilation |HOOK NAME | register listener
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
            'alterAssetTagGroups',
            (data, cb) => {
                data = this.doData(data,compilation)
                // Tell webpack to move on
                cb(null, data)
            }
        )
    })
}
module.exports = inlineTagPlugin