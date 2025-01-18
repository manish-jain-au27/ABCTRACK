import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class MenuListCard extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="body">
          <div className="list-group list-widget">
            <a className="list-group-item" href="appinbox">
              <span className="badge badge-success">654</span>
              <i className="fa fa-envelope text-muted"></i>Inbox
            </a>
            <Link to="#" className="list-group-item">
              <span className="badge badge-info">364</span>
              <i className="fa fa-eye text-muted"></i> Profile visits
            </Link>
            <Link to="#" className="list-group-item">
              <span className="badge badge-warning">12</span>
              <i className="fa fa-phone text-muted"></i> Call
            </Link>
            <Link to="#" className="list-group-item">
              <span className="badge badge-danger">54</span>
              <i className="fa fa-comments-o text-muted"></i> Messages
            </Link>
            <Link to="#" className="list-group-item">
              <span className="badge badge-warning">19</span>
              <i className="fa fa-bookmark text-muted"></i> Bookmarks
            </Link>
            <Link to="#" className="list-group-item">
              <span className="badge">56</span>
              <i className="fa fa-bell text-muted"></i> Notifications
            </Link>
            <Link to="#" className="list-group-item">
              <span className="badge badge-info">25</span>
              <i className="fa fa-clock-o text-muted"></i> Watch
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

MenuListCard.propTypes = {};

const mapStateToProps = ({ analyticalReducer }) => ({});

export default connect(mapStateToProps, {})(MenuListCard);
