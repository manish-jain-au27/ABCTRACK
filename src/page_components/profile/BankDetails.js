import React, { useState } from "react";
import defaultCancelledCheque from "../../assets/images/defaultCancelledCheque.jpg";

const BankDetails = () => {
    const [cancelledCheque, setCancelledCheque] = useState(defaultCancelledCheque);

    const loadFile = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const fileURL = URL.createObjectURL(file);
            // console.log(e.target.files[0], fileURL);
            setCancelledCheque(fileURL);

            setTimeout(() => {
                URL.revokeObjectURL(fileURL);
            }, 5000);
        }
    };

    return (
        <div>
            <div className="body">
                <h6>Bank Details</h6>
                <div className="row clearfix">
                    <div className="col-lg-6 col-md-12">
                        <div className="form-group">
                            <select className="form-control">
                                <option value="">-- SELECT BANK NAME --</option>
                                <option value="AXIS BANK LTD">AXIS BANK LTD</option>
                                <option value="UNION BANK">UNION BANK</option>
                                <option value="INDIAN BANK">INDIAN BANK</option>
                                <option value="SBI BANK">SBI BANK</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                placeholder="Account Holder Name"
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                placeholder="Account No"
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Cancelled Check / First Page Of Passbook
                                <br />
                                (Maximum File Size 1MB)
                            </label>
                            <br />
                            <label
                                className="btn theme-bg"
                            >
                                Select File
                                <input
                                    id="filePhoto"
                                    type="file"
                                    onChange={loadFile}
                                    hidden
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <img
                                alt="User"
                                className="user-photo media-object"
                                style={{ width: "600px", height: "250px" }}
                                src={cancelledCheque}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="form-group">
                            <select className="form-control">
                                <option value="">-- SELECT ACCOUNT TYPE --</option>
                                <option value="CURRENT">CURRENT</option>
                                <option value="SAVINGS">SAVINGS</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                placeholder="IFSC Code"
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                placeholder="Bank Branch Name"
                                type="text"
                            />
                        </div>
                    </div>
                </div>
                <button className="btn theme-bg" type="button">
                    Update
                </button>
            </div>
        </div>
    );
}


export default BankDetails;