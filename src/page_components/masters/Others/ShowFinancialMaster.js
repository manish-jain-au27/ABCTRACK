import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const ShowFinancialMaster = () => {
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
            startYear: "2023",
            endYear: "2024",
            yearName: "FY23-24",
        },
        {
            index: "2",
            startYear: "2024",
            endYear: "2025",
            yearName: "FY24-25",
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
            name: "Financial Start Year",
            selector: (row) => row.startYear,
            sortable: true,
            wrap: true,
            // width: "30%",
        },
        {
            name: "Financial End Year",
            selector: (row) => row.endYear,
            sortable: true,
            wrap: true,
        },
        {
            name: "Financial Year Name",
            selector: (row) => row.yearName,
            sortable: true,
            wrap: true,
        },
        {
            name: "Actions",
            selector: (row) => (
                <>
                    {/* <Link
                        to={"/viewcategory" + row.categoryId}
                    >
                        <button className="btn btn-primary pt-2" title="View">
                            <i className="icon-eye"></i>
                        </button>
                    </Link>
                    &nbsp;
                    &nbsp; */}
                    <Link
                        to={"/editcategory" + row.categoryId}
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
        let startYearValue;
        let endYearValue;
        let yearNameValue;

        const newRows = data.filter((row) => {
            indexValue = row.index
                .toString()
                .includes(e.target.value);
            startYearValue = row.startYear.toLowerCase().includes(e.target.value.toLowerCase());
            endYearValue = row.endYear.toLowerCase().includes(e.target.value.toLowerCase());
            yearNameValue = row.yearName.toLowerCase().includes(e.target.value.toLowerCase());

            if (yearNameValue) {
                searchValue = yearNameValue;
            } else if (startYearValue) {
                searchValue = startYearValue;
            } else if (endYearValue) {
                searchValue = endYearValue;
            } else if (indexValue) {
                searchValue = indexValue;
            } else {
                searchValue = "";
            }

            return searchValue;
        });

        setRows(newRows);
    };

    return (
        <div>
            <div className="header d-flex justify-content-between">
                <h2>
                    All Financial Years
                    <small>
                        All Financial Years are shown below within the table.
                    </small>
                </h2>
                <Link to="/othermasters">
                    <button className="btn theme-bg-primary rounded-pill" type="button">
                        <i className="fa fa-plus-circle"></i>&nbsp;&nbsp;
                        <span>Add Financial Year</span>
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
    )
}

export default ShowFinancialMaster;