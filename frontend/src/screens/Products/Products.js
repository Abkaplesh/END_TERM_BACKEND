import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/product/product";
import { listProducts, listPrice } from "../../actions/productaction";
import { useEffect } from "react";
import Loader from "../../components/loader/loader";
import "./Products.css";
import { Link } from "react-router-dom";

export default function Products() {
  let dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const prices = useSelector((state) => state.priceList);

  const { products, loading } = productList;
  const { price } = prices;

  useEffect(() => {
    dispatch(listProducts());
    dispatch(listPrice());
  }, [dispatch]);

  return (
    <div className="row-center">
      {loading ? (
        <Loader />
      ) : (
        <>
          {products.map((product) => {
            return (
              
                <Product
                  price={price}
                  key={product._id}
                  product={product}
                ></Product>
              
            );
          })}
        </>
      )}
    </div>
  );
}
