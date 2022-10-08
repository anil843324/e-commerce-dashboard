const express = require("express");

const cors = require("cors");

require("./db/config");
const User = require("./db/user");
const Product=require('./db/Product')
const app = express();

let port = 8000;

app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  const user = new User(req.body);

  let result = await user.save();

  result = result.toObject();

  delete result.password;

  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");

    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.send({ result: "No User Found" });
  }
});

app.post("/add-product", async (req, res) => {
  const product = new Product(req.body);

  let result = await product.save();

  res.send(result);
});

// get products from data base

app.get("/products", async (req,res)=>{


  let products= await Product.find();

   if(products.length>0){
    res.send(products)
   }else{

     res.send({result:"No products found"})

   } 


})
// delete data from products

app.delete("/product/:id", async (req,res)=>{

   const result= await Product.deleteOne({_id:req.params.id})
   res.send(result);
})

// get single product from products database

app.get("/product/:id" , async (req,res)=>{

 let result= await Product.findOne({_id:req.params.id});

   if(result){
     res.send(result)
   }else{
     res.send({result:"Not Record Found"})
   }
    

})

// update data in product

app.put("/product/:id", async (req,res)=>{

 let result= await Product.updateOne(
  
  {_id:req.params.id},
  
  {$set:req.body} 
  
  )
 res.send(result)

})

// search product for api

app.get("/search/:key", async(req,res)=>{

 
   let result=await Product.find(

    {
      "$or" :[
        {name:{$regex:req.params.key}},
        {company:{$regex:req.params.key}},
        {category:{$regex:req.params.key}},
        {price:{$regex:req.params.key}}
      
      ]
    }
   )

   if(result.length>0){
    res.send(result)
   }else{
     res.send({result:"Not Found 😔"})
   }

   


})





app.listen(port, () => {
  console.log(`server is listing ${port}...`);
});
