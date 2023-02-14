import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addproductcart } from "../../actions/cartactions";
import "./product.css";
import getSymbolFromCurrency from "currency-symbol-map";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { addproductwishlist } from "../../actions/wishlistaction";
import { useState } from "react";
import { Translate } from "react-auto-translate";
export default function Product(props) {
  const { price, product } = props;
  const dispatch = useDispatch();
const [color,setcolor]=useState("");
  const [text, settext] = useState("");

  const addval = () => {};

  return (
    <div key={product._id} className="card">

      <p style={{ display: "none" }}>{text}</p>
      <AiOutlineHeart
        style={{
          position: "absolute",
          margin: "1rem",
          color: "gold",
          zIndex: "99999",
        }}
        onClick={() => {
          JSON.parse(localStorage.getItem("login")) != true?window.alert("Please login to add product to wishlist"):
          dispatch(
            addproductwishlist(
              product.title,
              product.image[0],
              product.description,
              product.price[price],
              product.weight,
              product.dimensions,

              product._id,
              JSON.parse(localStorage.getItem("userInfo")).user
            )
          );
          JSON.parse(localStorage.getItem("login")) != true?window.alert("Please login to add product to wishlist"):window.alert("product added to wishlist")
        }}
      />
    <a href={`/details/${product._id}`}>

        <img
          style={{ }}
          className="medium"
          src={product.image[0]}
          alt={product.title}
        />
    </a>

      <div className="card-body">
      <a href={`/details/${product._id}`}>


          <h2>{price=="INR"?product.title:product.arabictitle}</h2>
          </a>

        <div className="price">
          <span className="strike-sign">{getSymbolFromCurrency(price)}{" "}</span>
          {product.discountprice != undefined ||
          product.discountprice != null ? (
            <span className="strike"
              style={{
                textDecoration: "line-through",
                padding: "0.5rem",
                paddingLeft: "0",
                display:
                  product.discountprice[price] == product.price[price]
                    ? "none"
                    : "inline",
              }}
            >
              {product.price[price]}{" "}
            </span>
          ) : (
            <span></span>
          )}
          {getSymbolFromCurrency(price)}{" "}
          {product.discountprice != undefined || product.discountprice != null
            ? product.discountprice[price]
            : ""}
        </div>
        {/* <div className="short">
          <i>{product.short}</i>
        </div> */}
        {product.stock[price]>0&&JSON.parse(localStorage.getItem("login")) == true?<div
          className="add-to-cart-button"
          onClick={() => {
            dispatch(
              addproductcart(
                product.title,
                product.image[0],
                product.description,
                product.price[price],
                product.size[0].value,
                product.dimensions,
                1,
                product._id,
                JSON.parse(localStorage.getItem("userInfo")).user,
                product.discountprice[price],
                price
              )
            );

            window.alert("Product is added to cart")
            window.location.href='/cart';

          }}
        >
          <button><Translate>ADD TO CART</Translate></button>
        </div>:JSON.parse(localStorage.getItem("login")) != true?<div style={{color:"white",textAlign:"center"}}></div>:<div style={{color:"red"}}>Out of stock</div>}
        
      </div>

    </div>

  );
}
