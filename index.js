const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const SellerModel = require("./models/Sellers");
const ProductModel = require("./models/Products");
require("dotenv").config();


app.use(cors());
app.use(express.json());
/// DATABASE CONNECTION
mongoose.connect(
    "mongodb+srv://kai_beauty:password123project@beauty.zh8w9.mongodb.net/companydb?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );

// app.get("/insert", async (req, res) => {
//     const seller = new SellerModel({ name: "John", age: 12 });
//     await seller.save(); // paralel
//     res.send("Inserted DATA");
// });
app.post("/addseller", async (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const seller = new SellerModel({ name: name, age: age });
    await seller.save(); // paralel
    res.send(seller);
});
app.get("/read", async (req, res) => {
    // find like filter
    SellerModel.find({}, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

  //update
  app.put("/update", async(req, res) => {
    const newAge = req.body.newAge;
    const id = req.body.id;

    try {
      await SellerModel.findById(id, (error, sellerToUpdate) => {
        sellerToUpdate.age = Number(newAge);
        sellerToUpdate.save();
      })
    } catch(err) {
      console.log(err);
    }

    res.send("updated");
  })

  app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    await SellerModel.findByIdAndRemove(id).exec();
    res.send("itemedeleted");
  })

// ------      product   -------------
app.post("/addproduct", async (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const sellerName = req.body.sellerName;
  const product = new ProductModel({ name: name, price: price, sellerName: sellerName});
  await product.save(); // paralel
  res.send(product);
});

app.get("/readproduct", async (req, res) => {
  // find like filter
  ProductModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

//update
app.put("/updateproduct", async(req, res) => {
  const newPrice = req.body.newPrice;
  const id = req.body.id;
  const newSellerName = req.body.newSellerName;

  try {
    await ProductModel.findById(id, (error, productToUpdate) => {
      productToUpdate.price = Number(newPrice);
      productToUpdate.sellerName = newSellerName;
      productToUpdate.save();
    })
  } catch(err) {
    console.log(err);
  }

  res.send("updatedproduct");
})

app.delete("/deleteproduct/:id", async (req, res) => {
  const id = req.params.id
  await ProductModel.findByIdAndRemove(id).exec();
  res.send("itemedeletedproduct");
})


app.get("/displayproduct/:sellerName", async (req, res) => {
  // find like filter
  const selectSeller = req.params.sellerName;
  //console.log(selectSeller);
  ProductModel.find({"sellerName": selectSeller}, (err, result) => {
    if (err) {
      
      res.send(err);
    } else {
      res.send(result);
    }
  });
});


app.listen(process.env.PORT || 3001, () => {
    console.log("You are connected!");
  });