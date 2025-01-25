import React, { useEffect, useState } from "react";
import Logo from "../assets/images/A-logo-white.png";

const Login = () => {
  const [isLoad, setIsLoad] = useState(true);
  const [loginData, setLoginData] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false)
    }, 500);

    document.body.classList.remove("theme-cyan");
    document.body.classList.remove("theme-purple");
    document.body.classList.remove("theme-blue");
    document.body.classList.remove("theme-green");
    document.body.classList.remove("theme-orange");
    document.body.classList.remove("theme-blush");
    document.title = "Login - ABC Track"
  }, [])

  return (
    <div className="theme-cyan">
      <div className="page-loader-wrapper" style={{ display: isLoad ? 'block' : 'none' }}>
        <div className="loader">
          <div className="m-t-30">
            {/* <img src={require('../assets/images/logo-icon.svg')} width="48" height="48" alt="Lucid" /> */}
              <img src={Logo} alt="Logo" style={{ height: "40px", width: "40px", margin: "10px 0px 10px 10px" }} />
              <p style={{ fontSize: "25px", fontWeight: "bold", color: "white", margin: "0px 10px 10px 8px" }}>ABC TRACK</p>
          </div>
          <p>Please wait...</p>
        </div>
      </div>
      <div className="hide-border">
        <div className="vertical-align-wrap">
          <div className="vertical-align-middle auth-main">
            <div className="auth-box">
              <div className="top" style={{ position: "relative" }}>
                <img src={Logo} alt="Logo" style={{ height: "40px", width: "40px", margin: "10px 0px 10px 10px" }} />
                <p style={{ fontSize: "35px", fontWeight: "bold", color: "white", margin: "0px 10px 10px 8px", display: "inline", position: "absolute", top: "2px" }}>ABC TRACK</p>
              </div>
              <div className="card">
                <div className="header">
                  <p className="lead">Login to your account</p>
                </div>
                <div className="body">
                  <div className="form-auth-small" action="index.html">
                    <div className="form-group">
                      <label className="control-label sr-only">Email</label>
                      <input
                        className="form-control"
                        id="signin-email"
                        placeholder="Enter email"
                        type="email"
                        value={loginData.emailId || ""}
                        onChange={e => {
                          setLoginData({ ...loginData, emailId: [e.target.value] })
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="control-label sr-only">
                        Password
                      </label>
                      <input
                        className="form-control"
                        id="signin-password"
                        placeholder="Enter password"
                        type="password"
                        value={loginData.password || ""}
                        onChange={e => {
                          setLoginData({ ...loginData, password: [e.target.value] })
                        }}
                      />
                    </div>
                    <div className="form-group clearfix">
                      <label className="fancy-checkbox element-left">
                        <input type="checkbox" />
                        <span>Remember me</span>
                      </label>
                    </div>
                    <a
                      className="btn btn-primary btn-lg btn-block"
                      href="dashboard"
                    >Login</a>
                    <div className="bottom">
                      <span className="helper-text m-b-10">
                        <i className="fa fa-lock"></i>{" "}
                        <a href={`${process.env.PUBLIC_URL}/forgotpassword`} >
                          Forgot password?
                        </a>
                      </span>
                      {/* <span>
                        Don't have an account?{" "}
                        <a href="registration" >Register</a>
                      </span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;