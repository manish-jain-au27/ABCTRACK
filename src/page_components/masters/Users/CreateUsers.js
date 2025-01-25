import React, { useState, useEffect } from "react"
import PageHeader from "../../../components/PageHeader";
import { Dropdown } from "react-bootstrap";
import Notification from "../../../components/Notification";

const CreateUsers = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');

    const toggleToast = () => setShowSuccess(!showSuccess);

    const handleSelect = (name) => {
        setSelectedItem(name);
    };

    useEffect(() => {
        document.title = 'Create User Master - ABC Track';
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
                            { name: "Users Master" },
                            { name: "Create Users" },
                        ]}
                    />
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="header">
                                    <h2>Create Users</h2>
                                </div>
                                <div className="body">
                                    <form className="ng-untouched ng-dirty ng-invalid">
                                        <div className="row">
                                            <div className="form-group col-lg-2">
                                                <label>User Id</label>{"   "}<span className="text-danger">*</span>
                                                <input
                                                    className={`form-control`}
                                                    name="clientCode"
                                                />
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <label>User Name</label>{"   "}<span className="text-danger">*</span>
                                                <input
                                                    className={`form-control`}
                                                    name="clientName"
                                                />
                                            </div>
                                            <div className="form-group col-lg-2">
                                                <label>User Type</label>{"   "}<span className="text-danger">*</span>
                                                <Dropdown className="w-100">
                                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="w-100">
                                                        {selectedItem ? selectedItem : "SELECT TYPE"}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item name="OWNER" onClick={(e) => handleSelect(e.target.name)}>OWNER</Dropdown.Item>
                                                        <Dropdown.Item name="EXECUTIVE" onClick={(e) => handleSelect(e.target.name)}>EXECUTIVE</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <label>User Rights</label>{"   "}<span className="text-danger">*</span>
                                                <div className="d-flex justify-content-between mt-2">
                                                    <label className="fancy-checkbox">
                                                        <input type="checkbox" />
                                                        <span>View</span>
                                                    </label>
                                                    <label className="fancy-checkbox">
                                                        <input type="checkbox" />
                                                        <span>Edit</span>
                                                    </label>
                                                    <label className="fancy-checkbox">
                                                        <input type="checkbox" />
                                                        <span>Delete</span>
                                                    </label>
                                                </div>
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
                                                        Create
                                                    </button>
                                                </div>
                                            </div>
                                            {showSuccess && (
                                                <Notification
                                                    type="success"
                                                    position="bottom-right"
                                                    dialogText="Created User Successfully!"
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

export default CreateUsers;