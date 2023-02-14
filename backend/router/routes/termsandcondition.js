var express = require("express");
const router = express.Router();
const Termsandcond = require("../../modal/termandcondition");
const cloudinary = require("cloudinary");

//----------------------------------------------------post makaj cart api------------------------------------------------------------------------
router.post("/termcond", async (req, res) => {
   

    
                            Termsandcond.insertMany(
                                {
                                    html:req.body.html
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
                    );
                
//get address--------------------------------------------------------------------------------------------------------------
router.get("/termcond", (req, res) => {
    Termsandcond.find({}, (err, user) => {
        if (err) {
            return res.status(500).send({ err: err });
        }
        return res.status(200).send({ user: user });
    });
});
module.exports = router;
