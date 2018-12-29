// class Liu{
//     constructor (name,age) {
//         this.name = name
//         this.age = age
//     }
//     say () {
//         console.log(this.name+this.age);
//     }
// }
// let liu = new Liu('lwh',18)
// liu.say()
console.log(1222);
let p = new Promise((resolve,reject)=>{
    resolve('haha');
})
p.then((data)=>{
    console.log(data);
})
import $ from 'jquery';
$.ajax({
    url:'/mobile/getData',
    method:'get',
    success :function (data) {
        console.log(data);
    }
})
//require('assets/lwh');
// let vue = require('vue');
// import Vue from 'vue'
let Vue = require('Vue')
console.log(Vue.use,'use');
console.log(new Vue({
    el:'#app',
    data:{
        fuck:'lwh'
    }
}),'vue!');
require('lwh');
console.log($);
//require('../../out.css');
// console.log(fuck);报错
if(module.hot){
    module.hot.accept();
}
