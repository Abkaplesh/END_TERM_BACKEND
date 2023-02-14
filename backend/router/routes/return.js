var express = require("express");
const router = express.Router();
const Return = require("../../modal/return");

//----------------------------------------------------post makaj cart api------------------------------------------------------------------------
router.post("/return", async (req, res) => {

    Return.deleteMany({},function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log("success")
        }
    });

    

    

                            Return.insertMany(
                                {
                                    head: req.body.head,
                                    title: req.body.title,
                                    
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
router.get("/return", (req, res) => {
    Return.find({}, (err, user) => {
        if (err) {
            return res.status(500).send({ err: err });
        }
        return res.status(200).send({ user: user });
    });
});
module.exports = router;
