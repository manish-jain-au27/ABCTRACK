import React from "react";
import { connect } from "react-redux";
import Logo from "../../assets/images/A-logo-white.png";

class ForgotPassword extends React.Component {
  render() {
    return (
      <div className="theme-cyan">
        <div >
          <div className="vertical-align-wrap">
            <div className="vertical-align-middle auth-main">
              <div className="auth-box">
              <div className="top" style={{ position: "relative" }}>
                <img src={Logo} alt="ABC Track" style={{ height: "40px", width: "40px", margin: "10px 0px 10px 10px" }} />
                <p style={{fontSize: "35px", fontWeight: "bold", color: "white", margin: "0px 10px 10px 8px", display: "inline", position: "absolute", top: "2px"}}>ABC TRACK</p>
              </div>
                <div className="card">
                  <div className="header">
                    <p className="lead">Recover my password</p>
                  </div>
                  <div className="body">
                    <p>Please enter your email address below to receive instructions for resetting password.</p>
                    <form className="form-auth-small ng-untouched ng-pristine ng-valid">
                      <div className="form-group">
                        <input className="form-control" placeholder="Enter new password" type="password" />
                      </div>
                      <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={() => { this.props.history.push("login") }}>
                        RESET PASSWORD
                        </button>
                      <div className="bottom">
                        <span className="helper-text">Know your password? <a href="login">Login</a></span>
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

ForgotPassword.propTypes = {
};

const mapStateToProps = ({ loginReducer }) => ({
});

export default connect(mapStateToProps, {
})(ForgotPassword);
