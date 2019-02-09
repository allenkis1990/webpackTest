module.exports = loader
let loaderUtils = require('loader-utils')
function loader(source){
    let arr = ['let arr = []']
    arr.push('arr.push(".a{color:red}");')
    arr.push('arr.push(".a{font-size:18px}");')
    arr.push('module.exports = arr.join("\\r\\n");')
    //console.log(arr.join('\r\n'));
    //return source
    return arr.join('\r\n')
}