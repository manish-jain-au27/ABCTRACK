import React, { useState } from "react"
import PageHeader from "../../../components/PageHeader";
import { Dropdown } from "react-bootstrap";

const ViewEntity = () => {
    const [bankRows, setBankRows] = useState([
        {
            bankName: 'AXIS BANK LTD',
            accountNo: '15434558546',
            branchName: 'DHAMANKAR NAKA',
            ifscCode: 'ASDF123456ASA',
            openingBalance: '1000'
        },
        {
            bankName: 'BANK OF INDIA',
            accountNo: '1985734576',
            branchName: 'ANJURPHATA',
            ifscCode: 'ASDF123456ASA',
            openingBalance: '2000'
        },
    ]);

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
                            { name: "Entity Master" },
                            { name: "View Entity" },
                        ]}
                    />
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="header">
                                    <h2>Company Details</h2>
                                </div>
                                <div className="body">
                                    <form className="ng-untouched ng-dirty ng-invalid">
                                        <div className="row">
                                            <div className="form-group col-lg-4">
                                                <label>Company Name</label>{"   "}<span className="text-danger">*</span>
                                                <input
                                                    className={`form-control`}
                                                    name="companyName"
                                                    disabled
                                                    value="KALASH INFOTECH"
                                                />
                                            </div>
                                            <div className="form-group col-lg-2">
                                                <label>GST Type</label>{"   "}<span className="text-danger">*</span>
                                                <Dropdown disabled className="w-100">
                                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" disabled className="w-100">
                                                        GST
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item name="GST" >GST</Dropdown.Item>
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
                                                    value="76ELGPU1122EZ8"
                                                />
                                            </div>
                                            <div className="form-group col-lg-2">
                                                <label>PAN Number</label>{"   "}<span className="text-danger">*</span>
                                                <input
                                                    className={`form-control`}
                                                    name="panNo"
                                                    disabled
                                                    value="ELGPU1122E"
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-lg-4">
                                                <div className="form-group">
                                                    <label>Company Address</label>{"   "}<span className="text-danger">*</span>
                                                    <textarea
                                                        aria-label="With textarea"
                                                        className="form-control"
                                                        name="companyAddress"
                                                        disabled
                                                        value="ANJURPHATA, MANIBHADRA COMPLEX, BHIWANDI, MAHARAHSTRA"
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <div className="form-group">
                                                    <label>Phone Number</label>{"   "}<span className="text-danger">*</span>
                                                    <input
                                                        className={`form-control`}
                                                        name="phoneNo"
                                                        type="text"
                                                        disabled
                                                        value="8555453546"
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
                                                        disabled
                                                        value="kalashinfotech.dev@gmail.com"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="header">
                                    <h2>Company Bank Details</h2>
                                </div>
                                <div className="body">
                                    <div className="col-lg-12 col-md-12">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th style={{ textAlign: "center" }}>Sr. No.</th>
                                                    <th style={{ textAlign: "center" }}>Bank Name</th>
                                                    <th style={{ textAlign: "center" }}>Account No</th>
                                                    <th style={{ textAlign: "center" }}>Branch Name</th>
                                                    <th style={{ textAlign: "center" }}>IFSC Code</th>
                                                    <th style={{ textAlign: "center" }}>Opening Balance</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bankRows.map((row, index) => (
                                                    <tr key={index}>
                                                        <th scope="row" style={{ verticalAlign: "middle", textAlign: "center" }}>{index + 1}</th>
                                                        <td>
                                                            <div className="form-group">
                                                                <select
                                                                    className="form-control"
                                                                    name="bankName"
                                                                    disabled
                                                                    value={row.bankName}>
                                                                    <option>SELECT BANK NAME</option>
                                                                    <option>AXIS BANK LTD</option>
                                                                    <option>BANK OF INDIA</option>
                                                                    <option>UNION BANK</option>
                                                                    <option>BANK OF BARODA</option>
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="form-group">
                                                                <input
                                                                    className="form-control"
                                                                    name="accountNo"
                                                                    value={row.accountNo}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="form-group">
                                                                <input
                                                                    className="form-control"
                                                                    name="branchName"
                                                                    value={row.branchName}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="form-group">
                                                                <input
                                                                    className="form-control"
                                                                    name="ifscCode"
                                                                    value={row.ifscCode}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="form-group">
                                                                <input
                                                                    className="form-control"
                                                                    name="openingBalance"
                                                                    value={row.openingBalance}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* <div className="row">
                                        <div className="form-group col-lg-12" style={{ textAlign: 'center' }}>
                                            <ul className="nav nav-tabs-new d-flex justify-content-center" role="tablist" >
                                                <li
                                                    className="nav-item mr-1 active"
                                                    id="bacicTab2-1"
                                                    role="presentation"
                                                    onClick={saveEntity}
                                                >
                                                    <Link to="#" className="nav-link active">Save</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ViewEntity;