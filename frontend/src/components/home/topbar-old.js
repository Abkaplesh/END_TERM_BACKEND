import { Link, useHistory } from "react-router-dom";
import { IoEarthOutline } from "react-icons/io5";
import { MdSearch } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import "./topbar.css";
import { IoIosClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { logins, register, resetpass } from "../../actions/useraction";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { LOGIN_DISPLAY_FLEX, LOGIN_DISPLAY_NONE, USER_LOGOUT } from "../../constant/user";
import { FiLogOut } from "react-icons/fi";
import { listPrice } from "../../actions/productaction";
import getSymbolFromCurrency from "currency-symbol-map";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { cartlist } from "../../actions/cartactions";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { Translate } from "react-auto-translate";

const Topbar = () => {
  const [displays, setdisplay] = useState("none");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo, logined } = userLogin;
  const dispatch = useDispatch();
  const history = useHistory();
  const prices = useSelector((state) => state.priceList);
  const { price } = prices;
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email2, setemail2] = useState("");
  const [phone, setphone] = useState("");
  const [pass2, setpass2] = useState("");
  const [open, setopen] = useState(false);
  const [confpass, setconfpass] = useState("");
  const cartList = useSelector((state) => state.addCart);
  const { cart } = cartList;
  const getdisplay = useSelector((state) => state.getdisplay);
  const { display } = getdisplay;
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("login")) == true) {
      dispatch(cartlist(JSON.parse(localStorage.getItem("userInfo")).user));
    }
  }, [dispatch]);

  const submit = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to change password.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            alert("Password change link send to your mail");
            dispatch(
              resetpass(JSON.parse(localStorage.getItem("userInfo")).email)
            );
          },
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  useEffect(() => {
    if (userInfo == true) {
      setdisplay("none");
      dispatch({
        type: LOGIN_DISPLAY_NONE,
      });
      localStorage.setItem("login", true);
    }
    dispatch(listPrice());
  }, [userInfo]);

  const changeHandler = (e) => {
    setemail(e.target.value);
  };
  const changeHandler1 = (e) => {
    setpass(e.target.value);
  };
  const changeHandler2 = (e) => {
    setfname(e.target.value);
  };
  const changeHandler3 = (e) => {
    setlname(e.target.value);
  };
  const changeHandler4 = (e) => {
    setemail2(e.target.value);
  };
  const changeHandler5 = (e) => {
    setphone(e.target.value);
  };
  const changeHandler6 = (e) => {
    setpass2(e.target.value);
  };
  const changeHandler7 = (e) => {
    setconfpass(e.target.value);
  };
  const responseGoogle = (response) => {
    console.log(response);
  };
  return (
    <>
      <div className="topbar-box">
        <div className="topbar-language">
          <div className="topbar-currancy"></div>

          <div className="topbar-currancy-name">
            <p>
              {price} ({getSymbolFromCurrency(price)})
              {price == "INR" ? (
                <img
                  style={{ width: "30px", height: "15px", marginLeft: "5px" }}
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
                />
              ) : price == "SAR" ? (
                <img
                  style={{ width: "30px", height: "15px", marginLeft: "5px" }}
                  src="https://cdn.britannica.com/79/5779-004-DC479508/Flag-Saudi-Arabia.jpg"
                />
              ) : (
                <img
                  style={{ width: "30px", height: "15px", marginLeft: "5px" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/255px-Flag_of_the_United_Arab_Emirates.svg.png"
                />
              )}
            </p>
          </div>
          <div className="topbar-language-pic">
            <IoEarthOutline />
          </div>
          <div className="topbar-language-name">
            <span class="dropdown">
              <button class="dropbtn">
                <Translate> {localStorage.getItem("translate") == 'ar' ? "Arabic" : "English"}</Translate>

              </button>
              <span class="dropdown-content">
                <a style={{ cursor: "pointer" }} onClick={() => {
                  localStorage.setItem("translate", "ar");
                  window.location.reload();

                }}>
                الامارات
                </a>
                <a style={{ cursor: "pointer" }} onClick={() => {
                  localStorage.setItem("translate", "en");
                  window.location.reload();
                }}>
                  English
                </a>
              </span>
            </span>
          </div>
        </div>
        <div className="topbar-logo-box">
          <Link to="/">
            <img src="http://makkajperfumes.com/wp-content/uploads/Makkaj-Logo-1.png" alt="logo" className="topbar-logo" />
          </Link>
        </div>
        <div className="topbar-icons">
          <ul style={{ display: "flex" }}>
            {/* <li>
              <MdSearch style={{ paddingTop: "0.5rem" }} />
            </li> */}
            {userInfo ? (
              <li className="first-li" style={{ color: "white" }}>
                <NavDropdown
                  style={{
                    padding: "0.5rem",
                    color: "#c69736",
                  }}
                  title="My Account"
                  id="username"
                  className="text-black text-right mr-0 dropdown-menu-right cus-dropdown-menu"
                >
                  <LinkContainer to="/add-address" className="">
                    <NavDropdown.Item><Translate>Address Book</Translate></NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/myorders" className="">
                    <NavDropdown.Item><Translate>My Orders</Translate></NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/wishlist" className="">
                    <NavDropdown.Item><Translate>Wishlist</Translate></NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/writereview" className="">
                    <NavDropdown.Item><Translate>Your reviews</Translate></NavDropdown.Item>
                  </LinkContainer>

                  {/* <LinkContainer to="/addpayment" className="">
                          <NavDropdown.Item>Payment Option</NavDropdown.Item>
                        </LinkContainer> */}

                  <NavDropdown.Item onClick={submit}>
                    <Translate>Change Password</Translate>
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    onClick={() => {
                      dispatch({ type: USER_LOGOUT });
                      localStorage.setItem("userInfo", "");
                      localStorage.setItem("login", false);
                      localStorage.setItem("jwt_access_token", "");
                    }}
                  >
                    <Translate>Logout</Translate>
                  </NavDropdown.Item>
                </NavDropdown>
              </li>
            ) : (
              <li className="user-icon"
                onClick={() => {
                  setdisplay("flex");
                  dispatch({
                    type: LOGIN_DISPLAY_FLEX,
                  });
                }}
              >
                <AiOutlineUser />
              </li>
            )}
            <li>
              <span className="second-li">
                <Link to="/cart">
                  <BsBag style={{ paddingTop: "0.5rem" }} />
                  <p className="counter-cart">{cart ? cart.length : 0}</p>
                </Link>
              </span>
            </li>
            <li className="menu-toggle" onClick={() => {
              var x = document.getElementById("main-nav");
              if (open) {
                x.style.display = "none"
                setopen(false);
              }
              else {
                x.style.display = "block"
                setopen(true);
              }
            }}>
              <a href="javascript:void(0);" class="icon">
                <i class="fa fa-bars"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={`container login-container ${display == 'flex' ? "activebox" : ""}`} style={{ display: display }}>
        <div className="left-box">
          <div className="login-buttons">
            <h1>
              <Translate>Sign in Using</Translate>
            </h1>

            <button className="sign-btn">
              <FaGoogle />
              <span><Translate> Sign in with Google</Translate></span>
            </button>
            <button className="sign-btn">
              <FaFacebook />
              <span><Translate>Sign in with Facebook</Translate></span>
            </button>
          </div>
          <div className="related-products or-div">
            <div className="just-border-5"></div>
            <div className="or-text">
              <h1 style={{ color: "#000", fontSize: "1.2rem" }}>Or</h1>
            </div>
            <div className="just-border-6"></div>
          </div>
          <button
            className="last-button"
            onClick={() => {
              document.getElementById("login").style.display = "none";
              document.getElementById("register").style.display = "block";
            }}
          >
            <FaGoogle />
            <span> <Translate>Sign Up with E-mail</Translate></span>
          </button>
        </div>
        <div className="right-box">
          <div
            onClick={() => {
              setdisplay("none");
              dispatch({
                type: LOGIN_DISPLAY_NONE,
              });
            }}
          >
            <IoIosClose
              className="modal-closebtn"
            />
          </div>
          <div className="form-credentials" id="login">
            <h1>
              <Translate>Log In</Translate>
            </h1>

            <p>
              <Translate>Email</Translate>
            </p>
            <input
              type="email"
              placeholder=" Enter your email"
              onChange={changeHandler}
              value={email}
            />
            <p>
              <Translate>Password</Translate>
            </p>
            <input
              type="password"
              placeholder="Enter your password"
              value={pass}
              onChange={changeHandler1}
            />
            {logined == false ? (
              <p style={{ color: "red" }}>
                <Translate>*Please check your username and password</Translate>
              </p>
            ) : (
              <p></p>
            )}
            <button
              type="submit"
              className="lower-button"
              onClick={() => {
                console.log("click");
                dispatch(logins(email, pass));
              }}
            >
              <Translate>Sign In</Translate>
            </button>

            <div className="lower-info">
              <div>
                <p>
                  <Translate>forgot password?</Translate>
                </p>
              </div>
            </div>
          </div>
          <div className="form-signup-credentials" id="register">
            <h1>
              <Translate>Register</Translate>
            </h1>
            <p id="verify"></p>
            <div style={{ display: "flex" }}>
              <div>
                <input
                  style={{ width: "87%" }}
                  type="text"
                  placeholder="First Name"
                  onChange={changeHandler2}
                  value={fname}
                />
              </div>
              <div>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Last Name"
                  onChange={changeHandler3}
                  value={lname}
                />
              </div>
            </div>

            <input
              type="email"
              placeholder="Email"
              value={email2}
              onChange={changeHandler4}
            />

            <input
              type="phone"
              placeholder="phone no."
              value={phone}
              onChange={changeHandler5}
            />

            <input
              type="password"
              placeholder="Enter your password"
              value={pass2}
              onChange={changeHandler6}
            />

            <input
              type="password"
              placeholder="confirm password"
              value={confpass}
              onChange={changeHandler7}
            />
            <button
              type="submit"
              className="lower-button"
              onClick={() => {
                if (pass2.length >= 8 && pass2 == confpass) {
                  dispatch(
                    register(fname, lname, phone, email2, pass2, confpass)
                  );
                  document.getElementById("login").style.display = "block";
                  document.getElementById("register").style.display = "none";
                } else if (pass2 != confpass) {
                  window.alert(
                    "Your password and confirm password is not matching"
                  );
                } else {
                  window.alert(
                    "Please insert the password of atleast 8 character"
                  );
                }
              }}
            >
              <Translate>Sign Up</Translate>
            </button>

            <div className="lower-info">
              <div
                onClick={() => {
                  document.getElementById("register").style.display = "none";
                  document.getElementById("login").style.display = "block";
                }}
              >
                <p>
                  <Translate>Already a member ?</Translate>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Topbar;
