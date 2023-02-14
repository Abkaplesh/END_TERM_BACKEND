import React, { useEffect, useState } from "react";
import "./Forher.css";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, listPrice } from "../../actions/productaction";
import Product from "../../components/product/product";

export const Forher = () => {
  let dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const prices = useSelector((state) => state.priceList);
  const [pricefiter, setpricefilter] = useState(1000000000000);
  const { products, loading } = productList;
  const { price } = prices;
  const [display, setdisplay] = useState("none");
  const [display1, setdisplay1] = useState("none");
  const [index, setindex] = useState(10);
  let filterProduct = products.filter(
    (item) => item.category == "for-her" && item.price[price] < pricefiter
  );
  console.log(filterProduct);

  useEffect(() => {
    dispatch(listProducts());
    dispatch(listPrice());
  }, [dispatch]);
  const changeHandler = (e) => {
    setpricefilter(e.target.value);
  };
  return (
    <div>
      <div className="forhim-top-section">
        <div className="forhim-inner-section">
          <h1>FOR HER</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
      </div>
      <div className="lower-menu" style={{ padding: "0px 20px" }}>
        <div
          style={{ display: "inline" }}
          onClick={() => {
            display === "none" ? setdisplay("block") : setdisplay("none");
          }}
        >
          <i className="filters">
            FILTER BY <i class="fas fa-chevron-down"></i>
          </i>
        </div>
        <div
          style={{ display: "inline", float: "right" }}
          onClick={() => {
            display1 === "none" ? setdisplay1("block") : setdisplay1("none");
          }}
        >
          <i className="filters">
            SORT BY <i class="fas fa-chevron-up"></i>
          </i>
        </div>
      </div>
      <div className="lower-menu" style={{ display: display }}>
        <ul>
          <li>PRICE</li>
          <li>AVAILABILITY</li>
          <li>GENDER</li>
          <li>BRAND</li>
          <li>COLLECTION</li>
          <li>PRODUCT CATEGORY</li>
          <li>FAMILY</li>
          <li>FRANGRANCE TYPE</li>
          <li>QUANITITY</li>
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
            <label for="price1">LESS THAN ₹1000 </label>{" "}
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
            <label for="price2">LESS THAN ₹1500 </label>{" "}
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
            <label for="price3">LESS THAN ₹2000 </label>{" "}
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
      <div className="load-more">
        <button
          onClick={() => {
            setindex(index + 10);
          }}
        >
          LOAD MORE
        </button>
      </div>
    </div>
  );
};
