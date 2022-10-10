const mongoose=require('mongoose');


 mongoose
  .connect(
    "mongodb+srv://anildb:anildb@cluster0.apysrix.mongodb.net/e-commerce-dash?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("Failed");
  });
 