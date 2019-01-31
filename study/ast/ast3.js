//预计算const sum = 1000 * 60 * 60 * 24
let babelCore = require('babel-core')
let babelTypes = require('babel-types')

let code = 'const sum = 1000 * 60 * 60 * 24'
let visitor={
    BinaryExpression:function(path){
        var node = path.node
        var res = null
        if(!isNaN(node.left.value)&&!isNaN(node.right.value)){
            //console.log(node.left.value);
            //console.log(node.right.value);
            let res = eval(node.left.value+node.operator+node.right.value)
            res = babelTypes.numericLiteral(res)
            path.replaceWith(res)
            var parentPath = path.parentPath
            if(parentPath.node.type === 'BinaryExpression'){
                visitor.BinaryExpression(parentPath)
            }
        }

    }
}
let result = babelCore.transform(code,{
    plugins:[
        {
            visitor
        }
    ]
})
console.log(result.code);