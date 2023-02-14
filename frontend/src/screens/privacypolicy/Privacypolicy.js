import React, { useEffect, useState } from "react";
import "./privacypolicy.css";
import axios from "axios";
import logo from "../../assets/images/crest-large.png";
import { useDispatch, useSelector } from "react-redux";
import { listPrice } from "../../actions/productaction";
import { Translate } from "react-auto-translate";
import { useLayoutEffect } from "react";


export const Privacypolicy = () => {
  const [datas, setdatas] = useState(null);
  const dispatch = useDispatch();

  useEffect(async () => {
    const { data } = await axios.get(`http://localhost:5000/api/privacy`);
    setdatas(data.user[0]);
  }, []);
  const prices = useSelector((state) => state.priceList);
  const { price } = prices;

  useEffect(() => {
    dispatch(listPrice());
  }, [dispatch]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });
  return price == "INR" && datas != null ? (
    <div className="aboutus-container">
      <div className="aboutus-logo">
        <hr />
        <img src={logo} />
        <hr />
      </div>
      <div className="aboutus-head">
        <h1><Translate>{datas.head.INR}</Translate></h1>
      </div>
      <div className="aboutus-container-box">
        <div className="about-para">
          <p><Translate>{datas.title.INR}</Translate></p>
        </div>

        <div className="about-us-decor">

          <div>
            <h5><Translate>{datas.head1.INR}</Translate></h5>
            <p><Translate>{datas.info1.INR}</Translate></p>
          </div>
        </div>
        <div className="about-us-decor abooutus-images">
          <div>
            <h5><Translate>{datas.head2.INR}</Translate></h5>
            <p><Translate>{datas.title2.INR}</Translate></p>
          </div>

        </div>
        <div className="about-us-decor">

          <div>
            <h5><Translate>{datas.head3.INR}</Translate></h5>
            <p><Translate>{datas.title3.INR}</Translate></p>
          </div>
        </div>
        <div className="about-us-decor abooutus-images">
          <div>
            <h5><Translate>{datas.head4.INR}</Translate></h5>
            <p><Translate>{datas.title4.INR}</Translate></p>
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
        <div className="about-para">
          <p>{datas.title.AED}</p>
        </div>

        <div className="about-us-decor">

          <div>
            <p>{datas.head1.AED}</p>
            <p>{datas.info1.AED}</p>
          </div>
        </div>
        <div className="about-us-decor abooutus-images">
          <div>
            <h5>{datas.head2.AED}</h5>
            <p>{datas.title2.AED}</p>
          </div>

        </div>
        <div className="about-us-decor">

          <div>
            <h5>{datas.head3.AED}</h5>
            <p>{datas.title3.AED}</p>
          </div>
        </div>
        <div className="about-us-decor abooutus-images">
          <div>
            <h5>{datas.head4.AED}</h5>
            <p>{datas.title4.AED}</p>
          </div>

        </div>

      </div>
    </div>
  ) : (<div></div>)
}
