import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const InputButtonAddons = () => {
  return (
    <div className="card">
      <div className="header">
        <h2>Input Button addonss</h2>
      </div>
      <div className="body">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <button className="btn btn-outline-secondary" type="button">
              Button
            </button>
          </div>
          <input
            aria-describedby="basic-addon1"
            aria-label=""
            className="form-control"
            placeholder=""
            type="text"
          />
        </div>
        <div className="input-group mb-3">
          <input
            aria-describedby="basic-addon2"
            aria-label="Recipient's username"
            className="form-control"
            placeholder="Recipient's username"
            type="text"
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">
              Button
            </button>
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <button className="btn btn-outline-secondary" type="button">
              Button
            </button>
            <button className="btn btn-outline-secondary" type="button">
              Button
            </button>
          </div>
          <input
            aria-describedby="basic-addon1"
            aria-label=""
            className="form-control"
            placeholder=""
            type="text"
          />
        </div>
        <div className="input-group">
          <input
            aria-describedby="basic-addon2"
            aria-label="Recipient's username"
            className="form-control"
            placeholder="Recipient's username"
            type="text"
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">
              Button
            </button>
            <button className="btn btn-outline-secondary" type="button">
              Button
            </button>
          </div>
        </div>
      </div>
      <div className="body">
        <h6>Input Button dropdownss</h6>
        <div className="input-group mb-3">
          <Dropdown drop="down" className="input-group-prepend dropdown">
            <Dropdown.Toggle
              variant="success"
              as="div"
              id="dropdown-basic"
              className="hide-toggle"
            >
              <button
                aria-haspopup="true"
                className="btn btn-outline-secondary dropdown-toggle dropdown-toggle"
                ngbdropdowntoggle=""
                type="button"
                aria-expanded="false"
              >
                Dropdown
              </button>
            </Dropdown.Toggle>

            <Dropdown.Menu as="div">
              <Link to="#" className="dropdown-item">Action</Link>
              <Link to="#" className="dropdown-item">Another action</Link>
              <Link to="#" className="dropdown-item">Something else here</Link>
              <div className="dropdown-divider" role="separator"></div>
              <Link to="#" className="dropdown-item">Separated link</Link>
            </Dropdown.Menu>
          </Dropdown>

          <input
            aria-label="Text input with dropdown button"
            className="form-control"
            type="text"
          />
        </div>
        <div className="input-group">
          <input
            aria-label="Text input with dropdown button"
            className="form-control"
            type="text"
          />
          <Dropdown drop="down" className="input-group-append dropdown">
            <Dropdown.Toggle
              variant="success"
              as="div"
              id="dropdown-basic"
              className="hide-toggle"
            >
              <button
                aria-haspopup="true"
                className="btn btn-outline-secondary dropdown-toggle dropdown-toggle"
                ngbdropdowntoggle=""
                type="button"
                aria-expanded="false"
              >
                Dropdown
              </button>
            </Dropdown.Toggle>

            <Dropdown.Menu as="div" className="hclass">
              <Link to="#" className="dropdown-item">Action</Link>
              <Link to="#" className="dropdown-item">Another action</Link>
              <Link to="#" className="dropdown-item">Something else here</Link>
              <div className="dropdown-divider" role="separator"></div>
              <Link to="#" className="dropdown-item">Separated link</Link>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="body">
        <h6>Input Button wtih Segmented</h6>
        <div className="input-group mb-3">
          <Dropdown drop="down" className="input-group-prepend dropdown">
            <button className="btn btn-outline-secondary" type="button">
              Action
            </button>
            <Dropdown.Toggle
              variant="success"
              as="div"
              id="dropdown-basic"
              className="hide-toggle"
            >
              <button
                aria-haspopup="true"
                className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split dropdown-toggle"
                ngbdropdowntoggle=""
                type="button"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle Dropdown</span>
              </button>
            </Dropdown.Toggle>

            <Dropdown.Menu as="div">
              <Link to="#" className="dropdown-item">Action</Link>
              <Link to="#" className="dropdown-item">Another action</Link>
              <Link to="#" className="dropdown-item">Something else here</Link>
              <div className="dropdown-divider" role="separator"></div>
              <Link to="#" className="dropdown-item">Separated link</Link>
            </Dropdown.Menu>
          </Dropdown>

          <input
            aria-label="Text input with segmented dropdown button"
            className="form-control"
            type="text"
          />
        </div>
        <div className="input-group">
          <input
            aria-label="Text input with segmented dropdown button"
            className="form-control"
            type="text"
          />
          <Dropdown drop="down" className="input-group-append dropdown">
            <button className="btn btn-outline-secondary" type="button">
              Action
            </button>
            <Dropdown.Toggle
              variant="success"
              as="div"
              id="dropdown-basic"
              className="hide-toggle"
            >
              <button
                aria-haspopup="true"
                className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split dropdown-toggle"
                ngbdropdowntoggle=""
                type="button"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle Dropdown</span>
              </button>
            </Dropdown.Toggle>

            <Dropdown.Menu as="div">
              <Link to="#" className="dropdown-item">Action</Link>
              <Link to="#" className="dropdown-item">Another action</Link>
              <Link to="#" className="dropdown-item">Something else here</Link>
              <div className="dropdown-divider" role="separator"></div>
              <Link to="#" className="dropdown-item">Separated link</Link>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default InputButtonAddons;
