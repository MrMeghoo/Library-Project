const express = require('express')
const pgp = require('pg-promise')();
const db = pgp('postgres://avdxxhsq:Ngu7xpaEW3m4SGx0lWBeOln7iq_WErpE@ziggy.db.elephantsql.com/avdxxhsq')


const app = express()



app.get('/library', async function(req,res){

})


app.post('/library', async function(req,res){

})

app.patch('/library/:id', async function(req,res){

})

app.delete('/library/:id', async function(req,res){
    
})