import React, { useEffect, useState } from "react";
import "./aboutus.css";
import logo from "../../assets/images/crest-large.png";
import img1 from "../../assets/images/clive-christian-layering.jpg";
import img2 from "../../assets/images/original_collection_masculine_clive_christian.jpg";
import img3 from "../../assets/images/valentine_clivechristian-8.jpg";
import brand from "../../assets/images/brand.jpg";
import store from "../../assets/images/store.jpg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listPrice } from "../../actions/productaction";
import { Translate } from "react-auto-translate";
import pic from './pic.jpg';

export const Aboutus = () => {
  const [datas, setdatas] = useState(null);
  const dispatch = useDispatch();

  useEffect(async () => {
    const { data } = await axios.get(`http://localhost:5000/api/aboutus`);
    setdatas(data.user[0]);
  }, []);
  const prices = useSelector((state) => state.priceList);
  const { price } = prices;

  useEffect(() => {
    dispatch(listPrice());
  }, [dispatch]);

  return price == "INR" && datas != null ? (
    <div className="aboutus-container">
      <div className="aboutus-logo">
        <hr />
        <img src={logo} />
        <hr />
      </div>
      <div className="aboutus-head">
        <h1>{datas.head.INR}</h1>
      </div>

      <div className="aboutus-container-box">

        <div className="founder-container-box">
          <img src={pic} />
          <h5 className="founder-title">{datas.head.INR}</h5>
          <p className="founder-designation">{datas.title.INR}</p>
        </div>

        <div className="about-us-decor">
          <div>
            <img src={datas.img1} />
          </div>
          <div>
            <h5>{datas.head1.INR}</h5>
            <p>{datas.info1.INR}</p>
          </div>
        </div>
        <div className="about-us-decor abooutus-images">
          <div>
            <h5>{datas.head2.INR}</h5>
            <p>{datas.title2.INR}</p>
          </div>
          <div className="company-side">
            <img src={datas.img2} />
          </div>
        </div>

      </div>
    </div>
  ) : datas != null ? (
    <div className="aboutus-container">
      <div className="aboutus-logo">
        <hr />
        <img src={logo} />
        <hr />
      </div>
      <div className="aboutus-head">
        <h1>{datas.head.AED}</h1>
      </div>

      <div className="aboutus-container-box">

        <div className="founder-container-box">
          <img src={pic} />
          <h5 className="founder-title">{datas.head.AED}</h5>
          <p className="founder-designation">{datas.title.AED}</p>
        </div>

        <div className="about-us-decor">
          <div>
            <img src={datas.img1} />
          </div>
          <div>
            <h5>{datas.head1.AED}</h5>
            <p>{datas.info1.AED}</p>
          </div>
        </div>
        <div className="about-us-decor abooutus-images">
          <div>
            <h5>{datas.head2.AED}</h5>
            <p>{datas.title2.AED}</p>
          </div>
          <div className="company-side">
            <img src={datas.img2} />
          </div>
        </div>

      </div>
    </div>
  ) : (<div></div>)
};
