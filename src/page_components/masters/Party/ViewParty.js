import React, { useState, useEffect } from "react"
import PageHeader from "../../../components/PageHeader";
import { Dropdown } from "react-bootstrap";

const ViewParty = () => {
    const [showSuccess, setShowSuccess] = useState(false);

    const toggleToast = () => setShowSuccess(!showSuccess);

    useEffect(() => {
        document.title = 'View Party Master - ABC Track';
    }, []);

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
                            { name: "View Party" },
                        ]}
                    />
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="header">
                                    <h2>View Party</h2>
                                </div>
                                <div className="body">
                                    <form className="ng-untouched ng-dirty ng-invalid">
                                        <div className="row">
                                            <div className="form-group col-lg-2">
                                                <label>Client Code</label>{"   "}<span className="text-danger">*</span>
                                                <input
                                                    className={`form-control`}
                                                    name="clientCode"
                                                    disabled
                                                    value={"461"}
                                                />
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <label>Cient Name</label>{"   "}<span className="text-danger">*</span>
                                                <input
                                                    className={`form-control`}
                                                    name="clientName"
                                                    value={"DARSHAN JAIN"}
                                                    disabled
                                                />
                                            </div>
                                            <div className="form-group col-lg-2">
                                                <label>GST Type</label>{"   "}<span className="text-danger">*</span>
                                                <Dropdown className="w-100">
                                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="w-100">
                                                        {"GST"}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item name="GST">GST</Dropdown.Item>
                                                        <Dropdown.Item name="NON GST">NON GST</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <label>GST Number</label>{"   "}<span className="text-danger">*</span>
                                                <input
                                                    className={`form-control`}
                                                    name="gstNo"
                                                    disabled
                                                    value={"SDFGH34SDFVV"}
                                                />
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <label>PAN Number</label>{"   "}<span className="text-danger">*</span>
                                                <input
                                                    className={`form-control`}
                                                    name="panNo"
                                                    disabled
                                                    value={"SDFGH67GH"}
                                                />
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <div className="form-group">
                                                    <label>Phone Number</label>{"   "}<span className="text-danger">*</span>
                                                    <input
                                                        className={`form-control`}
                                                        name="phoneNo"
                                                        type="text"
                                                        value={"8756745643"}
                                                        disabled
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
                                                        value={"darshanjain@gmail.com"}
                                                        disabled
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
                                                        disabled
                                                        value={"BHIWANDI"}
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
                                                    disabled
                                                    value={"9857356456"}
                                                />
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <label>Bank Name</label>{"   "}<span className="text-danger">*</span>
                                                <input
                                                    className={`form-control`}
                                                    name="clientName"
                                                    value={"INDIAN BANK"}
                                                    disabled
                                                />
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <label>IFSC Code</label>{"   "}<span className="text-danger">*</span>
                                                <input
                                                    className={`form-control`}
                                                    name="gstNo"
                                                    disabled
                                                    value={"SDGFG565GFG"}
                                                />
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <label>Branch Name</label>{"   "}<span className="text-danger">*</span>
                                                <input
                                                    className={`form-control`}
                                                    name="panNo"
                                                    disabled
                                                    value={"KALYAN NAKA"}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ViewParty;