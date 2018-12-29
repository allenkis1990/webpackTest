const express = require('express')
const app = express()

app.get('/mobile/getData',function(req,res){
    let data = {name:'allen'}
    res.send(data)
})
app.listen('8899')