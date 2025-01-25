import React, { useState, useEffect } from "react"
import PageHeader from "../../../components/PageHeader";
import { Dropdown } from "react-bootstrap";
import Notification from "../../../components/Notification";
import qrCodeImg from "../../../assets/images/qrCode.svg";
import axios from "axios";

const EntityMaster = () => {
    const [entityData, setEntityData] = useState({});
    // const [submeet, setSubmeet] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [gstType, setgstType] = useState('');
    const [bankRows, setBankRows] = useState([{
        bankName: '',
        accountNo: '',
        branchName: '',
        ifscCode: '',
        openingBalance: '',
    }]);
    const [qrCode, setQrCode] = useState(qrCodeImg);
    const [signFile, setSignFile] = useState("");

    const loadFile = (e) => {
        if (e.target.files[0] && e.target.name == "qrCodeFile") {
            const file = e.target.files[0];
            const fileURL = URL.createObjectURL(file);
            console.log(e.target.files[0], fileURL);
            setQrCode(fileURL);
            // URL.revokeObjectURL(fileURL);
        }
        if (e.target.files[0] && e.target.name == "signFile") {
            const file = e.target.files[0];
            const fileURL = URL.createObjectURL(file);
            console.log(e.target.files[0], fileURL);
            setSignFile(fileURL);
            // URL.revokeObjectURL(fileURL);
        }
    };

    useEffect(() => {
        document.title = 'Add Entity Master - ABC Track';
    }, []);

    const toggleToast = () => setShowSuccess(!showSuccess);

    const handleSelectGst = (name) => {
        setgstType(name);
    };

    const handleOnChange = (e) => {
        console.log(e.target.value, entityData)
        setEntityData({ ...entityData, [e.target.name]: e.target.value });
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
        // console.log(index);
        const updatedRows = bankRows.filter((_, idx) => idx !== index);
        setBankRows(updatedRows);
    };

    const validate = () => {
        const gstregex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (gstregex.test(entityData.gstNo)) { }

        const panregex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
        if (panregex.test(entityData.panNo)) return 1;

        return 0;
    }

    const saveEntity = (e) => {
        e.preventDefault();
        setEntityData({ ...entityData, "gstType": gstType })
        console.log(validate())
        console.log(entityData, gstType, bankRows)
        // if (validate() === 0) {
        //     return 0;
        // }
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
                                                    className={'form-control'}
                                                    value={entityData.companyName || ""}
                                                    id="companyName"
                                                    name="companyName"
                                                    onChange={handleOnChange}
                                                />
                                                {/* {companyName === "" && submeet ? (
                                                    <ul className="parsley-errors-list filled" id="parsley-id-29">
                                                        <li className="parsley-required">
                                                            This value is required.
                                                        </li>
                                                    </ul>
                                                ) : null} */}
                                            </div>
                                            <div className="form-group col-lg-2">
                                                <label>GST Type</label>{"   "}<span className="text-danger">*</span>
                                                <Dropdown className="w-100">
                                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="w-100">
                                                        {gstType ? gstType : "SELECT TYPE"}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item name="SELECT TYPE" id="SELECT_TYPE" onClick={(e) => handleSelectGst(e.target.name)}>SELECT TYPE</Dropdown.Item>
                                                        <Dropdown.Item name="GST" id="GST" onClick={(e) => handleSelectGst(e.target.name)}>GST</Dropdown.Item>
                                                        <Dropdown.Item name="NON GST" id="NON_GST" onClick={(e) => handleSelectGst(e.target.name)}>NON GST</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            {
                                                (gstType === 'GST') &&
                                                <div className="form-group col-lg-4">
                                                    <label>GST Number</label>{"   "}<span className="text-danger">*</span>
                                                    <input
                                                        className={`form-control`}
                                                        id="gstNo"
                                                        name="gstNo"
                                                        onChange={handleOnChange}
                                                    />
                                                </div>
                                            }
                                            <div className="form-group col-lg-2">
                                                <label>PAN Number</label>{"   "}<span className="text-danger">*</span>
                                                <input
                                                    className={`form-control`}
                                                    id="panNo"
                                                    name="panNo"
                                                    onChange={handleOnChange}
                                                />
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <div className="form-group">
                                                    <label>Company Address</label>{"   "}<span className="text-danger">*</span>
                                                    <textarea
                                                        aria-label="With textarea"
                                                        className="form-control"
                                                        id="companyAddress"
                                                        name="companyAddress"
                                                    onChange={handleOnChange}
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <div className="form-group">
                                                    <label>Phone Number</label>{"   "}<span className="text-danger">*</span>
                                                    <input
                                                        className={`form-control`}
                                                        id="phoneNo"
                                                        name="phoneNo"
                                                        type="text"
                                                        onChange={handleOnChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <div className="form-group">
                                                    <label>Email Id</label>{"   "}<span className="text-danger">*</span>
                                                    <input
                                                        className={`form-control`}
                                                        id="emailId"
                                                        name="emailId"
                                                        type="text"
                                                        onChange={handleOnChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <div className="form-group">
                                                    <label>Authorised Signatory</label>{"   "}<span className="text-danger">*</span>
                                                    <input
                                                        className={`form-control`}
                                                        id="authorisedSign"
                                                        name="authorisedSign"
                                                        type="text"
                                                        onChange={handleOnChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-lg-2">
                                                <div className="form-group">
                                                    <label>QR Code</label>{"   "}<span className="text-danger">*</span>
                                                    <br />
                                                    <label
                                                        className="btn theme-bg"
                                                    >
                                                        Select File
                                                        <input
                                                            id="qrCodeFile"
                                                            name="qrCodeFile"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={loadFile}
                                                            hidden
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-lg-3">
                                                <div className="media">
                                                    <div className="media-left m-r-15">
                                                        <img
                                                            alt="QR Code"
                                                            className="user-photo media-object"
                                                            style={{ width: "180px", height: "200px" }}
                                                            src={qrCode}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group col-lg-2">
                                                <div className="form-group">
                                                    <label>Sign</label>{"   "}<span className="text-danger">*</span>
                                                    <br />
                                                    <label
                                                        className="btn theme-bg"
                                                    >
                                                        Select File
                                                        <input
                                                            id="signFile"
                                                            name="signFile"
                                                            type="file"
                                                            accept="png"
                                                            onChange={loadFile}
                                                            hidden
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-lg-3">
                                                <div className="media">
                                                    <div className="media-left m-r-15">
                                                        <img
                                                            alt="Sign"
                                                            className="user-photo media-object"
                                                            style={{ width: "180px", height: "200px" }}
                                                            src={signFile}
                                                        />
                                                    </div>
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
                                        <div className="table-responsive">
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
                                                                id="addRowBtn"
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
                                                                        id="bankName"
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
                                                                        id="accountNo"
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
                                                                        id="branchName"
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
                                                                        id="ifscCode"
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
                                                                        id="openingBalance"
                                                                        name="openingBalance"
                                                                        value={row.openingBalance}
                                                                        onChange={(e) => handleBankRowChange(index, e)}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <i
                                                                    className="fa fa-trash"
                                                                    id="deleteRowBtn"
                                                                    style={{ cursor: 'pointer', color: 'red', fontSize: "20px" }}
                                                                    onClick={() => deleteRow(index)}
                                                                ></i>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
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