import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/PageHeader";

const ShowParties = () => {
    const customStyles = {
        table: {
            style: {
                borderCollapse: 'collapse',
                border: '1px solid #ddd',
                // borderRadius: "10px",
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
            clientCode: "461",
            clientName: "DARSHAN JAIN",
            panNo: "ELGPU1122E",
            emailId: "darshanjain@gmail.com"
        },
        {
            clientCode: "545",
            clientName: "MANOJ",
            panNo: "SDDFSF32F",
            emailId: "manoj@gmail.com"
        },
        {
            clientCode: "546",
            clientName: "SWATHI",
            panNo: "BVXCVXV45G",
            emailId: "swathi@gmail.com"
        },
        {
            clientCode: "547",
            clientName: "RUCHITANJALI",
            panNo: "ASDFGH76TT",
            emailId: "ruchitanjali@gmail.com"
        },
    ]

    const columns = [
        {
            name: "Client Code",
            selector: (row) => row.clientCode,
            sortable: true,
            wrap: true,
            width: "14%",
        },
        {
            name: "Client Name",
            selector: (row) => row.clientName,
            sortable: true,
            wrap: true,
            width: "30%",
        },
        {
            name: "Pan No",
            selector: (row) => row.panNo,
            sortable: true,
            wrap: true,
        },
        {
            name: "Email Id",
            selector: (row) => row.emailId,
            sortable: true,
            wrap: true,
        },
        {
            name: "Actions",
            selector: (row) => (
                <>
                    <Link
                        to={"/viewparty" + row.clientCode}
                    >
                        <button className="btn btn-primary pt-2" title="View">
                            <i className="icon-eye"></i>
                        </button>
                    </Link>
                    &nbsp;
                    &nbsp;
                    <Link
                        to={"/editparty" + row.clientCode}
                    >
                        <button className="btn btn-secondary pt-2" title="Edit">
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
        let clientCode;
        let clientName;
        let emailId;
        let panNoValue;

        const newRows = data.filter((row) => {
            clientCode = row.clientCode
                .toString()
                .includes(e.target.value);
            clientName = row.clientName.toLowerCase().includes(e.target.value.toLowerCase());
            emailId = row.emailId
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
            panNoValue = row.panNo
                .toLowerCase()
                .includes(e.target.value.toLowerCase());


            if (clientName) {
                searchValue = clientName;
            } else if (emailId) {
                searchValue = emailId;
            } else if (clientCode) {
                searchValue = clientCode;
            } else if (panNoValue) {
                searchValue = panNoValue;
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
                            { name: "Party Master" },
                        ]}
                    />
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="header d-flex justify-content-between">
                                    <h2>
                                        All Parties
                                        <small>
                                            All Parties are shown below within the table.
                                        </small>
                                    </h2>
                                    <Link to="/partymaster">
                                        <button className="btn theme-bg-primary rounded-pill" type="button">
                                            <i className="fa fa-plus-circle"></i>&nbsp;&nbsp;
                                            <span>Add Party</span>
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

export default ShowParties;