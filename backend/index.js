
const express = require("express");

 const cors=require('cors')

require("./db/config");
const User = require("./db/user");
const app = express();

let port = 8000;

app.use(express.json())
app.use( cors())
app.post("/register" , async (req,res)=>{

      const user= new User(req.body)
      
       const result= await user.save();

    res.send(result)

})













app.listen(port, () => {
  console.log(`server is listing ${port}...`);
});
