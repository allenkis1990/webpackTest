//手写实现
//class AsyncSeriesBailHook{
//    constructor(){
//        this.hooks = []
//    }
//    tapAsync(fnName,fn){
//        this.hooks.push(fn)
//    }
//    callAsync(){
//        var arg = Array.from(arguments)
//        var lastfn = arg.pop()
//        //console.log(arg);
//        var index = 0
//        var that = this
//        function next(err){
//            //console.log(arg);
//            if(err){
//                return lastfn()
//            }
//            var fn = that.hooks[index++]
//            fn?fn(...arg,next):lastfn()
//        }
//        next()
//    }
//}

//使用tapAsync调用
//串行执行 遇到错误停止
let {AsyncSeriesBailHook} = require('tapable')

let queue = new AsyncSeriesBailHook(['name'])
console.time('costTime')
queue.tapAsync('1',function(name,cb){
    setTimeout(function(){
        console.log('1',name)
        cb()
    },1000)
})
queue.tapAsync('2',function(name,cb){
    setTimeout(function(){
        console.log('2',name)
        cb('w')
    },2000)
})
queue.tapAsync('3',function(name,cb){
    setTimeout(function(){
        console.log('3',name)
        cb()
    },3000)
})
queue.callAsync('lwh',function(err){
    if(err){
        console.log('err:'+err);
    }
    console.timeEnd('costTime')
})

