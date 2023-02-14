import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getwishlist } from "../../actions/wishlistaction";
import { listPrice } from "../../actions/productaction";
import Checkoutbox from "../../components/checkout/checkoutsummary";
import { Coupon } from "../../components/coupons/coupon";
import "./wishlist.css";
import Wishlistcard from "../../components/wishlistcard/wishlistcard";

export const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlists = useSelector((state) => state.wishlist);
  const prices = useSelector((state) => state.priceList);
  const { price } = prices;

  const { wishlist } = wishlists;

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("login")) == true) {
      dispatch(getwishlist(JSON.parse(localStorage.getItem("userInfo")).user));
    }
    dispatch(listPrice());
  }, [dispatch]);
  return (
    <div
      className="wishlist-screen"
    >
      <div
        style={{
          width: "auto",
          borderTop: "2px solid #fff",
          borderBottom: "2px solid #c69736",
          color: "#c69736",
          paddingLeft: "2rem",
        }}
      >
        <h3 style={{ fontWeight: "400", margin: "0.4rem" }}>WISHLIST</h3>
      </div>
      <div className="wishlist-cardd">
        {JSON.parse(localStorage.getItem("login")) == true &&
        wishlist.length > 0
          ? wishlist.map((items) => {
              return (
                <Wishlistcard
                  id={items._id}
                  productid={items.productId}
                  img={items.image}
                  description={items.description}
                  title={items.title}
                  price={price}
                  item={items}
                />
              );
            })
          : wishlist.length == 0 &&
            JSON.parse(localStorage.getItem("login")) == true
          ? `wishlist is Empty`
          : `Please Login`}
      </div>
    </div>
  );
};
