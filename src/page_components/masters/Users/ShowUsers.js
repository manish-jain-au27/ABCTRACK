import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/PageHeader";

const ShowUsers = () => {
    useEffect(() => {
        document.title = 'User Master - ABC Track';
    }, []);

    const customStyles = {
        table: {
            style: {
                borderCollapse: 'collapse',
                border: '1px solid #ddd',
            },
        },
        rows: {
            style: {
                '&:hover': {
                    backgroundColor: '#f3f0fe',
                },
            },
        },
        headCells: {
            style: {
                border: '1px solid #ddd',
                borderCollapse: 'collapse',
                padding: '10px',
                textAlign: 'center',
                fontSize: '15px',
                textTransform: 'uppercase',
            },
        },
        cells: {
            style: {
                border: '1px solid #ddd',
                borderCollapse: 'collapse',
                padding: '10px',
            },
        },
    };

    const data = [
        {
            userId: "1",
            userName: "DARSHAN JAIN",
            userType: "OWNER",
        },
        {
            userId: "2",
            userName: "MANOJ",
            userType: "EXECUTIVE",
        },
    ]

    const columns = [
        {
            name: "User Id",
            selector: (row) => row.userId,
            sortable: true,
            wrap: true,
            width: "10%",
        },
        {
            name: "User Name",
            selector: (row) => row.userName,
            sortable: true,
            wrap: true,
            width: "30%",
        },
        {
            name: "User Type",
            selector: (row) => row.userType,
            sortable: true,
            wrap: true,
        },
        {
            name: "Actions",
            selector: (row) => (
                <>
                    <Link
                        to={"/viewusers" + row.userId}
                    >
                        <button className="btn btn-primary pt-2 my-1" title="View">
                            <i className="icon-eye"></i>
                        </button>
                    </Link>
                    &nbsp;
                    &nbsp;
                    <Link
                        to={"/editusers" + row.index}
                    >
                        <button className="btn btn-secondary pt-2 my-1" title="Edit">
                            <i className="icon-pencil"></i>
                        </button>
                    </Link>
                </>
            ),
            sortable: true,
            wrap: true,
            center: true,
            width: "15%"
        },
    ]

    const [rows, setRows] = useState(data);

    const handleSearch = (e) => {
        let searchValue;
        let userIdValue;
        let userNameValue;
        let userTypeValue;

        const newRows = data.filter((row) => {
            userIdValue = row.userId
                .toString()
                .includes(e.target.value);
            userNameValue = row.userName.toLowerCase().includes(e.target.value.toLowerCase());
            userTypeValue = row.userType
                .toLowerCase()
                .includes(e.target.value.toLowerCase());


            if (userNameValue) {
                searchValue = userNameValue;
            } else if (userTypeValue) {
                searchValue = userTypeValue;
            } else if (userIdValue) {
                searchValue = userIdValue;
            } else {
                searchValue = "";
            }

            return searchValue;
        });

        setRows(newRows);
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
                            { name: "Users Master" },
                        ]}
                    />
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="header d-flex justify-content-between">
                                    <h2>
                                        All Users
                                        <small>
                                            All Users are shown below within the table.
                                        </small>
                                    </h2>
                                    <Link to="/createusers">
                                        <button className="btn theme-bg-primary rounded-pill" type="button">
                                            <i className="fa fa-plus-circle"></i>&nbsp;&nbsp;
                                            <span>Create Users</span>
                                        </button>
                                    </Link>
                                </div>
                                <div className="body">
                                    <form className="ng-untouched ng-dirty ng-invalid">
                                        <div className="row d-flex justify-content-between">
                                            <div className="form-group col-lg-3">
                                                <label>Search</label>
                                                <input
                                                    className={`form-control`}
                                                    name="search"
                                                    onChange={handleSearch}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                    <DataTable
                                        data={rows}
                                        columns={columns}
                                        customStyles={customStyles}
                                        pagination
                                        responsive
                                        // highlightOnHover
                                        fixedHeaderScrollHeight="800px"
                                    ></DataTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ShowUsers;