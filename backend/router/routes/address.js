var express = require("express");
const router = express.Router();
const Address = require("../../modal/address");
const axios = require("axios");

//----------------------------------------------------post makaj cart api------------------------------------------------------------------------

router.post("/address", async (req, res) => {
  let address = await Address.findOne({
    userId: req.body.userId,
  });
  if (address) {
    if (address.address.length < 4) {
      address.address.push({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        appartment: req.body.appartment,
        city: req.body.city,
        country: req.body.country,
        state: req.body.state,
        pin: req.body.pin,
        phone: req.body.phone,
        email: req.body.email,
      });
      address = address.save();
      return res.status(201).send(address);
    }
  } else {
    Address.insertMany(
      {
        address: [
          {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            appartment: req.body.appartment,
            city: req.body.city,
            country: req.body.country,
            state: req.body.state,
            pin: req.body.pin,
            phone: req.body.phone,
            email: req.body.email,
          },
        ],

        userId: req.body.userId,
      },
      (err, user) => {
        if (err) {
          return res.status(500).send({
            err: err,
          });
        }
        return res.status(200).send(user);
      }
    );
  }
});
//get address--------------------------------------------------------------------------------------------------------------
router.get("/address/:userId", (req, res) => {
  Address.find(
    {
      userId: req.params.userId,
    },
    (err, user) => {
      if (err) {
        return res.status(500).send({
          err: err,
        });
      }
      return res.status(200).send({
        user: user,
      });
    }
  );
});

router.put("/updatemethod", async (req, res) => {
  let address = await Address.findOne({
    userId: req.body.userId,
  });
  Address.updateOne(
    {
      userId: req.body.userId,
    },
    {
      $set: {
        shippingAddress: {
          firstname: address.shippingAddress.firstname,
          lastname: address.shippingAddress.lastname,
          address: address.shippingAddress.address,
          shippingMethod: req.body.method,
          appartment: address.shippingAddress.appartment,
          city: address.shippingAddress.city,
          country: address.shippingAddress.country,
          state: address.shippingAddress.state,
          pin: address.shippingAddress.pin,
          phone: address.shippingAddress.phone,
          email: address.shippingAddress.email,
        },
      },
    },
    (err, user) => {
      if (err) {
        return res.status(500).send({
          err: err,
        });
      }
      return res.status(200).send({
        user: user,
      });
    }
  );
});

router.post("/shippingaddress", async (req, res) => {
  let address = await Address.findOne({
    userId: req.body.userId,
  });

  if (address) {
    Address.updateOne(
      {
        userId: req.body.userId,
      },
      {
        $set: {
          shippingAddress: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            appartment: req.body.appartment,
            city: req.body.city,
            country: req.body.country,
            state: req.body.state,
            pin: req.body.pin,
            phone: req.body.phone,
            email: req.body.email,
          },
        },
      },
      (err, user) => {
        if (err) {
          return res.status(500).send({
            err: err,
          });
        }
        return res.status(200).send({
          user: user,
        });
      }
    );
  } else {
    Address.insertMany(
      {
        shippingAddress: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          address: req.body.address,
          appartment: req.body.appartment,
          city: req.body.city,
          country: req.body.country,
          state: req.body.state,
          pin: req.body.pin,
          phone: req.body.phone,
          email: req.body.email,
        },
        userId: req.body.userId,
        address: [],
      },
      (err, user) => {
        if (err) {
          return res.status(500).send({
            err: err,
          });
        }
        return res.status(200).send({
          user: user,
        });
      }
    );
  }
});

module.exports = router;
