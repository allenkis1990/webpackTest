import {obj} from '../services/data1.js';
import $ from 'jquery';
//var $ = require('jquery');
//把css以后style的形式插入到页面上
//import '../style/style1.css';
console.log($);
require('../style/style1.css');
require('../less/style1.less');
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
if(module.hot){
    module.hot.accept();
}
