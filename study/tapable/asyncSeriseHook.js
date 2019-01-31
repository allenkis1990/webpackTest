//手写实现
class AsyncSeriesHook{
    constructor(){
        this.hooks = []
    }
    tapAsync(fnName,fn){
        this.hooks.push(fn)
    }
    callAsync(){
        var arg = Array.from(arguments)
        var lastfn = arg.pop()
        //console.log(arg);
        var index = 0
        var that = this
        function next(){
            //console.log(arg);
            var fn = that.hooks[index++]
            fn?fn(...arg,next):lastfn()
        }
        next()
    }
}

//使用tapAsync调用
//串行执行共6秒
//let {AsyncSeriesHook} = require('tapable')

let queue = new AsyncSeriesHook(['name'])
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
        cb()
    },2000)
})
queue.tapAsync('3',function(name,cb){
    setTimeout(function(){
        console.log('3',name)
        cb()
    },3000)
})
queue.callAsync('lwh',function(){
    console.log(88);
    console.timeEnd('costTime')
})

