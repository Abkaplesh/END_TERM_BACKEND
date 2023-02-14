var express = require("express");
const router = express.Router();
const Home = require("../../modal/homeschema");
const cloudinary = require("cloudinary");

//----------------------------------------------------post makaj cart api------------------------------------------------------------------------
router.post("/home", async (req, res) => {
    Home.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("success");
        }
    });

    cloudinary.v2.config({
    cloud_name: "makkaj",
    api_key: "466677627313198",
    api_secret: "pNKp_Pph0qri0gHHFi9a8xEYvzI"
  });
    let uploadeResponse = cloudinary.v2.uploader.upload(
        req.body.img3,
        function (error, result) {
            cloudinary.v2.uploader.upload(req.body.img2, function (error, result1) {
                Home.insertMany(
                    {
                        title: req.body.title,
                        quote: req.body.quote,
                        quotetext: req.body.quotetext,
                        items1: req.body.items1,
                        items2: req.body.items2,
                        items3: req.body.items3,
                        items4: req.body.items4,
                        items5: req.body.items5,
                        imagehead: req.body.imagehead,
                        cat1: req.body.cat1,
                        cat2: req.body.cat2,
                        cat3: req.body.cat3,
                        cat4: req.body.cat4,
                        imagehead1: req.body.imagehead1,
                        img3:result.url,
                        image3title: req.body.image3title,
                        head4: req.body.head4,
                        testimonialtitle: req.body.testimonialtitle,
                        testimonialhead: req.body.testimonialhead,
                        testimonialname: req.body.testimonialname,
                        testimonialtitle1: req.body.testimonialtitle1,
                        testimonialhead1: req.body.testimonialhead1,
                        testimonialname1: req.body.testimonialname1,
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
router.get("/home", (req, res) => {
    Home.find({}, (err, user) => {
        if (err) {
            return res.status(500).send({ err: err });
        }
        return res.status(200).send({ user: user });
    });
});
module.exports = router;
