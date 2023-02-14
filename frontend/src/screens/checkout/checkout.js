import React, { useState } from "react";
import { useEffect } from "react";
import { Translate } from "react-auto-translate";
import { CloseButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  orderaddress,
  shippingaddress,
  shippingaddressget,
} from "../../actions/orderaction";
import { Rightinfo } from "../../components/rightinfo/rightinfo";
import "./checkout.css";

export const Checkout = () => {
  const [email, setemail] = useState("");
  const [addresss, setaddress] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [apartment, setapartment] = useState("");
  const [phone, setphone] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [pin, setpin] = useState("");
  const [country, setcountry] = useState("");
  const [cont,setcont]=useState({});
  const dispatch = useDispatch();

  const history = useHistory();
  const addresses = useSelector((state) => state.shipping);
  const { address } = addresses;

  useEffect(() => {
    dispatch(
      shippingaddressget(JSON.parse(localStorage.getItem("userInfo")).user)
    );
  }, [dispatch]);
  //dispatch

  const changeHandler = (e) => {
    setemail(e.target.value);
  };
  const changeHandler1 = (e) => {
    setaddress(e.target.value);
  };
  const changeHandler2 = (e) => {
    setfname(e.target.value);
  };
  const changeHandler3 = (e) => {
    setlname(e.target.value);
  };
  const changeHandler4 = (e) => {
    setapartment(e.target.value);
  };
  const changeHandler5 = (e) => {
    setphone(e.target.value);
  };
  const changeHandler6 = (e) => {
    setcity(e.target.value);
  };
  const changeHandler7 = (e) => {
    setstate(e.target.value);
  };
  const changeHandler8 = (e) => {
    setpin(e.target.value);
  };
  const changeHandler9 = (e) => {
    setcountry(e.target.value);
  };
  
console.log(cont)
  const submitHandler = (e) => {
    dispatch(
      orderaddress(
        fname,
        lname,
        addresss,
        apartment,
        city,
        country,
        state,
        pin,
        phone,
        email,
        JSON.parse(localStorage.getItem("userInfo")).user
      )
    );
    history.push("/shipping");
  };

  return (
    <><div className="checkout-page">
      <div className="top-info">
        <h3><Translate>CHECKOUT</Translate></h3>
      </div>
      <div className="left-info">
        <div className="top-logo">
          <img src="/images/logo.png" alt="logo" />
        </div>
        <div className="contact-info">
          <p><Translate>Contact information</Translate></p>
          <p className="just-width"></p>
          {JSON.parse(localStorage.getItem("login")) != true && (
            <p>Already Have an account? Log in</p>
          )}
          <input
            required={true}
            type="email"
            placeholder="Email"
            value={email}
            onChange={changeHandler} />
        </div>
        <div className="lower-info">
          <h2 style={{ padding: "0", margin: "0" }}><Translate>Shipping address</Translate></h2>
        </div>
        <div className="main-checkoutform-div">
          <form
            onSubmit={submitHandler}
            className="checkout-form"
          >
            <input
              required={true}
              value={fname}
              onChange={changeHandler2}
              style={{ width: "40%", padding: "1rem" }}
              type="text"
              placeholder="First Name" />
            <input
              required={true}
              value={lname}
              onChange={changeHandler3}
              style={{ width: "40%", padding: "1rem" }}
              type="text"
              placeholder="last Name" />
            <input
              required={true}
              value={addresss}
              onChange={changeHandler1}
              style={{ width: "87%", padding: "1rem" }}
              type="text"
              placeholder="Address" />
            <input
              required={true}
              value={apartment}
              onChange={changeHandler4}
              style={{ width: "87%", padding: "1rem" }}
              type="text"
              placeholder="Apartment, suite, etc. (Optional)" />
            <input
              required={true}
              value={city}
              onChange={changeHandler6}
              style={{ width: "87%", padding: "1rem" }}
              type="text"
              placeholder="City" />
            <input
              required={true}
              value={country}
              onChange={changeHandler9}
              style={{ width: "25%", padding: "1rem" }}
              type="text"
              placeholder="Country" />
            <input
              required={true}
              value={state}
              onChange={changeHandler7}
              style={{ width: "24%", padding: "1rem" }}
              type="text"
              placeholder="State" />
            <input
              required={true}
              value={pin}
              onChange={changeHandler8}
              style={{ width: "24%", padding: "1rem" }}
              type="text"
              placeholder="Zip code" />
            <input
              required={true}
              value={phone}
              onChange={changeHandler5}
              style={{ width: "25%", padding: "1rem" }}
              type="text"
              placeholder="Phone number" />
            <input
              required={true}
              style={{ width: "auto", padding: "1rem" }}
              type="checkbox"
              id="checkout1" />
            <label for="checkout1"><Translate>Save this info for future</Translate></label>
            <br></br>
            <button
              required={true}
              className="continue-btn"
              type="submit"><Translate>Continue to Shipping</Translate></button>

          <a href="/cart"><Translate>Return to cart</Translate></a>
        </form>
        <div className="address-box">
          <h2 className="saved-address">
            <Translate> Choose your saved address</Translate>
          </h2>
          {address != undefined && address.address.map((item, index) => {
            return (
              <section style={{
                border: "1px solid #c69736",
                color: "white",
                padding: "2rem"
              }}
              >
                <span className="select-dot" onChange={() => {
                  setcont(item);
                } }>
                  <input type="radio" id={`add${index}`} name="address" value={item} style={{ float: "right" }} />
                </span>
                <label style={{ cursor: "pointer" }} htmlFor={`add${index}`}

                >

<Translate>{item.address}</Translate> <Translate>{item.apartment} </Translate><Translate>{item.city} </Translate><Translate>{item.state}</Translate>{" "}
<Translate>{item.country}</Translate>{" "}

                </label>


              </section>
            );
          })}
          <button
            required={true}
            className="continue-btn"
            onClick={() => {
              dispatch(
                orderaddress(
                  cont.fname,
                  cont.lname,
                  cont.addresss,
                  cont.apartment,
                  cont.city,
                  cont.country,
                  cont.state,
                  cont.pin,
                  cont.phone,
                  cont.email,
                  JSON.parse(localStorage.getItem("userInfo")).user
                )
              );
              history.push("/shipping");
            } }
          ><Translate>Continue to Shipping</Translate></button>
        </div>
      </div>

    </div><Rightinfo />
    </div></>
  );
};
