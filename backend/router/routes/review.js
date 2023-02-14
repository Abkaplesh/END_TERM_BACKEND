const express = require("express");
const router = express.Router();
const Review = require("../../modal/review");

router.post("/review", (req, res) => {
  Review.insertMany(
    {
      review: req.body.review,
      rating: req.body.rate,
      productid: req.body.productid,
      name: req.body.name,
    },
    (err, user) => {
      if (err) {
        return res.status(500).send({ err: err });
      }
      return res.status(200).send(user);
    }
  );
});
router.get("/review/:id", (req, res) => {
  Review.find({productid:req.params.id}, (err, user) => {
      console.log(req.params.id)
    if (err) {
      return res.status(500).send({ err: err });
    }
    return res.status(200).send(user);
  });
});

module.exports = router;
