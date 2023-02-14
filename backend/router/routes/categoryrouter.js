const express = require("express");
const router = express.Router();
const Med_category = require("../../modal/categoryschema");
const cloudinary = require("cloudinary");

router.post("/procategory", (req, res) => {
  cloudinary.v2.config({
    cloud_name: "student12345",
    api_key: "936717671138891",
    api_secret: "aDh235AJlOVY1_2n8b4KVtNlryE",
  });
  let uploadeResponse = cloudinary.v2.uploader.upload(
    req.body.image,
    function (error, result) {
      cloudinary.v2.uploader.upload(req.body.bannerImg, function (error, result2) {
  console.log(result2.url);

        if (error) {
          console.log(error);
        }
        Med_category.insertMany(
          {
            title: req.body.title,
            image: result.url,
            home_include: req.body.home_include,
            nav_include: req.body.nav_include,
            des: req.body.des,
			bannerImg:result2.url,
            active: req.body.active,
          },
          (err, user) => {
            if (err) {
              return res.status(500).send({ err: err });
            }
            return res.status(200).send(user);
          }
        );
      });
    }
  );
});
router.get("/procategory", (req, res) => {
  Med_category.find({}, (err, user) => {
    if (err) {
      return res.status(500).send({ err: err });
    }
    return res.status(200).send(user);
  });
});
router.get("/procategory/:category", (req, res) => {
  Med_category.find({ title: req.params["category"] }, (err, user) => {
    if (err) {
      return res.status(500).send({ err: err });
    }
    return res.status(200).send(user);
  });
});
router.post("/procategory/:id", (req, res) => {
  Med_category.deleteOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(500).send({ err: err });
    }
    return res.status(200).send(user);
  });
});

router.get("/category/:id", (req, res) => {
  Med_category.find({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(500).send({ err: err });
    }
    return res.status(200).send(user);
  });
});

router.put("/procategory/:id", (req, res) => {
  Med_category.updateOne(
    { _id: req.params.id },
    { $set: { category: req.body.category } },
    (err, user) => {
      if (err) {
        return res.status(500).send({ err: err });
      }
      return res.status(200).send(user);
    }
  );
});

router.get("/items/:category", (req, res) => {
  Med_category.aggregate(
    [
      {
        $lookup: {
          from: "med_datas",
          localField: "category",
          foreignField: "category",
          as: "items",
        },
      },
      { $match: { category: req.params.category } },
    ],
    function (err, result) {
      if (err) {
        return res.status(404).send(err);
      }
      return res.status(200).send(result);
    }
  );
});
module.exports = router;
