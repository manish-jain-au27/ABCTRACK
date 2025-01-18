import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { onPressReferralsDropDown } from "../../actions";
import avatar2 from "../../assets/images/xs/avatar2.jpg";
import avatar3 from "../../assets/images/xs/avatar3.jpg";
import avatar4 from "../../assets/images/xs/avatar4.jpg";

class TwitterFeedCard extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="header">
          <h2>Twitter Feed</h2>
        </div>
        <div className="body">
          <form>
            <div className="form-group">
              <textarea
                rows="3"
                className="form-control no-resize"
                placeholder="Enter here for tweet..."
              ></textarea>
            </div>
            <button className="btn btn-primary mr-1">Tweet</button>
            <Link to="#">13K users active</Link>
          </form>
          <hr />
          <ul className="right_chat list-unstyled mb-0">
            <li className="offline">
              <Link to="#">
                <div className="media">
                  <img className="media-object " src={avatar2} alt="" />
                  <div className="media-body">
                    <span className="name">
                      @Isabella{" "}
                      <small className="float-right">1 hours ago</small>
                    </span>
                    <span className="message">
                      Contrary to popular belief not simply text
                    </span>
                    <span className="badge badge-outline status"></span>
                  </div>
                </div>
              </Link>
            </li>
            <li className="online">
              <Link to="#">
                <div className="media">
                  <img className="media-object " src={avatar3} alt="" />
                  <div className="media-body">
                    <span className="name">
                      @Alexander{" "}
                      <small className="float-right">2 hours ago</small>
                    </span>
                    <span className="message">
                      Contrary to popular belief not simply text
                    </span>
                    <span className="badge badge-outline status"></span>
                  </div>
                </div>
              </Link>
            </li>
            <li className="online">
              <Link to="#">
                <div className="media">
                  <img className="media-object " src={avatar4} alt="" />
                  <div className="media-body">
                    <span className="name">
                      @Alexander{" "}
                      <small className="float-right">1 day ago</small>
                    </span>
                    <span className="message">
                      Contrary to popular belief not simply text
                    </span>
                    <span className="badge badge-outline status"></span>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

TwitterFeedCard.propTypes = {
  onPressReferralsDropDown: PropTypes.func.isRequired,
};

const mapStateToProps = ({ analyticalReducer }) => ({
  referralsDropDown: analyticalReducer.referralsDropDown,
});

export default connect(mapStateToProps, {
  onPressReferralsDropDown,
})(TwitterFeedCard);
