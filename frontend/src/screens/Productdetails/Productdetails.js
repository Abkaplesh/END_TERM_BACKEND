import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { details, listProducts } from "../../actions/productaction";
import "./Productdetails.css";
import { listPrice } from "../../actions/productaction";
import getSymbolFromCurrency from "currency-symbol-map";
import { addproductcart } from "../../actions/cartactions";
import Product from "../../components/product/product";
import { Relatedproducts } from "../../components/Relatedproducts/Relatedproducts";
import $, { map } from "jquery";
import Review from "../../components/review/review";
import { LOGIN_DISPLAY_FLEX } from "../../constant/user";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Translate } from "react-auto-translate";


export const Productdetails = () => {
  const { productid } = useParams();
  const dispatch = useDispatch();
  const prices = useSelector((state) => state.priceList);
  const { price } = prices;
  const detailes = useSelector((state) => state.detail);
  const [innerhtml, setinnerhtml] = useState("");
  const productList = useSelector((state) => state.productList);
  const { products, loading } = productList;
  const [method, setmethod] = useState("");
  const [active, setactive] = useState(1);
  const [size, setsize] = useState("");
  const [quant, setquant] = useState("1");
  console.log(size);
  const y = {
    background: "#c69736",
    color: "#fff",
    margin: "0",
    fontWeight: "500",
  };
  const { detail } = detailes;
  console.log(detail);
  useEffect(() => {
    dispatch(listPrice());
    dispatch(details(productid));
    dispatch(listProducts());
  }, []);

  const changSelect = (e) => {
    setsize(e.target.value);
  };
  const changSelect2 = (e) => {
    setquant(e.target.value);
  };
  // get the value of checked input radio and display as dropp title

  return detail != null ? (
    <div>
      <div className="breadcrumbs"></div>
      <div className="detail-section">
        <div className="detail-section-image detail-img1">
          {detail.image.map((item) => {
            return <img src={item} alt="perfume"></img>;
          })}
        </div>
        <div className="detail-section-image detail-img2">
          <OwlCarousel
            style={{ width: "100%", zIndex: "auto" }}
            className="owl-theme"
            dots={true}
            navText={[
              "<div style='font-size:4em; display:none;' className='nav-btn prev-slides'><</div>",
              "<div style='font-size:4em; display:none;' className='nav-btn next-slides'>></div>",
            ]}
            lazyLoad={true}
            autoplay={true}
            items={1}
            loop
            margin={0}
            nav
          >
            {detail.image.map((item) => {
              return <img src={item} alt="perfume"></img>;
            })}
          </OwlCarousel>
        </div>
        <div className="detail-section-text">
          <div className="detail-section-inner">
            <h3 style={{ margin: "0" }}> {price=="INR"?detail.title:detail.arabictitle}</h3>
            <h4 style={{ color: "#c69736" }}>{price=="INR"?detail.short:detail.shortaed}</h4>
            <p>{price=="INR"?detail.description:detail.arabicdescription}</p>
            <p className="main-price">
                
              
                {detail.discountprice != undefined ||
                detail.discountprice != null ? (
                  <><span className="mrp-text"><Translate>Price: </Translate> </span><span
                    className="mrp"
                    style={{
                      textDecoration: "line-through",
                      padding: "0.5rem",
                      paddingLeft: "0",
                      display: detail.discountprice[price] == detail.price[price]
                        ? "none"
                        : "inline",
                    }}
                  >
                    {getSymbolFromCurrency(price)}{" "}
                    {detail.price[price]}{" "}
                  </span></>
                ) : (
                  <span></span>
                )}
                <span className="offer-price-text"><Translate>PRICE: </Translate> </span>
                <span className="offer-price">
                {getSymbolFromCurrency(price)}{" "}
                {detail.discountprice != undefined ||
                detail.discountprice != null
                  ? detail.discountprice[price]
                  : ""}
                  </span>
                  <span className="tax-text"><Translate>(Incl. of all taxes)</Translate></span>
              </p>
            <div class="detail-page-customize">
              <div className="qty-div">
                <p className="qty-text"><Translate> QTY :</Translate></p>
                <select
                  className="select-qty"
                  name="size"
                  onChange={changSelect2}
                  value={quant}
                >
                  <option name="size" value="1">
                    1
                  </option>
                  <option name="size" value="2">
                    2
                  </option>
                  <option name="size" value="3">
                    3
                  </option>
                </select>
              </div>
              <div className="size-div">
              <p style={{ color: "#c69736", fontSize: "1.4em" }}>
              <Translate> SIZE : {detail.size[0].value} ML</Translate>
              </p>
            </div>
            </div>
            <div className="detail-page-button">
              
              {detail.stock[price] > 0 &&
              JSON.parse(localStorage.getItem("login")) == true ? (
                <button
                  type="submit"
                  onClick={() => {
                    if (quant != "") {
                      dispatch(
                        addproductcart(
                          detail.title,
                          detail.image[0],
                          detail.description,
                          detail.price[price],
                          detail.size[0].value,
                          detail.dimensions,
                          quant,
                          detail._id,
                          JSON.parse(localStorage.getItem("userInfo")).user,
                          detail.discountprice[price],
                          price
                        )
                      );
                      window.alert("added to cart");
                      window.location.href = "/cart";
                    } else {
                      window.alert("please add quantity");
                    }
                  }}
                >
                  <Translate>ADD TO CART</Translate>
                </button>
              ) : JSON.parse(localStorage.getItem("login")) != true ? (
                <button
                  type="submit"
                  onClick={() => {
                    dispatch({
                      type: LOGIN_DISPLAY_FLEX,
                    });
                    window.alert("Login please");
                  }}
                >
                 <Translate> ADD TO CART</Translate>
                </button>
              ) : (
                <div><Translate>Out of stock</Translate></div>
              )}
            </div>
            <Review id={productid} />
          </div>
        </div>
      </div>

      <div className="detail-info">
        <h2
          style={active == 1 ? y : {}}
          onClick={() => {
            setactive(1);
          }}
        >
          <Translate>DESCRIPTION</Translate>
        </h2>
        <h2
          style={active == 2 ? y : {}}
          onClick={() => {
            setactive(2);
          }}
        >
<Translate>SHIPPING POLICY</Translate>
        </h2>
        <h2
          style={active == 3 ? y : {}}
          onClick={() => {
            setactive(3);
          }}
        >
          <Translate>CUSTOMER REVIEWS</Translate>
        </h2>
        <h2
          style={active == 4 ? y : {}}
          onClick={() => {
            setactive(4);
          }}
        >
          <Translate>FAQ's</Translate>
        </h2>
      </div>
      <div className="details-desc" id="details">
        {active == 1 ? (
          detail.description
        ) : active == 2 ? (
          <span>To know more about our shipping policy <a href="./delivery-and-return" className="highlight-text">click here </a></span>
        ) : active == 3 ? (
          <Review id={detail._id} />
        ) : (
          ""
        )}
      </div>
      <div className="related-products">
        <div className="just-border-2"></div>
        <div>
          <h1><Translate>RELATED PRODUCTS</Translate></h1>
        </div>
        <div className="just-border-3"></div>
      </div>
      <div
        style={{ height: "auto", justifyContent: "center", paddingTop: "1rem" }}
      >
        <Relatedproducts />
      </div>
    </div>
  ) : (
    <div></div>
  );
};
