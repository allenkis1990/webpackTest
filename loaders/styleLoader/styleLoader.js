module.exports = loader
let loaderUtils = require('loader-utils')
function loader(source){
    let str = `let style = document.createElement('style')
               style.innerHTML = ${JSON.stringify(source)}
               document.head.appendChild(style)`
    return str
}