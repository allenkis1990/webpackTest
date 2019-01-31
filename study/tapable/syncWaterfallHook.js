//手写实现
class SyncWaterfallHook{
    constructor(){
        this.hooks = []
    }
    tap(fnName,fn){
        this.hooks.push(fn)
    }
    call(){
        let fnResult
        for(let i =0;i<this.hooks.length;i++){
            let item = this.hooks[i]
            fnResult = i===0?item(...arguments):item(fnResult)
        }
    }
}


//把返回值往下传
//let {SyncWaterfallHook} = require('tapable')

let queue = new SyncWaterfallHook(['name'])
queue.tap('1',function(name){
    console.log('1',name)
    return '1'
})
queue.tap('2',function(data){
    console.log('2',data)
    return '2'
})
queue.tap('3',function(data){
    console.log('3',data)
})
queue.call('lwh')//1,lwh  2,1 3,2
