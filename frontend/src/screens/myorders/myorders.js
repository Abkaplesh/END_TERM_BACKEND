import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allorderlist, orderlist } from "../../actions/orderaction";
import { Sidebar } from "../../components/sidebar/sidebar";
import "./myorders.css";
import getSymbolFromCurrency from "currency-symbol-map";

export const MyOrders = (props) => {
  const dispatch = useDispatch();
  const orderslist = useSelector((state) => state.allorders);

  const { orders } = orderslist;
  const [filterorders, setfilterorders] = useState(orders);
  const [isActive, setActive] = useState(false);
const [activeone,setactiveone]=useState(1);
  useEffect(() => {
    dispatch(allorderlist(JSON.parse(localStorage.getItem("userInfo")).user));
  }, [dispatch]);
  

  useEffect(() => {
    setfilterorders(orders);
  }, [orders]);
  

  return orders != null && filterorders != null ? (
    <div>
      <h1 className="breadcrumb-css">
        MY ORDERS
      </h1>
      <div className="my-account">
        <div  className="sidebar-left">
          {" "}
          <Sidebar />
        </div>

        <div className="myorder-right">
       
          <div>
            <ul className="myorder-ulbar">
              <li className="active1"
              style={{
                background:activeone==1?"#c69736": "transparent"}}
                onClick={() => {
                  setfilterorders(orders.filter((item) => item));
                }}
              >
                <button
                  style={{
                    background:activeone==1?"#c69736": "transparent",
                    border: "none",
                    padding: "0",
                    color: "#fff",
                  }}
                  onClick={()=>{
                    setactiveone(1);

                  }}
                >
                  All Orders
                </button>
              </li>
              <li className="active1"
               style={{
                background:activeone==2?"#c69736": "transparent",}}
                onClick={() => {
                  setfilterorders(
                    orders.filter((items) => items.isDelivered == false)
                  );
                }}
              >
                <button
                  style={{
                    background:activeone==2?"#c69736": "transparent",
                    border: "none",
                    padding: "0",
                    color: "#fff",
                  }}
                  onClick={()=>{
                    setactiveone(2);

                  }}
                >
                  Open Orders
                </button>
              </li>
              <li
              style={{
                background: activeone==3?"#c69736": "transparent"}}
                onClick={() => {

                  setfilterorders(
                    orders.filter((items) => items.isDelivered != false)
                  );
                }}
              >
                <button
                  style={{
                    background: activeone==3?"#c69736": "transparent",
                    border: "none",
                    padding: "0",
                    color: "#fff",
                  }}
                  onClick={()=>{
                    setactiveone(3);

                  }}
                >
                  Completed Orders
                </button>
              </li>
              <li
              style={{
                background:activeone==4?"#c69736": "transparent"}}
                onClick={() => {
                  setfilterorders(
                    orders.filter((items) => items.isCancelled != false)
                  );
                }}
              >
                <button
                  style={{
                    background:activeone==4?"#c69736": "transparent",
                    border: "none",
                    padding: "0",
                    color: "#fff",
                  }}
                  onClick={()=>{
                    setactiveone(4);

                  }}
                >
                  Cancel Orders
                </button>
              </li>
            </ul>

            <div className="">
            <table className="myorder-table">
              <tr className="myorder-table-th">
                <th>ITEM</th>
                <th>PRICE</th>
                <th>QTY</th>
                <th>STATUS</th>
              </tr>
           

              {filterorders.map((items) => {
                return items.orderItems.map((item) => {
                  return ( <tr className="myorder-table-tr">
                  <td className="myorder-table-img">
                  <Link to={`/${item.productId}`}>
                                <img src={item.image} alt="perfume" />
                              </Link>
                    <h2 style={{ color: "#fff" }}>{item.title}</h2>
                  </td>
                  <td className="myorder-table-price">
                    <p>{getSymbolFromCurrency(item.pricecon)}{item.price[0]}</p>
                  </td>
                  <td className="myorder-table-qty">
                    <p>{item.count}</p>
                  </td>
                  <td>
                    <p>In Transit</p>
                  </td>
                </tr>
                  );
                });
              })}              
            </table>
            </div>
          </div>          
        </div>
      </div>
    </div>
  ) : (
    <div style={{ color: "white" }}>No Orders yet</div>
  );
};
