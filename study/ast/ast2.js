//箭头函数转普通函数
let babelCore = require('babel-core')
let babelTypes = require('babel-types')

let code = 'let fn = (a,b)=>a+b'
let result = babelCore.transform(code,{
    plugins:[
        {
            visitor:{
                ArrowFunctionExpression:function(path){
                    let params = path.node.params
                    let body = babelTypes.blockStatement([babelTypes.returnStatement(path.node.body)])
                    let func = babelTypes.functionExpression(null, params, body, false, false)
                    path.replaceWith(func)
                }
            }
        }
    ]
})
console.log(result.code);