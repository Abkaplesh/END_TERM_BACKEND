import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./writereview.css";
import { allorderlist, orderlist } from "../../actions/orderaction";
import { Addreview } from "../../components/addreview/addreview";

export const Writereview = () => {
  const dispatch = useDispatch();
  const orderslist = useSelector((state) => state.allorders);
  const [filter, setfilter] = useState([]);
  const { orders } = orderslist;

  useEffect(() => {
    dispatch(allorderlist(JSON.parse(localStorage.getItem("userInfo")).user));
  }, [dispatch]);

  useEffect(() => {
    if (orders != null) {
      setfilter(orders.filter((items) => items.isDelivered != false));
    }
  }, [orders]);
  console.log(filter);
  return orders != null ? (
    <div className="reviewdiv">
      <div
        style={{
          width: "100%",
          borderTop: "2px solid #fff",
          borderBottom: "2px solid #c69736",
        }}
      >
        <h3 className="breadcrumb-css">YOUR REVIEWS</h3>
      </div>
      <div className="reviewcard">
        <div className="cardd">
          {filter.map((product) => {
            return product.orderItems.map((item, index) => {
              return (
                <Addreview
                  item={item}
                  index={index}
                  name={product.shippingAddress}
                />
              );
            });
          })}
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};
