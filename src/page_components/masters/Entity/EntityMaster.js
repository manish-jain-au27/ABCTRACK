import React, { useState } from "react"
import PageHeader from "../../../components/PageHeader";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import Notification from "../../../components/Notification";

const EntityMaster = () => {
    const [companyName, setCompanyName] = useState("");
    const [submeet, setSubmeet] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const [bankRows, setBankRows] = useState([{
        bankName: '',
        accountNo: '',
        branchName: '',
        ifscCode: '',
        openingBalance: ''
    }]);

    const toggleToast = () => setShowSuccess(!showSuccess);

    const handleSelect = (name) => {
        setSelectedItem(name);
    };

    const addTableRow = () => {
        setBankRows([...bankRows, {
            bankName: '',
            accountNo: '',
            branchName: '',
            ifscCode: '',
            openingBalance: ''
        }]);
    };

    const handleBankRowChange = (index, e) => {
        const { name, value } = e.target;
        const updatedRows = bankRows.map((row, idx) => {
            if (idx === index) {
                return { ...row, [name]: value };
            }
            return row;
        });
        setBankRows(updatedRows);
    };

    const deleteRow = (index) => {
        console.log(index);
        const updatedRows = bankRows.filter((_, idx) => idx !== index);
        setBankRows(updatedRows);
    };

    const saveEntity = (e) => {
        e.preventDefault();
        toggleToast();
        // setSubmeet(true);
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
                            { name: "Entity Master" },
                            { name: "Add Entity" },
                        ]}
                    />
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="header">
                                    <h2>Company Master</h2>
                                </div>
                                <div className="body">
                                    <form className="ng-untouched ng-dirty ng-invalid">
                                        <div className="row">
                                            <div className="form-group col-lg-4">
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
                                            <div className="form-group col-lg-2">
                                                <label>GST Type</label>{"   "}<span className="text-danger">*</span>
                                                <Dropdown className="w-100">
                                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="w-100">
                                                        {selectedItem ? selectedItem : "SELECT TYPE"}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item name="SELECT TYPE" onClick={(e) => handleSelect(e.target.name)}>SELECT TYPE</Dropdown.Item>
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
                                                    onChange={(e) => {
                                                        setSubmeet(false)
                                                    }
                                                    }
                                                />
                                            </div>
                                            <div className="form-group col-lg-2">
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
                                        <div className="row">
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
                                            <div className="form-group col-lg-4">
                                                <div className="form-group">
                                                    <label>Phone Number</label>{"   "}<span className="text-danger">*</span>
                                                    <input
                                                        className={`form-control`}
                                                        name="phoneNo"
                                                        type="text"
                                                        onChange={(e) => {
                                                            setSubmeet(false)
                                                        }
                                                        }
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
                                                        onChange={(e) => {
                                                            setSubmeet(false)
                                                        }
                                                        }
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
                                                    <th style={{ textAlign: "center" }}>
                                                        <i className="fa fa-plus-circle text-success"
                                                            style={{ cursor: 'pointer', fontSize: "20px" }}
                                                            onClick={addTableRow}></i>
                                                    </th>
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
                                                                    value={row.bankName}
                                                                    onChange={(e) => handleBankRowChange(index, e)}>
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
                                                                    onChange={(e) => handleBankRowChange(index, e)}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="form-group">
                                                                <input
                                                                    className="form-control"
                                                                    name="branchName"
                                                                    value={row.branchName}
                                                                    onChange={(e) => handleBankRowChange(index, e)}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="form-group">
                                                                <input
                                                                    className="form-control"
                                                                    name="ifscCode"
                                                                    value={row.ifscCode}
                                                                    onChange={(e) => handleBankRowChange(index, e)}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="form-group">
                                                                <input
                                                                    className="form-control"
                                                                    name="openingBalance"
                                                                    value={row.openingBalance}
                                                                    onChange={(e) => handleBankRowChange(index, e)}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <i
                                                                className="fa fa-trash"
                                                                style={{ cursor: 'pointer', color: 'red', fontSize: "20px" }}
                                                                onClick={() => deleteRow(index)}
                                                            ></i>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-lg-12" style={{ textAlign: 'center' }}>
                                            <button
                                                className="btn theme-bg-primary rounded-pill"
                                                onClick={saveEntity}
                                                type="button">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                    {showSuccess && (
                                        <Notification
                                            type="success"  // or "error", depending on the type
                                            position="bottom-right"  // Customize the position
                                            dialogText="Saved Successfully!"
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
        </div >
    )
}

export default EntityMaster;