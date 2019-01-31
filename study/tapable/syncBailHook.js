//手写实现
//class SyncBailHook{
//    constructor(){
//        this.hooks = []
//    }
//    tap(fnName,fn){
//        this.hooks.push(fn)
//    }
//    call(){
//
//        for(let i =0;i<this.hooks.length;i++){
//            let item = this.hooks[i]
//            let fnResult = item(...arguments)
//            if(fnResult){
//                return false
//            }
//        }
//        /*this.hooks.forEach((item)=>{
//            //item(...arguments)
//            item.apply(null,arguments)
//        })*/
//    }
//}


//只要有一个方法return出东西就不执行下面了
let {SyncBailHook} = require('tapable')

let queue = new SyncBailHook(['name','age'])
queue.tap('1',function(name,age){
    console.log('1',name,age)
    return '1212'
})
queue.tap('2',function(name,age){
    console.log('2',name,age)
})
queue.tap('3',function(name,age){
    console.log('3',name,age)
})
queue.call('lwh','18')
