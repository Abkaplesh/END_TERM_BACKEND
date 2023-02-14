var express = require("express");
const router = express.Router();
const Banner = require("../../modal/bannerschema");
const cloudinary = require('cloudinary');

//----------------------------------------------------post makaj cart api------------------------------------------------------------------------
router.post("/banner", async (req, res) => {
    cloudinary.v2.config({
    cloud_name: "makkaj",
    api_key: "466677627313198",
    api_secret: "pNKp_Pph0qri0gHHFi9a8xEYvzI"
  });


    let uploadeResponse = cloudinary.v2.uploader.upload(
        req.body.image,
        function (error, result) {
            Banner.insertMany({
                image:result.url,
                title:req.body.title,
                link:req.body.link
            },
            (err, user) => {
                if (err) {
                  console.log(err);
                  return res.status(500).send({ err: err });
                }
                return res.status(200).send(user);
              })
        })

});
//get address--------------------------------------------------------------------------------------------------------------
router.get("/banner", (req, res) => {
    Banner.find({}, (err, user) => {
        if (err) {
            return res.status(500).send({ err: err });
        }
        return res.status(200).send({ user: user });
    });
});
module.exports = router;
