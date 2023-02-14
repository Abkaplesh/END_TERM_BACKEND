import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import "./sidebar.css";

export const Sidebar = () => {

  const location = useLocation();


  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-8 py-4">
            <h4 className="welcome-user-name track-order-heading">
              Welcome
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="row pb-5">
              <div className="col-md-4 col-lg-3 address-book pb-5 pb-md-0">
                <div className="change-password-wishlist" style={{backgroundColor:location.pathname == "/add-address"?"#c69736":"transparent"}}>
                  <a href="/add-address">My Address</a>
                </div>
                <div className="change-password-wishlist" style={{backgroundColor:location.pathname == "/myorders"?"#c69736":"transparent"}}>
                  <a href="/MyOrders">My Orders</a>
                </div>
                <div className="active change-password-wishlist" style={{backgroundColor:location.pathname == "/wishlist"?"#c69736":"transparent"}}>
                  <a href="/wishlist">My Wishlist</a>
                </div>
                {/* <div className="change-password-wishlist">
              <a href="/addpayment">Payment Options</a>
              <hr />
            </div> */}
                {/* <div className="change-password-wishlist">
                  <a href="/writereview">My Product Reviews</a>
                </div> */}

                <div className="change-password-wishlist" style={{backgroundColor:location.pathname == "/ChangePassword"?"#c69736":"transparent"}}>
                  <a href="/ChangePassword">Change password</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
