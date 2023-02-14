var express = require("express");
const router = express.Router();
const Med_data = require("../../modal/schema");
const cloudinary = require("cloudinary");
const Cart = require("../../modal/cartschema");

//----------------------------------------------------post makaj api------------------------------------------------------------------------
router.post("/product",async (req, res) => {
  cloudinary.v2.config({
    cloud_name: "makkaj",
    api_key: "466677627313198",
    api_secret: "pNKp_Pph0qri0gHHFi9a8xEYvzI"
  });


  let pro = await Med_data.findOne({ _id:req.body._id });
if(pro){

  Med_data.deleteMany({ _id: req.body._id },(err,user)=>{
    if(err){
      console.log(err);
    }
  });

}

let x=[];
req.body.images.map((item,index)=>{
  cloudinary.v2.uploader.upload(
    item,
    function (error, result) {
      if(error){
        console.log(error)
        return error;
      }
       x.push(result.url);
      if(index==req.body.images.length-1){
        console.log(x)
        Med_data.insertMany(
          {
            title: req.body.title,
            image: x,
            arabicdescription: req.body.arabicdescription,
            description: req.body.description,
            price: req.body.price,
            discountprice: req.body.discountprice,
            weight: req.body.weight,
            size: req.body.size,
            category: req.body.category,
            short: req.body.short,
            stock: req.body.stock,
            arabictitle:req.body.arabictitle,
            shortaed:req.body.shortaed,
          },
          (err, user) => {
            if (err) {
              console.log(err);
              return res.status(500).send({ err: err });
            }
            return res.status(200).send(user);
          }
        );
      }
      
    }
  );
})




  console.log(x);

  //------------------------------------------------get image url-------------------------------------------------------------------

  //------------------------------------------------upload image in mongo-----------------------------------------------------------
});
//----------------------------------------------------get meds api-------------------------------------------------------------------------

router.get("/product", (req, res) => {
  Med_data.find({}, (err, user) => {
    if (err) {
      return res.status(500).send({ err: err });
    }
    return res.status(200).send({ user: user });
  });
});
router.get("/detail/:productid", (req, res) => {
  Med_data.find({ _id: req.params.productid }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ err: err });
    }
    return res.status(200).send({ user: user });
  });
});
router.post("/productdelete", (req, res) => {
  Med_data.remove({ _id: req.body.id }, (err, user) => {
    if (err) {
      return res.status(500).send({ err: err });
    }
    console.log(user);
    return res.status(200).send({ user: user });
  });
});

router.route("/updateproduct").put(async function (req, res) {
  Cart.find({ userId: req.body.user }, async (err, usercart) => {
    if (err) {
      return res.status(500).send({ err: err });
    }
    for(let i = 0; i < usercart[0].products.length; i++) {
  const product=await Med_data.findOne({_id:usercart[0].products[i].productId});
      Med_data.findOneAndUpdate({_id: usercart[0].products[i].productId}, 
        { 
          "$set": {[`stock.${usercart[0].products[i].pricecon}`]: product.stock[usercart[0].products[i].pricecon]-1} 
        },
        function (err, result) {
          if (err) {
            res.send(err);
            console.log(err)

          } else {
            res.json(result);
            console.log(result)
          }
        })
      
    }
  });
});

module.exports = router;
