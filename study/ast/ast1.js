/**
 * Created by admin on 2019/1/6.
 */
    //https://astexplorer.net/
let esprima = require('esprima')
let estraverse = require('estraverse')
let escodegen = require('escodegen')

let code = 'function ast(){}'
let ast = esprima.parse(code)
estraverse.traverse(ast,{
    enter(node){
        //console.log(node.type);
        if(node.type==='Identifier'){
            node.name+='_enter'
        }
    },
    leave(node){
        //console.log(node.type);
        if(node.type==='Identifier'){
            node.name+='_leave'
        }
    }
})
let result = escodegen.generate(ast)//function ast_enter_leave() {}

console.log(result);