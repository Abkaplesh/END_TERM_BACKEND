var express = require("express");
const router = express.Router();
const Privacy = require("../../modal/privacypolicy");

//----------------------------------------------------post makaj cart api------------------------------------------------------------------------
router.post("/privacy", async (req, res) => {

    Privacy.deleteMany({},function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log("success")
        }
    });

    

    

                            Privacy.insertMany(
                                {
                                    head: req.body.head,
                                    title: req.body.title,
                                    info1:req.body.info1,
                                    head1: req.body.head1,
                                    head2: req.body.head2,
                                    title2: req.body.title2,
                                    head3: req.body.head3,
                                    title3: req.body.title3,
                                    head4: req.body.head4,
                                    title4: req.body.title4,
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
router.get("/privacy", (req, res) => {
    Privacy.find({}, (err, user) => {
        if (err) {
            return res.status(500).send({ err: err });
        }
        return res.status(200).send({ user: user });
    });
});
module.exports = router;
