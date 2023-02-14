const express = require("express");
const router = express.Router();
const Tax = require("../../modal/taxschema");

router.post("/tax", (req, res) => {
    Tax.deleteMany({},function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log("success")
        }
    });

    Tax.insertMany(
        {
            INR: req.body.INR,
            AED: req.body.AED,
            SAR: req.body.SAR,
        },
        (err, user) => {
            if (err) {
                return res.status(500).send({ err: err });
            }
            return res.status(200).send(user);
        }
    );
});
router.get("/tax", (req, res) => {
    Tax.find({}, (err, user) => {
        if (err) {
            return res.status(500).send({ err: err });
        }
        return res.status(200).send(user);
    });
});

router.get("/tax/:id", (req, res) => {
    Tax.find({_id:req.params.id}, (err, user) => {
        if (err) {
            return res.status(500).send({ err: err });
        }
        return res.status(200).send(user);
    });
});

module.exports = router;
