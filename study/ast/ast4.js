//预计算const sum = 1000 * 60 * 60 * 24
let babelCore = require('babel-core')
let types = require('babel-types')

let code = 'const sum = 88'
let visitor={
    VariableDeclaration(path){
        let res = types.variableDeclaration('var', [types.variableDeclarator(types.identifier('sum'), types.numericLiteral(66))])
        //console.log(res);
        //console.log(path.node.declarations[0].init.value);
        //console.log(path.node.kind);
        path.node.kind = 'var'
        path.node.declarations[0].init.value = "'console.log(1)'"
        //path.replaceWith(res)
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