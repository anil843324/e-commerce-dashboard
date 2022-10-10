const express = require("express");

 const jwt = require("jsonwebtoken");
 
const jwtKey='e-commerce'

const cors = require("cors");

require("./db/config");

const User = require("./db/user");
const Product=require('./db/Product')

const app = express();

// port
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  const user = new User(req.body);

  let result = await user.save();

  result = result.toObject();

  delete result.password;

  jwt.sign({result}, jwtKey, {expiresIn:"2h"}, (err,token)=>{
 
    if(err){
      res.send({  result: "something went wrong" });
    }
      res.send({result,auth:token});
 })

});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");

    if (user) {
       jwt.sign({user}, jwtKey, {expiresIn:"2h"}, (err,token)=>{
 
          if(err){
            res.send({  result: "something went wrong" });
          }
            res.send({user,auth:token});
       })
      // res.send(user);
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.send({ result: "No User Found" });
  }
});

app.post("/add-product", verifyToken, async (req, res) => {
  const product = new Product(req.body);

  let result = await product.save();

  res.send(result);
});

// get products from data base

app.get("/products", verifyToken, async (req,res)=>{


  let products= await Product.find();

   if(products.length>0){
    res.send(products)
   }else{

     res.send({result:"No products found"})

   } 


})
// delete data from products

app.delete("/product/:id", verifyToken, async (req,res)=>{

   const result= await Product.deleteOne({_id:req.params.id})
   res.send(result);
})

// get single product from products database

app.get("/product/:id" , verifyToken, async (req,res)=>{

 let result= await Product.findOne({_id:req.params.id});

   if(result){
     res.send(result)
   }else{
     res.send({result:"Not Record Found"})
   }
    

})

// update data in product

app.put("/product/:id", verifyToken, async (req,res)=>{

 let result= await Product.updateOne(
  
  {_id:req.params.id},
  
  {$set:req.body} 
  
  )
 res.send(result)

})

// search product for api

app.get("/search/:key", verifyToken, async(req,res)=>{

 
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

// jwt token middleware verification

 function verifyToken(req,res,next){

   let token=req.headers['authorization']


    if(token){

        token=token.split(" ")[1]

        jwt.verify( token ,jwtKey, (err,valid)=>{

          if(err){

            res.status(401).send( {result:"Please prove valid token "})
          }else{
 
             next();

          }

        } )

    }else{

         res.status(403).send( {result:"Please add token with header"})

    }
 

 }




app.listen(port, () => {
  console.log(`server is listing ${port}...`);
});
