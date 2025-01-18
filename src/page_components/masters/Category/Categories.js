import React, { useState } from "react";
import Notification from "../../../components/Notification";
import { Link } from "react-router-dom";

const Categories = () => {
    const [showSuccess, setShowSuccess] = useState(false);

    const toggleToast = () => setShowSuccess(!showSuccess);

    return (
        <div>
            <div className="body">
                <h6>Add Category</h6>
                <br />
                <div className="row clearfix">
                    <div className="col-lg-3">
                        <div className="form-group">
                            <label>Category Id</label>{"   "}<span className="text-danger">*</span>
                            <input
                                className={`form-control`}
                                name="categoryId"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="form-group">
                            <label>Category Name</label>{"   "}<span className="text-danger">*</span>
                            <input
                                className={`form-control`}
                                name="categoryName"
                            />
                        </div>
                    </div>
                </div>
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
    );
}

export default Categories;