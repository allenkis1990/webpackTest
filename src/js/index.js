//let content =  require('@/needParseFiles/a1.lwh')
// console.log(content,'666');
import {obj} from '../services/data1.js';
import $ from 'jquery';
console.log('当前是否开发环境'+dev);
require('lwh');
//var $ = require('jquery');
//把css以后style的形式插入到页面上
//import '../style/style1.css';
console.log($);
require('../style/style1.css');
require('../less/style1.less');
let fuck = require('fuck/jquery/dist/jquery.js');
console.log(fuck,'fuck');

//console.log(obj);
function a(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('haha111');
        },2000)
    })
}
a().then((data)=>{
    console.log(data);
})
const haha = require('haha');
console.log(haha,'hahahehe');
document.getElementsByTagName('p')[0].innerText = obj.name;

// let img = document.createElement('img')
// img.src = require('@/images/afei.jpg')
// document.body.appendChild(img)
let l = require('../needParseFiles/style1.less');
console.log(l,888);
if(module.hot){
    module.hot.accept();
}

