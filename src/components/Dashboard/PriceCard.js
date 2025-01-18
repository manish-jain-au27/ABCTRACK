import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import image1 from "../../assets/images/space-ship.png";

class PriceCard extends React.Component {
  render() {
    return (
      <div className="card pricing2">
        <div className="body">
          <div className="pricing-plan">
            <img alt="" className="pricing-img" src={image1} />
            <h2 className="pricing-header">Ultima</h2>
            <ul className="pricing-features">
              <li>Responsive Design</li>
              <li>Color Customization</li>
              <li>HTML5 &amp; CSS3</li>
              <li>Styled elements</li>
            </ul>
            <span className="pricing-price">$349</span>
            <Link to="#" className="btn btn-outline-primary">Join Now</Link>
          </div>
        </div>
      </div>
    );
  }
}

PriceCard.propTypes = {};

const mapStateToProps = ({ analyticalReducer }) => ({});

export default connect(mapStateToProps, {})(PriceCard);
