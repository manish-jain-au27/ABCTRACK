import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UIColorsContextual extends React.Component {
  render() {
    return (
      <div className="col-lg-6 col-md-12">
        <div className="card">
          <div className="header">
            <h2>Contextual text Colors</h2>
          </div>
          <div className="body">
            <p>
              classes also work well on anchors with the provided hover and
              focus states.{" "}
              <strong>
                Note that the{" "}
                <code className="highlighter-rouge">.text-white</code> and{" "}
                <code className="highlighter-rouge">.text-muted</code> class has
                no link styling.
              </strong>
            </p>
            <p>
              <Link to="#" className="text-primary">Primary link</Link>
            </p>
            <p>
              <Link to="#" className="text-secondary">Secondary link</Link>
            </p>
            <p>
              <Link to="#" className="text-success">Success link</Link>
            </p>
            <p>
              <Link to="#" className="text-danger">Danger link</Link>
            </p>
            <p>
              <Link to="#" className="text-warning">Warning link</Link>
            </p>
            <p>
              <Link to="#" className="text-info">Info link</Link>
            </p>
            <p>
              <Link to="#" className="text-light bg-dark">Light link</Link>
            </p>
            <p>
              <Link to="#" className="text-dark">Dark link</Link>
            </p>
            <p>
              <Link to="#" className="text-muted">Muted link</Link>
            </p>
            <p>
              <Link to="#" className="text-white bg-dark">White link</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ mailInboxReducer }) => ({});

export default connect(mapStateToProps, {})(UIColorsContextual);
