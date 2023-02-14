import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderPost, shippingaddressget } from "../actions/orderaction";
import { listPrice } from "../actions/productaction";
import { shippingaddress } from "../actions/orderaction";


export const Addshipping = () => {
    const [email, setemail] = useState("");
    const [addresseses, setaddress] = useState("");
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [apartment, setapartment] = useState("");
    const [phone, setphone] = useState("");
    const [city, setcity] = useState("");
    const [state, setstate] = useState("");
    const [pin, setpin] = useState("");
    const [country, setcountry] = useState("");


    //dispatch
    const dispatch = useDispatch();

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

    const addresses = useSelector((state) => state.shipping);
    const { address } = addresses;


    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            shippingaddress(
                fname,
                lname,
                addresseses,
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
        window.location.replace("/add-address");


    };

    useEffect(() => {
        dispatch(
            shippingaddressget(JSON.parse(localStorage.getItem("userInfo")).user)
        );
        dispatch(listPrice());
    }, [dispatch])

    return (
        
    
        <div style={{}}className="checkout-page">
            <div className="top-info">
                <h3>ADD ADDRESS</h3>
            </div>
            <div className="left-info">
                <div className="top-logo">
                    <img src="/images/logo.png" alt="logo" />
                </div>
                <div className="contact-info">
                    <p>Contact information</p>
                    <p className="just-width"></p>
                    {JSON.parse(localStorage.getItem("login")) != true && (
            <p>Already Have an account? Log in</p>
          )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={changeHandler}
                    />
                </div>
                <div className="lower-info">
                    <h2 style={{paddingLeft: "0"}}>Shipping address</h2>
                </div>
                <div>
                    <form
                        onSubmit={submitHandler}
                        className="checkout-form">
                        <input
                            value={fname}
                            onChange={changeHandler2}
                            style={{ width: "40.7%", padding: "1rem", margin: "0.5rem" }}
                            type="text"
                            placeholder="First Name"
                        />
                        <input
                            value={lname}
                            onChange={changeHandler3}
                            style={{ width: "40.7%", padding: "1rem", margin: "0.5rem" }}
                            type="text"
                            placeholder="last Name"
                        />
                        <input
                            value={addresseses}
                            onChange={changeHandler1}
                            style={{ width: "88%", padding: "1rem", margin: "0.5rem" }}
                            type="text"
                            placeholder="Address"
                        />
                        <input
                            value={apartment}
                            onChange={changeHandler4}
                            style={{ width: "88%", padding: "1rem", margin: "0.5rem" }}
                            type="text"
                            placeholder="Apartment, suite, etc. (Optional)"
                        />
                        <input
                            value={city}
                            onChange={changeHandler6}
                            style={{ width: "88%", padding: "1rem", margin: "0.5rem" }}
                            type="text"
                            placeholder="City"
                        />
                        <input
                            value={country}
                            onChange={changeHandler9}
                            style={{ width: "25%", padding: "1rem", margin: "0.5rem" }}
                            type="text"
                            placeholder="Country"
                        />
                        <input
                            value={state}
                            onChange={changeHandler7}
                            style={{ width: "25%", padding: "1rem", margin: "0.5rem" }}
                            type="text"
                            placeholder="State"
                        />
                        <input
                            value={pin}
                            onChange={changeHandler8}
                            style={{ width: "25%", padding: "1rem", margin: "0.5rem" }}
                            type="text"
                            placeholder="Zip code"
                        />
                        <input
                            value={phone}
                            onChange={changeHandler5}
                            style={{ width: "88%", padding: "1rem", margin: "0.5rem" }}
                            type="text"
                            placeholder="Phone number"
                        />
                        <input
                            style={{ width: "9%", padding: "1rem", margin: "0.5rem" }}
                            type="checkbox"
                            id="checkout1"
                        />
                        <label for="checkout1">Save this info for future</label>
                        <br></br>
                        <input
                            style={{
                                width: "25%",
                                padding: "1rem",
                                margin: "1rem",
                                marginLeft: "0.5rem",
                                color: "#fff",
                                backgroundColor: "#c69736",
                            }}
                            type="submit"
                            value="Save Address"
                        />

                        <a href="#">Return to cart</a>
                    </form>
                </div>
            </div>
           
        </div>
    );
};
