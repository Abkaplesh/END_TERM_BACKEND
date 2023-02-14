import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import "./wishlistcard.css";
import { removeproductwishlist } from "../../actions/wishlistaction";
import { useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { addproductcart } from "../../actions/cartactions";

const Wishlistcard = (props) => {
  const { img, description, size, productid, title, price, id, item } = props;

  const dispatch = useDispatch();

  return (
    <div key={id} className="card">
      <RiDeleteBin5Line
        style={{
          position: "absolute",
          margin: "1rem",
          color: "gold",
          Zindex: "99999",
        }}
        onClick={() => {
          dispatch(removeproductwishlist(id));
        }}
      />

      <Link to={`/details/${productid}`}>
        <img
          style={{ marginTop: "3rem" }}
          className="medium"
          src={img}
          alt={title}
        />
      </Link>
      <div className="card-body">
        <a>
          <h2>{title}</h2>
        </a>

        <div className="short">
          <i>{item.short}</i>
        </div>
        <div
          style={{ marginTop: "3rem" }}
          className="add-to-cart-button"
          onClick={() => {
            dispatch(
              addproductcart(
                item.title,
                item.img,
                item.description,
                item.price,
                item.weight,
                item.dimensions,
                1,
                item.productid,
                JSON.parse(localStorage.getItem("userInfo")).user
              )
            );
          }}
        >
          <button>ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};
export default Wishlistcard;
