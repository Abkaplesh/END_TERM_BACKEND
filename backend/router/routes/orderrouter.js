var express = require("express");
const router = express.Router();
const Order = require("../../modal/orderschema");
const Cart = require("../../modal/cartschema");
const Address = require("../../modal/address");
const Razorpay = require("razorpay");
const { response } = require("express");
const nodeCCAvenue = require('node-ccavenue');
const https = require('https');
const querystring = require('querystring');
const axios = require('axios');
const reques=require('request');
const nodemailer = require("nodemailer");

//----------------------------------------------------post makaj Order api------------------------------------------------------------------------

router.post("/order", (req, res) => {
  const userId = req.body.userId;
  Cart.find({ userId: userId }, (err, usercart) => {
    if (err) {
      return res.status(500).send({ err: err });
    }

    Address.find({ userId: userId }, (err, user) => {
      if (err) {
        return res.status(500).send({ err: err });
      }
      Order.insertMany(
        {
          userId: userId,
          orderItems: usercart[0].products,
          shippingAddress: user[0].shippingAddress,
          paymentMethod: req.body.paymentMethod,
          paymentResult: req.body.paymentResult,
          taxPrice: req.body.taxPrice,
          shippingPrice: req.body.shippingPrice,
          totalPrice: req.body.totalPrice,
          transactionId: req.body.transactionId,
          isPaid: req.body.isPaid,
          paidAt: req.body.paidAt,
          isDelivered: false,
          isCancelled: false,
        },
        (err, users) => {
          if (err) {
            console.log(err);

            return res.status(400).send({ err: err });
          }

          return res.status(200).send(users);
        }
      );
    });
  });
});

router.get("/order/:userId", (req, res) => {
  Order.find({ userId: req.params.userId, isDelivered: false }, (err, user) => {
    if (err) {
      return res.status(500).send({ err: err });
    }
    return res.status(200).send({ user: user });
  });
});

router.post('/order/delivered',async (req,res)=>{

  try{
  let order = await Order.findOne({ _id:req.body.id });  

  if (order) {
    //cart exists for user
     
      //product does not exists in cart, add new item
      order.isDelivered=true;
    
      order = await order.save();
      console.log(order)
    return res.status(201).send(order);
  } 
} catch (err) {
  console.log(err);
  res.status(500).send("Something went wrong");
}


  
})

router.get("/orders/:id", (req, res) => {
  Order.find({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(500).send({ err: err });
    }
    return res.status(200).send({ user: user });
  });
});

router.get("/allorder/:userId", (req, res) => {
  Order.find({ userId: req.params.userId }, (err, user) => {
    if (err) {
      return res.status(500).send({ err: err });
    }
    return res.status(200).send({ user: user });
  });
});

router.get("/adminorder", (req, res) => {
  Order.find({}, (err, user) => {
    if (err) {
      return res.status(500).send({ err: err });
    }
    return res.status(200).send({ user: user });
  });
});

router.post('/postmail',(req,res)=>{
sendEmail(req.body.email,"Order Confirmation","Your order is confirmed");
return res.status(200);
})



const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service:"Outlook365",
      auth: {
        user: "monjoor@makkaj.com",
        pass: "mmi1234@",
      },
    });

    await transporter.sendMail({
      from: "monjoor@makkaj.com",
      to: email,
      subject: subject,
      text: text,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

router.post('/checkout', function(req, res) {
  request(function(responseData) {
    console.log(responseData);
    res.json(responseData);
  },req.body.amt,req.body.crr);
});

function request(callback,amt,crr) {
  var path = '/v1/checkouts';
  var data = querystring.stringify({
    entityId: '8a82941750616e5a01506185ccc3007c',
    amount: amt,
    currency: crr,
    paymentType: 'DB',
  });
  var options = {
    port: 443,
    host: 'test.oppwa.com',
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length,
      Authorization:
        'Bearer OGE4Mjk0MTc1MDYwODIzYTAxNTA2MDg2NmE0ODAwMmN8WlI5eld5UlA=',
    },
  };
  var postRequest = https.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      jsonRes = JSON.parse(chunk);
      return callback(jsonRes);
    });
  });
  postRequest.write(data);
  postRequest.end();
}

router.post('/result', function(req, res) {
  console.log(req.body);
  resultRequest(req.body.resourcePath, function(responseData) {
    res.json(responseData);
  });
});

function resultRequest(resourcePath, callback) {
  var path = resourcePath;
  path += '?entityId=8a82941750616e5a01506185ccc3007c';
  //   var options = {
  //     port: 443,
  //     host: 'test.oppwa.com',
  //     path: path,
  //     method: 'GET',
  //     headers: {
  //       Authorization:
  //         'Bearer OGE4Mjk0MTc1MDYwODIzYTAxNTA2MDg2NmE0ODAwMmN8WlI5eld5UlA=',
  //     },
  //   };
  //   var postRequest = https.request(options, function(res) {
  //     res.setEncoding('utf8');
  //     res.on('data', function(chunk) {
  //       jsonRes = JSON.parse(chunk);
  //       return callback(jsonRes);
  //     });
  //   });
  //   postRequest.end();
  const url = 'https://test.oppwa.com' + path;
  axios
    .get(url, {
      headers: {
        Authorization:
          'Bearer OGE4Mjk0MTc1MDYwODIzYTAxNTA2MDg2NmE0ODAwMmN8WlI5eld5UlA=',
      },
    })
    .then(function(response) {
      // handle success
      // console.log(response);
      try {
        resDate = JSON.parse(response);
      } catch (e) {
        resData = response;
        // console.log(resData.data.id);
      }

      return callback(resData.data);
    })
    .catch(function(error) {
      // handle error
      //

      console.log(error);
    });
}



const instance = new Razorpay({
  key_id: "rzp_test_V9McTPCQ0fi6X7",
  key_secret: "R3n6qAABuX0cJn0vLOyZo8XX",
});

router.get("/payment/:curr/:amt", (req, res) => {
  try {
    const options = {
      amount: req.params.amt * 100, // amount == Rs 10
      currency: req.params.curr,
      receipt: "receipt#1",
      payment_capture: 0,
      // 1 for automatic capture // 0 for manual capture
    };
    instance.orders.create(options, async function (err, order) {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
        });
      }
      return res.status(200).json(order);
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
});

router.post("/capture/:paymentId", (req, res) => {
  try {
    return reques(
      {
        method: "POST",
        url: `https://rzp_test_V9McTPCQ0fi6X7:R3n6qAABuX0cJn0vLOyZo8XX@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form: {
          amount: req.body.amt * 100, // amount == Rs 10 // Same As Order amount
          currency: req.body.crr,
        },
      },
      async function (err, response, body) {
        if (err) {
          return res.status(500).json({
            message: "Something Went Wrong",
          });
        }

        return res.status(200).json({ body: body, success: true });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
});


module.exports = router;
