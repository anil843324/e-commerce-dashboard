const express= require('express')

const app=express();

let port =8000;


app.get('/',(req,res)=>{

     res.send("hiii ")
})

app.listen(port,()=>{
     console.log(`server is listing ${port}...`)
})