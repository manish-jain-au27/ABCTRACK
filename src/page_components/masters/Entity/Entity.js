import React, { useState } from "react"
import PageHeader from "../../../components/PageHeader";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const EntityMaster = () => {
    const [companyName, setCompanyName] = useState("")
    const [submeet, setSubmeet] = useState(false)
    const [selectedItem, setSelectedItem] = useState('');
    const [documentsData, setdocumentsData] = useState({});

    const handleSelect = (name) => {
        setSelectedItem(name);
        // console.log(name);
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
                            { name: "Entity Master" },
                        ]}
                    />
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="header">
                                    <h2>Company Master</h2>
                                </div>
                                <div className="body">
                                    <div className="row">
                                        {/* <form className="ng-untouched ng-dirty ng-invalid"> */}
                                            <div className="col-lg-6 col-md-12">
                                                <div className="form-group">
                                                    <label>Company Name</label>{"   "}<span className="text-danger">*</span>
                                                    <input
                                                        className={`form-control ${companyName === "" && submeet && "parsley-error"
                                                            }`}
                                                        value={companyName}
                                                        name="companyName"
                                                        required=""
                                                        onChange={(e) => {
                                                            setCompanyName(e.target.value)
                                                            setSubmeet(false)
                                                        }
                                                        }
                                                    />
                                                    {companyName === "" && submeet ? (
                                                        <ul className="parsley-errors-list filled" id="parsley-id-29">
                                                            <li className="parsley-required">
                                                                This value is required.
                                                            </li>
                                                        </ul>
                                                    ) : null}
                                                </div>
                                                <div className="form-group">
                                                    <label>GST Type</label>{"   "}<span className="text-danger">*</span>
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                                            {selectedItem ? selectedItem : "SELECT TYPE"}
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item name="GST" onClick={(e) => handleSelect(e.target.name)}>GST</Dropdown.Item>
                                                            <Dropdown.Item name="NON GST" onClick={(e) => handleSelect(e.target.name)}>NON GST</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                                <div className="form-group">
                                                    <label>GST Number</label>{"   "}<span className="text-danger">*</span>
                                                    <input
                                                        className={`form-control`}
                                                        name="gstNo"
                                                        onChange={(e) => {
                                                            setSubmeet(false)
                                                        }
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>PAN Number</label>{"   "}<span className="text-danger">*</span>
                                                    <input
                                                        className={`form-control`}
                                                        name="panNo"
                                                        onChange={(e) => {
                                                            setSubmeet(false)
                                                        }
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="form-group">
                                                    <label>Company Address</label>{"   "}<span className="text-danger">*</span>
                                                    <textarea
                                                        aria-label="With textarea"
                                                        className="form-control"
                                                        name="companyAddress"
                                                    ></textarea>
                                                </div>
                                                <div className="form-group">
                                                    <label>Phone Number</label>{"   "}<span className="text-danger">*</span>
                                                    <input
                                                        className={`form-control`}
                                                        name="phoneNo"
                                                        type="number"
                                                        onChange={(e) => {
                                                            setSubmeet(false)
                                                        }
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Email Id</label>{"   "}<span className="text-danger">*</span>
                                                    <input
                                                        className={`form-control`}
                                                        name="emailId"
                                                        type="email"
                                                        onChange={(e) => {
                                                            setSubmeet(false)
                                                        }
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        {/* </form> */}
                                    </div>
                                    <br />
                                    <h6>Company Bank Details</h6>
                                    <br />
                                    {/* <div className="row">
                                        <div className="form-group col-lg-4">
                                            <ul className="nav nav-tabs-new" role="tablist">
                                                <li
                                                    className="nav-item mr-1 active"
                                                    id="bacicTab2-1"
                                                    role="presentation"
                                                    onClick={() => {
                                                        this.onTabChange(1);
                                                    }}
                                                >
                                                    <Link to="#" className="nav-link active">Home</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div> */}
                                    <div className="col-lg-12 col-md-12">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Sr No.</th>
                                                    <th>Document</th>
                                                    <th>Choose Document</th>
                                                    <th>Preview</th>
                                                </tr>
                                            </thead>
                                            <tbody id="documentTable">
                                                <tr>
                                                    <td>
                                                        <label>1</label>
                                                    </td>
                                                    <td>
                                                        <label>
                                                            Aadhar Card (Front And Back Side In One PDF) {"  "}
                                                            <span style={{ color: "red" }}>*</span>
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <label className="btn btn-primary" id="addressProofButton">
                                                            Select File
                                                            <input
                                                                type="file"
                                                                accept="application/pdf"
                                                                id="addressProof"
                                                                onChange={(e) => {
                                                                    setdocumentsData({
                                                                        ...documentsData,
                                                                        addressProof: e.target.files[0].name,
                                                                    });
                                                                }}
                                                                hidden
                                                            />
                                                        </label>
                                                    </td>
                                                    <td>
                                                        {
                                                            documentsData.addressProof
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <label>2</label>
                                                    </td>
                                                    <td>
                                                        <label>
                                                            PAN Card {"  "}
                                                            <span style={{ color: "red" }}>*</span>
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <label className="btn btn-primary" id="idProofButton">
                                                            {" "}
                                                            Select File
                                                            <input
                                                                type="file"
                                                                accept="application/pdf"
                                                                name=""
                                                                id="idProof"
                                                                onChange={(e) => {
                                                                    setdocumentsData({
                                                                        ...documentsData,
                                                                        idProof: e.target.files[0].name,
                                                                    });
                                                                }}
                                                                hidden
                                                            />
                                                        </label>
                                                    </td>
                                                    <td>
                                                        {
                                                            documentsData.idProof
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <label>3</label>
                                                    </td>
                                                    <td>
                                                        <label>
                                                            Resume {"  "}
                                                            <span style={{ color: "red" }}>*</span>
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <label className="btn btn-primary" id="resumeProofButton">
                                                            {" "}
                                                            Select File
                                                            <input
                                                                type="file"
                                                                accept="application/pdf"
                                                                name=""
                                                                id="resumeProof"
                                                                onChange={(e) => {
                                                                    setdocumentsData({
                                                                        ...documentsData,
                                                                        resumeProof: e.target.files[0].name,
                                                                    });
                                                                }}
                                                                hidden
                                                            />
                                                        </label>
                                                    </td>
                                                    <td>
                                                        {
                                                            documentsData.resumeProof
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <label>4</label>
                                                    </td>
                                                    <td>
                                                        <label>
                                                            Last Academic Certificate {"  "}
                                                            <span style={{ color: "red" }}>*</span>
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <label className="btn btn-primary" id="academicCertificateButton">
                                                            {" "}
                                                            Select File
                                                            <input
                                                                type="file"
                                                                accept="application/pdf"
                                                                name=""
                                                                id="academicCertificate"
                                                                onChange={(e) => {
                                                                    setdocumentsData({
                                                                        ...documentsData,
                                                                        academicCertificate: e.target.files[0].name,
                                                                    });
                                                                }}
                                                                hidden
                                                            />
                                                        </label>
                                                    </td>
                                                    <td>
                                                        {
                                                            documentsData.academicCertificate
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <label>5</label>
                                                    </td>
                                                    <td>
                                                        <label>
                                                            Past Experience Certificate(s)/Letter(s)
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <label className="btn btn-primary" id="experienceCertButton">
                                                            {" "}
                                                            Select File
                                                            <input
                                                                type="file"
                                                                accept="application/pdf"
                                                                name=""
                                                                id="experienceProof"
                                                                onChange={(e) => {
                                                                    setdocumentsData({
                                                                        ...documentsData,
                                                                        experienceProof: e.target.files[0].name,
                                                                    });
                                                                }}
                                                                hidden
                                                            />
                                                        </label>
                                                    </td>
                                                    <td>
                                                        {
                                                            documentsData.experienceProof
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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

export default EntityMaster;