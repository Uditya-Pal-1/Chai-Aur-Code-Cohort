const express = require("express")

const app = express();

app.del('/user/:id',(req, res) =>{
    res.send(`delete /user/${req.params.id}`)
})