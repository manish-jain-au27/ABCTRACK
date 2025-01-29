import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";
import { onPressCloseAlert } from "../../actions";

const UIBootstrapAlertMessageWithIcon = () => {
  const alertData = useSelector(state => state.UIElementsReducer.alertData);
  const dispatch = useDispatch();

  const handleCloseAlert = (ind) => {
    dispatch(onPressCloseAlert(ind));
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="header">
          <h2>Alert Messages With Icons</h2>
        </div>
        <div className="body">
          {alertData.map((data, ind) => (
            <Alert
              key={ind}
              variant={data.variant}
              show={data.show}
              onClose={() => handleCloseAlert(ind)}
              dismissible
            >
              <i className={data.iconClass}></i> {data.message}
            </Alert>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UIBootstrapAlertMessageWithIcon;
