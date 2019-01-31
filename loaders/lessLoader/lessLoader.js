module.exports = loader
let loaderUtils = require('loader-utils')
let less = require('less')
function loader(source){
    let cb = this.async()
    let css
    less.render(source,function(err,res){
        cb(err,res.css)
    })
}