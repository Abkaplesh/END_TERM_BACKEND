import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Translate } from "react-auto-translate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listPrice } from "../../actions/productaction";
import "./footer.css";

export const Footer = () => {
  const [category, setcategory] = useState([]);
  const dispatch = useDispatch();

  const prices = useSelector((state) => state.priceList);
  const { price } = prices;

  useEffect(() => {
    dispatch(listPrice());
  }, [dispatch]);

  useEffect(async () => {
    const y = await axios.get(`http://localhost:5000/api/procategory`);
    setcategory(y.data);
  }, []);
  return (
    <>
      <div className="footer" id="foot">
        <div className="col-1">
          <img
            src="http://makkajperfumes.com/wp-content/uploads/Makkaj-Logo-1.png"
            alt="logo"
          />
          <p>
            <Translate> Makkaj Perfumes, pioneer in the intricate art of perfumery in the
            middle east, embarks on a new journey with the vision of bringing
            the essence of the Holy Land to the world through its Makkaj
            Fragrance Line.</Translate>
          </p>
        </div>
        <div className="col-2">
          <li>
            <ul>
              <h2><Translate>COLLECTIONS</Translate></h2>
            </ul>
            <div className="footerborder"></div>

            {category.map((data) => {
              return (
                data.nav_include == true && (
                  <ul className="footer-categories">
                    <Link to={`/category/${data.title}`}>- <Translate>{data.title}</Translate></Link>
                  </ul>
                )
              );
            })}
          </li>
        </div>
        <div className="col-3">
          {" "}
          <li>
            <ul>
              <h2><Translate>OTHER LINKS</Translate></h2>
            </ul>
            <div className="footerborder"></div>
            <ul>
              <Link to="/contact">- <Translate>CONTACT</Translate></Link>
            </ul>
            <ul>
              <Link to="/delivery-and-return">- <Translate>DELIVERY AND RETURN</Translate></Link>
            </ul>
            <ul>
              <Link to="/privacy-policy">- <Translate>PRIVACY POLICY</Translate></Link>
            </ul>
            <ul>
              <Link to="/terms-and-conditions">- <Translate>TERMS AND CONDITIONS</Translate></Link>
            </ul>
          </li>
        </div>
        <div className="col-4">
          <li>
            <ul>
              <h2><Translate>OUR PROMISE</Translate></h2>
            </ul>
            <div className="footerborder"></div>
            <ul>
              <p>
              <Translate> we make emotive, uncomlicated fragrances designed to make you
                feel good. All our products are 100% vegan cruelty-free and fun
                to use.</Translate>
              </p>
            </ul>
            <ul className="flex">
              <div>
                <a
                  href="https://www.instagram.com/makkajperfumes/?hl=en"
                  target="_blank"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <div>
                <a
                  href="https://www.facebook.com/Makkaj-Perfumes-1515455235398177/"
                  target="_blank"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              </div>
              <div>
                <a href="https://twitter.com/MakkajPerfumes" target="_blank">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </ul>
          </li>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="copyName"><Translate>Copyright © 2021 MAKKAJ PERFUMES KSA</Translate></p>
        <p className="designName"><Translate>Designed By Webshark</Translate></p>
      </div>
      <div className="whatsapp_div">
        {price == "INR" ? (
          <a
            href="https://api.whatsapp.com/send?phone=0555660189&amp;text=Hello,%20Makkaj"
            className="btn whatsappbtn"
          >
            <div className="what_txt">
              <i className="fab fa-whatsapp"></i>
            </div>
          </a>
        ) : price == "AED" ? (
          <a
            href="https://api.whatsapp.com/send?phone=1234567890&amp;text=Hello,%20Makkaj"
            className="btn whatsappbtn"
          >
            <div className="what_txt">
              <i className="fab fa-whatsapp"></i>
            </div>
          </a>
        ) : (
          <a
            href="https://api.whatsapp.com/send?phone=1234567890&amp;text=Hello,%20Makkaj"
            className="btn whatsappbtn"
          >
            <div className="what_txt">
              <i className="fab fa-whatsapp"></i>
            </div>
          </a>
        )}
      </div>
    </>
  );
};