import React, { useState } from "react"
import Notification from "../../../components/Notification";

const AddFinancialMaster = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');

    const toggleToast = () => setShowSuccess(!showSuccess);

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
                <div className="body">
                    <form className="ng-untouched ng-dirty ng-invalid">
                        <div className="row">
                            {/* <div className="form-group col-lg-4">
                                <label>Financial Year Id</label>{"   "}<span className="text-danger">*</span>
                                <input
                                    className={`form-control`}
                                    name="clientCode"
                                />
                            </div> */}
                            <div className="form-group col-lg-4">
                                <label>Financial Start Year</label>{"   "}<span className="text-danger">*</span>
                                <input
                                    className={`form-control`}
                                    name="clientCode"
                                />
                            </div>
                            <div className="form-group col-lg-4">
                                <label>Financial End Year</label>{"   "}<span className="text-danger">*</span>
                                <input
                                    className={`form-control`}
                                    name="clientName"
                                />
                            </div>
                            <div className="form-group col-lg-4">
                                <label>Financial Year Name</label>{"   "}<span className="text-danger">*</span>
                                <input
                                    className={`form-control`}
                                    name="clientName"
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
                                        Save
                                    </button>
                                </div>
                            </div>
                            {showSuccess && (
                                <Notification
                                    type="success"
                                    position="bottom-right"
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
    )
}

export default AddFinancialMaster;