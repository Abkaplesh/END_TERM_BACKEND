import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import {Translator, Translate} from 'react-auto-translate';


const Navbar = () => {
  const location = useLocation();
  const [category, setcategory] = useState([]);

  useEffect(async () => {
    const y = await axios.get(`http://localhost:5000/api/procategory`);
    setcategory(y.data);
  }, []);


  return (
    
    <div className="navbar" id="main-nav">
      <ul>
        <li className="nav1">
          <Link
            to="/"
            style={{
              color:
                location.pathname == "/" || location.pathname == "/home"
                  ? "white"
                  : "#d6d6d6",
                  background:
                  location.pathname == "/" || location.pathname == "/home"
                    ? "#775b20"
                    : "transparent",
            }}
          >
           <Translate> Home</Translate>
          </Link>
        </li>
        
       <li className="nav1">
          
          <span class="dropdown">
            <button class="dropbtn">
             <Translate> Collection</Translate>
            
            </button>
            <span class="dropdown-content">
            {category.map((data) => {
              return (
                data.nav_include == true && (
                  <Link to={`/category/${data.title}`}>
                   <Translate> {data.title}</Translate>
                  </Link>
                )
              );
            })}
            </span>
          </span>
        </li>
        
        <li className="nav1">
          <Link
            to="/products"
            style={{
              color: location.pathname == "/products" ? "white" : "#d6d6d6",
              background: location.pathname == "/products"
                ? "#775b20"
                : "transparent",
            }}
          >
            <Translate>Products</Translate>
          </Link>
        </li>
        <li className="nav1">
          <Link
            to="/about-us"
            style={{
              color: location.pathname == "/about-us" ? "white" : "#d6d6d6",
              background:location.pathname == "/about-us"
                ? "#775b20"
                : "transparent",
            }}
          >
           <Translate> About Us</Translate>
          </Link>
        </li>
        <li className="nav1">
          <Link
            to="/contact"
            style={{
              color: location.pathname == "/contact" ? "white" : "#d6d6d6",
               background:location.pathname == "/contact"
                    ? "#775b20"
                    : "transparent",
            }}
          >
            <Translate>Contact us</Translate>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
