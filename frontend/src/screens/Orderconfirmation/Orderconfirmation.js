import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { orderlist } from "../../actions/orderaction";
import { Writereview } from "../writereview/writereview";
import "./Orderconfirmation.css";
import getSymbolFromCurrency from "currency-symbol-map";
import axios from "axios";

export const Orderconfirmation = (props) => {

  const dispatch = useDispatch();
  const orderslist = useSelector((state) => state.orderlist);

  const { orders } = orderslist;
  console.log(orders);
  useEffect(() => {
    dispatch(orderlist(JSON.parse(localStorage.getItem("userInfo")).user));
    axios.post('http://localhost:5000/api/clearcart',{userId:JSON.parse(localStorage.getItem('userInfo')).user}).then((res)=>{
						console.log(res)
					});
  }, [dispatch]);


  return orders != null ? (

    <div
      style={{
        width: "100%",
        height: "auto",
        borderBottom: "2px solid #c69736",
        paddingBottom: "5rem",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "auto",
          borderTop: "2px solid #fff",
          borderBottom: "2px solid #c69736",
        }}
      >
        <h3
          style={{
            fontWeight: "400",
            color: "#c69736",
            margin: "0.4rem",
            paddingLeft: "1rem",
          }}
        >
          ORDER CONFIRMATION
        </h3>
      </div>
      <div className="order-top-section1">
        <div className="order-top-logo">
          <img src="./images/logo.png" alt="logo" />
        </div>
        <h1>YOUR ORDER IS ON THE WAY</h1>
        <a href="/myorders" className="orderbtn">MY ORDER</a>
      </div>

      <div className="order-middle-section">
        <div>
          <h1>SUMMARY</h1>
          <section className="order-id">
            <p>ORDER ID : </p>
            <p style={{ color: "#fff" }}>{orders._id}</p>
          </section>
          <section className="order-date">
            <p>ORDER DATE : </p>
            <p style={{ color: "#fff" }}>{orders.createdAt}</p>
          </section>
          <section className="order-total">
            <p>ORDER TOTAL : </p>
            <p style={{ color: "#fff" }}>{getSymbolFromCurrency(orders.orderItems[0].pricecon)}{orders.totalPrice}</p>
          </section>
        </div>
        <div>
          <h1>SHIPPING ADDRESS</h1>
          <p style={{ paddingLeft: "2rem", color: "#fff" }}>
            {orders.shippingAddress.address} {orders.shippingAddress.appartment} {orders.shippingAddress.city}
            {orders.shippingAddress.state} {orders.shippingAddress.country}{" "}
          </p>
        </div>
      </div>
      <table className="order-table">
        <tr className="order-table-th">
          <th>ITEM</th>
          <th>PRICE</th>
          <th>QTY</th>
          <th>STATUS</th>
        </tr>

        {orders.orderItems.map((item) => {
          return (<tr className="order-table-tr">
            <td className="order-table-img">
              <Link to={`/details/${item._id}`}>
                <img src={item.image} alt="perfume" />
              </Link>
              <h2 style={{ color: "#fff" }}>{item.title}</h2>
            </td>
            <td className="order-table-price">
              <p>{getSymbolFromCurrency(item.pricecon)}{item.discountprice[0] * item.count}</p>
            </td>
            <td className="order-table-qty">
              <p>{item.count}</p>
            </td>
            <td>
              <p>Processing</p>
            </td>
          </tr>)
        })}

        <tr className="below-row">
          <td className="text-right" colSpan="3">
            <span className="row-heading">SUBTOTAL : </span>

          </td>
          <td className="text-right" colSpan="4">
            <span>{getSymbolFromCurrency(orders.orderItems[0].pricecon)}{orders.totalPrice - orders.taxPrice}</span>

          </td>
        </tr>
        <tr className="below-row">
          <td className="text-right" colSpan="3">
            <span className="row-heading">SHIPPING CHARGES :  </span>

          </td>
          <td className="text-right" colSpan="4">
            <span>FREE</span>

          </td>
        </tr>
        <tr className="below-row">
          <td className="text-right" colSpan="3">
            <span className="row-heading">ESTIMATED TAX :</span>

          </td>
          <td className="text-right" colSpan="4">
            <span>{getSymbolFromCurrency(orders.orderItems[0].pricecon)}{orders.taxPrice}</span>

          </td>
        </tr>
        <tr className="below-row">
          <td className="text-right" colSpan="3">
            <span className="row-heading">TOTAL AMOUNT :</span>

          </td>
          <td className="text-right" colSpan="4">
            <span>{getSymbolFromCurrency(orders.orderItems[0].pricecon)}{orders.totalPrice}</span>

          </td>
        </tr>

      </table>

      {/* <Writereview/> */}
    </div>
  ) : <div></div>

};
