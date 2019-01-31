/**
 * Created by admin on 2019/1/20.
 */
let {Tapable,SyncHook} = require('tapable')
let hooks = new Tapable() //没实际意义
hooks = {
    myHook:new SyncHook()
}

hooks.myHook.tap('1',function(){
    console.log(1);
})
hooks.myHook.tap('2',function(){
    console.log(2);
})
hooks.myHook.call()
