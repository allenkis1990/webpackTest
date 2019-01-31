//手写实现
class SyncLoopHook{
    constructor(){
        this.hook = null
    }
    tap(fnName,fn){
        this.hook=fn
    }
    call() {
        let result
        do {
            result = this.hook(...arguments)
        } while (result)
    }

}

//一般只调用call一次否则出错 return true的时候继续执行false后停止循环
//let {SyncLoopHook} = require('tapable')
let queue = new SyncLoopHook(['name'])
let count = 0
queue.tap('1',function(name){
    count++
    console.log(count,name)
    if(count<5){
        return true
    } else {
        return false
    }
})
queue.call('lwh')
