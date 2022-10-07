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

app.listen(port, () => {
  console.log(`server is listing ${port}...`);
});
