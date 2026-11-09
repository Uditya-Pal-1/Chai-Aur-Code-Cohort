import express from "express";
const app = express();
const port = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("hello Aman!");
});

app.get("/crash",(req,res)=>{
    res.send("App is crashing...")
    process.exit(1);
});

app.get("/:id", (req,res)=>{
    res.send(`hello bro: ${req.params.id}`);
});

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
});