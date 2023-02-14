import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { login } from "../../actions/useraction";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <section className="sign-in">
      <div className="container">
        <div className="signin-content">
          <div className="signin-image">
            <Link to="/register" className="signup-image-link">
              Create an account
            </Link>
          </div>

          <div className="signin-form">
            <h2 className="form-title">Sign in</h2>

            <form
              method="POST"
              onSubmit={submitHandler}
              className="register-form"
              id="login-form"
            >
              <div className="form-group">
                <label for="your_name">
                  <i className="zmdi zmdi-account material-icons-name"></i>
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="your_name"
                  id="your_name"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label for="your_pass">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  type="password"
                  name="your_pass"
                  id="your_pass"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="agree-term"
                />
                <label for="remember-me" className="label-agree-term">
                  <span>
                    <span></span>
                  </span>
                  Remember me
                </label>
              </div>
              <div className="form-group form-button">
                <input
                  type="submit"
                  name="signin"
                  id="signin"
                  className="form-submit"
                  value="Log in"
                />
              </div>
            </form>
            <div className="social-login">
              <span className="social-label">Or login with</span>
              <ul className="socials">
                <li>
                  <a href="#">
                    <i className="display-flex-center zmdi zmdi-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="display-flex-center zmdi zmdi-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="display-flex-center zmdi zmdi-google"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginScreen;
