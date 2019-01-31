//手写实现
//class SyncHook{
//    constructor(){
//        this.hooks = []
//    }
//    tap(fnName,fn){
//        this.hooks.push(fn)
//    }
//    call(){
//        this.hooks.forEach((item)=>{
//            //item(...arguments)
//            item.apply(null,arguments)
//        })
//    }
//}

//使用tapAsync调用
let {AsyncParallelBailHook} = require('tapable')

let queue = new AsyncParallelBailHook(['name'])
console.time('costTime')
queue.tapAsync('1',function(name,cb){
    setTimeout(function(){
        console.log(1,name);
        cb()
    },1000)
})
queue.tapAsync('2',function(name,cb){
    setTimeout(function(){
        console.log(2,name);
        cb('wrong')
    },2000)
})
queue.tapAsync('3',function(name,cb){
    setTimeout(function(){
        console.log(8,name);
    },8000)
})
queue.callAsync('lwh',function(err){
    console.timeEnd('costTime')
    if(err){
        console.log(err);
        return false
    }
})
//使用tapAsync调用

//let {AsyncParallelHook} = require('tapable')
//
//let queue = new AsyncParallelHook(['name'])
//console.time('costTime')
//queue.tapPromise('1',function(name){
//    return new Promise(function(resolve,reject){
//        setTimeout(function(){
//            console.log('1',name)
//            resolve()
//        },1000)
//    })
//})
//queue.tapPromise('2',function(name){
//    return new Promise(function(resolve,reject){
//        setTimeout(function(){
//            console.log('2',name)
//            resolve()
//        },2000)
//    })
//})
//queue.tapPromise('3',function(name){
//    return new Promise(function(resolve,reject){
//        setTimeout(function(){
//            console.log('3',name)
//            resolve()
//        },3000)
//    })
//})
//queue.promise('lwh').then(function(){
//    console.timeEnd('costTime')
//})
