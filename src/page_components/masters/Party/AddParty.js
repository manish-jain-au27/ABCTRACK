import React, { useState, useEffect } from "react"
import PageHeader from "../../../components/PageHeader";
import { Dropdown } from "react-bootstrap";
import Notification from "../../../components/Notification";

const AddParty = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');

    const toggleToast = () => setShowSuccess(!showSuccess);

    useEffect(() => {
        document.title = 'Add Party Master - ABC Track';
      }, []);

    const handleSelect = (name) => {
        setSelectedItem(name);
    };

    return (
        <div
            onClick={() => {
                document.body.classList.remove("offcanvas-active");
            }}
        >
            <div>
                <div className="container-fluid">
                    <PageHeader
                        HeaderText="Masters"
                        Breadcrumb={[
                            { name: "Masters" },
                            { name: "Party Master" },
                            { name: "Add Party" },
                        ]}
                    />
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="header">
                                    <h2>Add Party</h2>
                                </div>
                                <div className="body">
                                    <form className="ng-untouched ng-dirty ng-invalid">
                                        <div className="row">
                                            <div className="form-group col-lg-2">
                                                <label>Client Code</label>{"   "}<span className="text-danger">*</span>
                                                <input
                                                    className={`form-control`}
                                                    name="clientCode"
                                                />
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <label>Cient Name</label>{"   "}<span className="text-danger">*</span>
                                                <input
                                                    className={`form-control`}
                                                    name="clientName"
                                                />
                                            </div>
                                            <div className="form-group col-lg-2">
                                                <label>GST Type</label>{"   "}<span className="text-danger">*</span>
                                                <Dropdown className="w-100">
                                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="w-100">
                                                        {selectedItem ? selectedItem : "SELECT TYPE"}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item name="GST" onClick={(e) => handleSelect(e.target.name)}>GST</Dropdown.Item>
                                                        <Dropdown.Item name="NON GST" onClick={(e) => handleSelect(e.target.name)}>NON GST</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <label>GST Number</label>{"   "}<span className="text-danger">*</span>
                                                <input
                                                    className={`form-control`}
                                                    name="gstNo"
                                                />
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <label>PAN Number</label>{"   "}<span className="text-danger">*</span>
                                                <input
                                                    className={`form-control`}
                                                    name="panNo"
                                                />
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <div className="form-group">
                                                    <label>Phone Number</label>{"   "}<span className="text-danger">*</span>
                                                    <input
                                                        className={`form-control`}
                                                        name="phoneNo"
                                                        type="text"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <div className="form-group">
                                                    <label>Email Id</label>{"   "}<span className="text-danger">*</span>
                                                    <input
                                                        className={`form-control`}
                                                        name="emailId"
                                                        type="email"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <div className="form-group">
                                                    <label>Company Address</label>{"   "}<span className="text-danger">*</span>
                                                    <textarea
                                                        aria-label="With textarea"
                                                        className="form-control"
                                                        name="companyAddress"
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <h6>Bank Details</h6>
                                    <br />
                                    <form className="ng-untouched ng-dirty ng-invalid">
                                        <div className="row">
                                            <div className="form-group col-lg-4">
                                                <label>Account No</label>{"   "}<span className="text-danger">*</span>
                                                <input
                                                    className={`form-control`}
                                                    name="clientCode"
                                                />
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <label>Bank Name</label>{"   "}<span className="text-danger">*</span>
                                                <input
                                                    className={`form-control`}
                                                    name="clientName"
                                                />
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <label>IFSC Code</label>{"   "}<span className="text-danger">*</span>
                                                <input
                                                    className={`form-control`}
                                                    name="gstNo"
                                                />
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <label>Branch Name</label>{"   "}<span className="text-danger">*</span>
                                                <input
                                                    className={`form-control`}
                                                    name="panNo"
                                                />
                                            </div>
                                        </div>
                                    </form>
                                    <br />
                                    <div className="text-center">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="form-group col-lg-12" style={{ textAlign: 'center' }}>
                                                    <button
                                                        className="btn theme-bg-primary rounded-pill"
                                                        onClick={toggleToast}
                                                        type="button">
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                            {showSuccess && (
                                                <Notification
                                                    type="success"  // or "error", depending on the type
                                                    position="bottom-right"  // Customize the position
                                                    dialogText="Added Successfully!"
                                                    show={showSuccess}
                                                    onClose={toggleToast}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AddParty;