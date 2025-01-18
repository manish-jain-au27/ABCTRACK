import React from "react";
import { connect } from "react-redux";
import Logo from "../../assets/images/A-logo-white.png";

class Registration extends React.Component {
  componentDidMount() {
    document.body.classList.remove("theme-cyan");
    document.body.classList.remove("theme-purple");
    document.body.classList.remove("theme-blue");
    document.body.classList.remove("theme-green");
    document.body.classList.remove("theme-orange");
    document.body.classList.remove("theme-blush");
  }
  render() {
    return (
      <div className="theme-cyan">
        <div >
          <div className="vertical-align-wrap">
            <div className="vertical-align-middle auth-main">
              <div className="auth-box">
                <div className="top" style={{ position: "relative" }}>
                  <img src={Logo} alt="ABC Track" style={{ height: "40px", width: "40px", margin: "10px 0px 10px 10px" }} />
                  <p style={{ fontSize: "35px", fontWeight: "bold", color: "white", margin: "0px 10px 10px 8px", display: "inline", position: "absolute", top: "2px" }}>ABC TRACK</p>
                </div>
                <div className="card">
                  <div className="header">
                    <p className="lead">Create an account</p>
                  </div>
                  <div className="body">
                    <form
                      className="form-auth-small ng-untouched ng-pristine ng-valid"

                    >
                      <div className="form-group">
                        <label className="control-label sr-only" >
                          Email
                        </label>
                        <input
                          className="form-control"
                          id="signup-email"
                          placeholder="Enter email"
                          type="email"
                        />
                      </div>
                      <div className="form-group">
                        <label className="control-label sr-only" >
                          Password
                        </label>
                        <input
                          className="form-control"
                          id="signup-password"
                          placeholder="Enter password"
                          type="password"
                        />
                      </div>
                      <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={() => { this.props.history.push("login") }}>
                        REGISTER
                      </button>
                      <div className="bottom">
                        <span className="helper-text">
                          Already have an account?{" "}
                          <a href="login">Login</a>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Registration.propTypes = {
};

const mapStateToProps = ({ loginReducer }) => ({
  email: loginReducer.email,
  password: loginReducer.password
});

export default connect(mapStateToProps, {
})(Registration);
