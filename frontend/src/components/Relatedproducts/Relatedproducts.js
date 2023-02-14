import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Product from "../../components/product/product";

export const Relatedproducts = () => {
  const prices = useSelector((state) => state.priceList);
  const { price } = prices;
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {products.map((product, index) => {
        if (index <= 3) {
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
  );
};
