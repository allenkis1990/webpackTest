//手写实现
class SyncHook{
    constructor(){
        this.hooks = []
    }
    tap(fnName,fn){
        this.hooks.push(fn)
    }
    call(){
        this.hooks.forEach((item)=>{
            //item(...arguments)
            item.apply(null,arguments)
        })
    }
}

//同步执行类似eventEmmit
//let {SyncHook} = require('tapable')

let queue = new SyncHook(['name','age'])
queue.tap('1',function(name,age){
    console.log('1',name,age)
})
queue.tap('2',function(name,age){
    console.log('2',name,age)
})
queue.tap('3',function(name,age){
    console.log('3',name,age)
})
queue.call('lwh','18')
