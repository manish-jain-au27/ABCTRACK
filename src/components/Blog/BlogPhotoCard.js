import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import image from "../../assets/images/blog/blog-page-1.jpg";

class BlogPhotoCard extends React.Component {
  render() {
    return (
      <div className="card single_post">
        <div className="body pb-0">
          <h3 className="m-t-0 m-b-5">
            <a href="blogdetails">
              All photographs are accurate. None of them is the truth
            </a>
          </h3>
          <ul className="meta">
            <li>
              <Link to="#">
                <i className="icon-user text-primary"></i>Posted By: John Smith
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="icon-tag text-success"></i>Photography
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="icon-bubbles text-warning"></i>Comments: 3
              </Link>
            </li>
          </ul>
        </div>
        <div className="body">
          <div className="img-post m-b-15">
            <div
              className="carousel slide"
              data-ride="carousel"
              id="carouselExampleControls"
            >
              <div className="carousel-inner" role="listbox">
                <div className="carousel-item active">
                  <img
                    alt="First slide"
                    className="d-block img-fluid"
                    src={image}
                  />
                </div>
              </div>
            </div>
          </div>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
          </p>
          <Link to="#" className="btn btn-info m-t-20" title="read more">
            Read More
          </Link>
        </div>
      </div>
    );
  }
}

BlogPhotoCard.propTypes = {};

const mapStateToProps = ({ analyticalReducer }) => ({});

export default connect(mapStateToProps, {})(BlogPhotoCard);
