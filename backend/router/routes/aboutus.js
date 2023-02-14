var express = require("express");
const router = express.Router();
const Aboutus = require("../../modal/aboutus");
const cloudinary = require("cloudinary");

//----------------------------------------------------post makaj cart api------------------------------------------------------------------------
router.post("/aboutus", async (req, res) => {
  Aboutus.deleteMany({}, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  });

  cloudinary.v2.config({
    cloud_name: "makkaj",
    api_key: "466677627313198",
    api_secret: "pNKp_Pph0qri0gHHFi9a8xEYvzI",
  });

  let uploadeResponse = cloudinary.v2.uploader.upload(
    req.body.img1,
    function (error, result) {
      cloudinary.v2.uploader.upload(req.body.img2, function (error, result1) {
        console.log("i");

        Aboutus.insertMany(
          {
            head: req.body.head,
            title: req.body.title,
            head1: req.body.head1,
            info1: req.body.info1,
            img1: result.url,
            head2: req.body.head2,
            title2: req.body.title2,
            img2: result1.url,
          },
          (err, user) => {
            if (err) {
              console.log(err);
              return res.status(500).send({ err: err });
            }
            return res.status(200).send(user);
          }
        );
      });
    }
  );
});
//get address--------------------------------------------------------------------------------------------------------------
router.get("/aboutus", (req, res) => {
  Aboutus.find({}, (err, user) => {
    if (err) {
      return res.status(500).send({ err: err });
    }
    return res.status(200).send({ user: user });
  });
});
module.exports = router;
