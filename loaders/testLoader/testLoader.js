module.exports = loader
let loaderUtils = require('loader-utils')
//同步用return
// function loader(source){
//     console.log(source);
//     console.log(loaderUtils.getOptions(this));
//     return source
// }
//异步用this.async() 第一个参数err 第二个参数source
function loader(source){
    // return JSON.stringify(source)
    // console.log(source);
    // console.log(loaderUtils.getOptions(this));
    // let options = loaderUtils.getOptions(this)
    // let cb = this.async()
    // setTimeout(()=>{
    //     cb(null,source+options.lwhop)
    // },2000)

    console.log(typeof source);
    let viewContent = getTagContent('lwhView',source)
    let styleContent = getTagContent('style',source)
    let scriptContent = getTagContent('script',source)

    //插入的内容一定要进行JSON.stringify否则loader会报错
    // let code = `
    //     let div = document.createElement('div')
    //     div.innerHTML = ${JSON.stringify(viewContent)}
    //     document.body.appendChild(div)
    //     let script = document.createElement('script')
    //     script.innerHTML = ${JSON.stringify(scriptContent)}
    //     document.head.appendChild(script)
    //     let style = document.createElement('style')
    //     style.innerHTML = ${JSON.stringify(styleContent)}
    //     document.head.appendChild(style)
    // `

    //构建完后会在dist下生成文件夹和文件
    this.emitFile('file/allen.js',scriptContent)
    this.emitFile('file/allen.css',styleContent)
    let code = `
        let div = document.createElement('div')
        div.innerHTML = ${JSON.stringify(viewContent)}
        document.body.appendChild(div)
        let script = document.createElement('script')
        script.src = 'file/allen.js'
        document.head.appendChild(script)
        let style = document.createElement('link')
        style.rel="stylesheet"
        style.href = 'file/allen.css'
        document.head.appendChild(style)
    `
    console.log(JSON.stringify(code));
    return code
    // cb(null,source)
}
function getTagContent(tagName,source){
    let reg = new RegExp('</?'+tagName+'[^>]*>','ig')
    let cur;
//console.log(str.match(viewReg));
    let resultArr = []
    while(cur=reg.exec(source)){
        resultArr.push({execArr:cur,execLastIndex:reg.lastIndex})
    }
    // console.log(source);
    // console.log(resultArr);
    if(resultArr.length){
        if(resultArr.length>2){
            throw new Error(tagName+'标签只能有一对')
        }
        let sliceStart = resultArr[0].execLastIndex
        let sliceEnd = resultArr[1].execArr.index
//    console.log(sliceEnd);
        let content = source.slice(sliceStart,sliceEnd)
        return content
    } else{
        throw new Error('必须创建一对'+tagName+'标签')
    }
}