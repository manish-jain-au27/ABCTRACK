import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class BlogListCard extends React.Component {
  render() {
    const { ImageUrl, HeaderText, Details } = this.props;

    return (
      <div className="card single_post">
        <div className="body">
          <div className="img-post">
            <img
              className="d-block img-fluid"
              src={ImageUrl}
              alt="First slide"
            />
          </div>
          <h3>
            <a href="blogdetails">{HeaderText}</a>
          </h3>
          <p>{Details}</p>
        </div>
        <div className="footer">
          <div className="actions">
            <Link to="#" className="btn btn-outline-secondary">Continue Reading</Link>
          </div>
          <ul className="stats">
            <li>
              <Link to="#">General</Link>
            </li>
            <li>
              <Link to="#" className="icon-heart">28</Link>
            </li>
            <li>
              <Link to="#" className="icon-bubbles">128</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ mailInboxReducer }) => ({});

export default connect(mapStateToProps, {})(BlogListCard);
