import React, { useEffect, useState } from "react";
import "./Forhim.css";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, listPrice } from "../../actions/productaction";
import Product from "../../components/product/product";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Translate } from "react-auto-translate";

export const Forhim = () => {
  const { id } = useParams();
  let dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const prices = useSelector((state) => state.priceList);
  const [pricefiter, setpricefilter] = useState(1000000000000);
  const { products, loading } = productList;
  const { price } = prices;
  const [display, setdisplay] = useState("none");
  const [display1, setdisplay1] = useState("none");
  const [index, setindex] = useState(10);
  const [category, setcategory] = useState({});

  let filterProduct = products.filter(
    (item) => item.category == id && item.price[price] < pricefiter
  );

  useEffect(() => {
    dispatch(listProducts());
    dispatch(listPrice());
  }, [dispatch]);
  const changeHandler = (e) => {
    setpricefilter(e.target.value);
  };

  useEffect(async () => {
    const y = await axios.get(`http://localhost:5000/api/procategory/${id}`);
    setcategory(y.data[0]);
  }, [dispatch, id])

  return (
    <div>
      <div style={{background:`url('${category.bannerImg}')`,backgroundRepeat:"no-repeat",width:"100%",backgroundSize:"100% 100%"}} className="forhim-top-section">
        <div className="forhim-inner-section">
          <h1><Translate>{id}</Translate></h1>
          <p>
            {console.log(category.des)}
            {category.des!=undefined&& <Translate>{category.des}</Translate>}
          </p>
        </div>
      </div>
      {/*<div className="lower-menu" style={{ padding: "0px 20px" }}>
        <div
          style={{ display: "inline" }}
          onClick={() => {
            display === "none" ? setdisplay("block") : setdisplay("none");
          }}
        >
          <i className="filters">
          <Translate> FILTER BY</Translate> <i class="fas fa-chevron-down"></i>
          </i>
        </div>
        <div
          style={{ display: "inline", float: "right" }}
          onClick={() => {
            display1 === "none" ? setdisplay1("block") : setdisplay1("none");
          }}
        >
          <i className="filters">
          <Translate>SORT BY</Translate> <i class="fas fa-chevron-up"></i>
          </i>
        </div>
        </div>*/}
      <div className="lower-menu" style={{ display: display }}>
        <ul >
          <li >
            <span class="dropdown">
              <button class="dropbtn">
               <Translate> Price</Translate>

              </button>
              <span class="dropdown-content">
                <a onClick={() => {
                  setpricefilter(1000)
                }}>&lt;1000</a>
                <a onClick={() => {
                  setpricefilter(2000)
                }}>&lt;2000</a>

              </span>
            </span>
          </li>
        </ul>
      </div>
      <div className="lower-menu" id="sort" style={{ display: display1 }}>
        <ul>
          <li>
            <input
              type="radio"
              name="price"
              id="price1"
              onClick={() => {
                setpricefilter(1000);
              }}
              onChange={changeHandler}
              value={1000}
            />
            <label for="price1"><Translate>LESS THAN ₹1000</Translate> </label>{" "}
          </li>
          <li>
            <input
              type="radio"
              name="price"
              id="price2"
              onClick={() => {
                setpricefilter(1500);
              }}
              onChange={changeHandler}
              value={1500}
            />
            <label for="price2"><Translate>LESS THAN ₹1500 </Translate></label>{" "}
          </li>
          <li>
            <input
              type="radio"
              name="price"
              onClick={() => {
                setpricefilter(2000);
              }}
              id="price3"
              onChange={changeHandler}
              value={2000}
            />
            <label for="price3"><Translate>LESS THAN ₹2000</Translate> </label>{" "}
          </li>
        </ul>
      </div>
      <div class="products-category">
        {filterProduct.map((product, indexes) => {
          if (indexes < index) {
            return (
              <Product
                price={price}
                key={product._id}
                product={product}
              ></Product>
            );
          }
        })}
      </div>
      
    </div>
  );
};
