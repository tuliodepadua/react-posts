const express = require('express')  
const mongoose = require('mongoose')  
const app = express();
 
mongoose.connect('mongodb+srv://tuliodepadua:tuliodepadua@cluster0-og0qq.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
}, 
e=>{
    console.log(e)
})

app.use(require('./routes'))

app.listen(3333)