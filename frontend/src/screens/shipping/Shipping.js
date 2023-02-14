import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shippingaddressget, shippingmethod } from "../../actions/orderaction";
import { Rightinfo } from "../../components/rightinfo/rightinfo";
import "./Shipping.css";
import { Link } from "react-router-dom";
import { Translate } from "react-auto-translate";
import $ from "jquery";
import { set } from "lodash";
export const Shipping = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.postaddress);
  const { post } = posts;

  const addresses = useSelector((state) => state.shipping);
  const { address } = addresses;
  const [method, setmethod] = useState("");

  useEffect(() => {
    dispatch(
      shippingaddressget(JSON.parse(localStorage.getItem("userInfo")).user)
    );
    if (post == true) {
      dispatch(
        shippingaddressget(JSON.parse(localStorage.getItem("userInfo")).user)
      );
    }
  }, [dispatch]);

  useEffect(() => {
    // Default dropdown action to show/hide dropdown content
    $(".js-dropp-action").on("click", function (e) {
      e.preventDefault();
      $(this).toggleClass("js-open");
      $(this).parent().next(".dropp-body").toggleClass("js-open");
    });

    // Using as fake input select dropdown
    $("label").on("click", function () {
      $(this).addClass("js-open").siblings().removeClass("js-open");
      $(".dropp-body,.js-dropp-action").removeClass("js-open");
    });
    // get the value of checked input radio and display as dropp title
    $('input[name="dropp"]').on("change", function () {
      var value = $("input[name='dropp']:checked").val();
      $(".js-value").text(value);
      setmethod(value);
    });
  }, []);

  if (post == true) {
    window.location.reload();
  }

  return (
    <div className="shipping-page">
      <div className="shipping-top-info">
        <h3><Translate>SHIPPING</Translate></h3>
      </div>
      <div className="shipping-left-info">
        <div className="top-logo">
          <img src="/images/logo.png" alt="logo" />
        </div>
        {<div className="bottom-section">
         <section className="inner-section">
            <p className="shipping-heading"><Translate>Contact</Translate></p>
           <p style={{ fontWeight: "500" }}>
           {post != false
                ? address.shippingAddress.email
                : address.shippingAddress.email}
            </p>
          </section>
          <section className="inner-section">
            <p className="shipping-heading"><Translate>Ship To</Translate></p>
            <p style={{ fontWeight: "500" }}>
              {address.shippingAddress != undefined && post != false
                ? address.shippingAddress.firstname
                : address.shippingAddress.firstname}{" "}
              {post != false
                ? address.shippingAddress.lastname
                : address.shippingAddress.lastname}{", "}
              {post != false
                ? address.shippingAddress.address
                : address.shippingAddress.address}{" "}
              {post != false
                ? address.shippingAddress.apartment
                : address.shippingAddress.apartment}{","}
              {post != false
                ? address.shippingAddress.city
                : address.shippingAddress.city}{","}
              {post != false
                ? address.shippingAddress.state
                : address.shippingAddress.state}{","}
              {post != false
                ? address.shippingAddress.country
                : address.shippingAddress.country}{" "}

            </p>
            
          </section>
        </div>}
        <div className="last-section">
            
          <Link to={"/payment"}>
            <button
              onClick={() => {
                dispatch(
                  shippingmethod(
                    JSON.parse(localStorage.getItem("userInfo")).user,
                    method
                  )
                );
              }}
              className="continue-btn"
              type="submit"
            >
              <Translate>Continue To Payment</Translate>
            </button>
          </Link>
          <a href="/checkout"><Translate>Return to checkout</Translate></a>
        </div>
      </div>
      <Rightinfo />
    </div>
  );
};