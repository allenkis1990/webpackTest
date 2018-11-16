import {obj} from '../services/data1.js';
//把css以后style的形式插入到页面上
//import '../style/style1.css';

require('../style/style1.css');
require('../less/style1.less');
//console.log(obj);
document.getElementsByTagName('p')[0].innerText = obj.name;
if(module.hot){
    module.hot.accept();
}
