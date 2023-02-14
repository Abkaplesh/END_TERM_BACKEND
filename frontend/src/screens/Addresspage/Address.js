import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shippingaddressget } from "../../actions/orderaction";
import { Sidebar } from "../../components/sidebar/sidebar";
import "./Address.css";

export const Address = () => {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.shipping);
  const { address } = addresses;

  useEffect(() => {
    dispatch(
      shippingaddressget(JSON.parse(localStorage.getItem("userInfo")).user)
    );
  }, [dispatch]);

  return (
    <div>
      <h1 className="breadcrumb-css">
        MY ADDRESS
      </h1>
      <div className="my-account">
        <div className="sidebar-left">
          {" "}
          <Sidebar />
        </div>
<div className="address-right">
        <div className="two-buttons">
          <a
            href="/add-shipping"
            style={{
              background: "transparent",
              border: "1px solid #c69736",
              color: "#fff",
              padding: "1rem",
            }}
          >
            Add new shipping address
          </a>
        </div>
        <h1 className="heading-address">
          Saved Addresses
        </h1>
        {address?.address?.map((item) => {
          return (
            <section className="saved-address-div">
              {item.address} {item.apartment} {item.city} {item.state}{" "}
              {item.country}{" "}
            </section>
          );
        })}
      </div>
    </div>
    </div>
  );
};
