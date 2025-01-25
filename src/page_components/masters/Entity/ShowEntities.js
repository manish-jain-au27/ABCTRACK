import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/PageHeader";

const ShowEntities = () => {

    useEffect(() => {
        document.title = 'Entity Master - ABC Track';
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
            index: "1",
            companyName: "KALASH INFOTECH",
            gstNo: "76ELGPU1122EZ8",
            panNo: "ELGPU1122E"
        },
        {
            index: "2",
            companyName: "GOOGLE",
            gstNo: "876ASDFGSD6789",
            panNo: "ASDFGSD678"
        },
        {
            index: "3",
            companyName: "INFOSYS",
            gstNo: "436ASDASDF789",
            panNo: "EASDASDF78"
        },
        {
            index: "4",
            companyName: "ACCENTURE",
            gstNo: "456AFADFADS789",
            panNo: "AFADFADS78"
        },
    ]

    const columns = [
        {
            name: "Sr. No.",
            selector: (row) => row.index,
            sortable: true,
            wrap: true,
            width: "10%",
        },
        {
            name: "Company Name",
            selector: (row) => row.companyName,
            sortable: true,
            wrap: true,
            width: "30%",
        },
        {
            name: "GST No",
            selector: (row) => row.gstNo,
            sortable: true,
            wrap: true,
        },
        {
            name: "PAN No",
            selector: (row) => row.panNo,
            sortable: true,
            wrap: true,
        },
        {
            name: "Actions",
            selector: (row) => (
                <>
                    <Link
                        to={"/viewentity" + row.index}
                    >
                        <button className="btn btn-primary pt-2 my-1" title="View">
                            <i className="icon-eye"></i>
                        </button>
                    </Link>
                    &nbsp;
                    &nbsp;
                    <Link
                        to={"/editentity" + row.index}
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
        let indexValue;
        let companyNameValue;
        let gstNoValue;
        let panNoValue;

        const newRows = data.filter((row) => {
            indexValue = row.index
                .toString()
                .includes(e.target.value);
            companyNameValue = row.companyName.toLowerCase().includes(e.target.value.toLowerCase());
            gstNoValue = row.gstNo
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
            panNoValue = row.panNo
                .toLowerCase()
                .includes(e.target.value.toLowerCase());


            if (companyNameValue) {
                searchValue = companyNameValue;
            } else if (gstNoValue) {
                searchValue = gstNoValue;
            } else if (indexValue) {
                searchValue = indexValue;
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
                            { name: "Entity Master" },
                        ]}
                    />
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="header d-flex justify-content-between">
                                    <h2>
                                        All Companies
                                        <small>
                                            All Companies are shown below within the table.
                                        </small>
                                    </h2>
                                    <Link to="/entitymaster">
                                        <button className="btn theme-bg-primary rounded-pill" type="button">
                                            <i className="fa fa-plus-circle"></i>&nbsp;&nbsp;
                                            <span>Add Company</span>
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

export default ShowEntities;