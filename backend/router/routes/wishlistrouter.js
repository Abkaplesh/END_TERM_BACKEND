var express = require("express");
const router = express.Router();
const Wishlist = require("../../modal/wishlistschema");

//----------------------------------------------------post makaj cart api------------------------------------------------------------------------
router.post("/wishlist", async (req, res) => {
  const title = req.body.title;
  const image = req.body.image;
  const description = req.body.description;
  const price = req.body.price;
  const weight = req.body.weight;
  const dimensions = req.body.dimensions;
  const productId = req.body.productId;

  const userId = req.body.userId;
  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (wishlist) {
      //cart exists for user
      let itemIndex = wishlist.products.findIndex(
        (p) => p.productId == productId
      );

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = wishlist.products[itemIndex];
        wishlist.products[itemIndex] = productItem;
      } else {
        //product does not exists in cart, add new item
        wishlist.products.push({
          productId,

          title,
          price,
          image,
          description,
          weight,
          dimensions,
        });
      }
      wishlist = await wishlist.save();
      return res.status(201).send(wishlist);
    } else {
      //no cart for user, create new cart
      const newwishlist = await Wishlist.insertMany({
        userId,
        products: [
          {
            productId,

            title,
            price,
            image,
            description,
            weight,
            dimensions,
          },
        ],
      });

      return res.status(201).send(newwishlist);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});
//----------------------------------------------------get cart api-------------------------------------------------------------------------

router.get("/wishlist/:userId", (req, res) => {
  Wishlist.find({ userId: req.params.userId }, (err, user) => {
    if (err) {
      return res.status(500).send({ err: err });
    }
    return res.status(200).send({ user: user });
  });
});

router.post("/wishlistdelete", (req, res) => {
  Wishlist.updateOne(
    { userId: req.body.userId },
    { $pull: { products: { _id: req.body.id } } },
    (err, user) => {
      if (err) {
        return res.status(500).send({ err: err });
      }
      return res.status(200).send({ user: user });
    }
  );
});

module.exports = router;
