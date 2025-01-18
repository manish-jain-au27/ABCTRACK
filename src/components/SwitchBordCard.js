import React from "react";
import { connect } from "react-redux";

import { onPressSwitchBordButton } from "../actions";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

class SwitchBordCard extends React.Component {
  render() {
    const {
      Buttons,
      OnPressSwitch,
      IsSwitch,
      onPressAllOnLight,
      onPressAllOffLight,
    } = this.props;
    return (
      <div className="col-lg-4 col-md-4 col-sm-12">
        <div className="card">
          <div className="header">
            <h2>Lights Indoor</h2>
            <Dropdown as="ul" className="header-dropdown">
              <Dropdown.Toggle variant="success" as="li" id="dropdown-basic">
                <Dropdown.Menu
                  as="ul"
                  className="dropdown-menu dropdown-menu-right"
                >
                  <li>
                    <Link to="#" onClick={onPressAllOnLight}>All On</Link>
                  </li>
                  <li>
                    <Link to="#" onClick={onPressAllOffLight}>All Off</Link>
                  </li>
                </Dropdown.Menu>
              </Dropdown.Toggle>
            </Dropdown>
            <div className="body">
              <ul className="list-unstyled basic-list ng-star-inserted">
                {Buttons.map((Button, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        !Button.NotConnected
                          ? IsSwitch[index]
                            ? "ng-star-inserted text-warning"
                            : "ng-star-inserted"
                          : "text-danger ng-star-inserted"
                      }
                    >
                      {Button.title}
                      <Link to="#" onClick={() => OnPressSwitch(index)}>
                        <span
                          className={
                            IsSwitch[index] === true && !Button.NotConnected
                              ? "badge"
                              : "badge d-none"
                          }
                        >
                          Off
                        </span>
                        <span
                          className={
                            IsSwitch[index] === false && !Button.NotConnected
                              ? "badge"
                              : "badge d-none"
                          }
                        >
                          On
                        </span>
                      </Link>
                      <span
                        className={
                          Button.NotConnected
                            ? "ng-star-inserted "
                            : "ng-star-inserted d-none"
                        }
                      >
                        Not Connected
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SwitchBordCard.propTypes = {};

const mapStateToProps = ({ ioTReducer }) => ({
  isSecuritySystem: ioTReducer.isSecuritySystem,
});

export default connect(mapStateToProps, {
  onPressSwitchBordButton,
})(SwitchBordCard);
