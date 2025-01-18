import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const CategoryTable = () => {
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
            categoryId: "1",
            categoryName: "GST",
        },
        {
            categoryId: "2",
            categoryName: "TAX",
        },
        {
            categoryId: "3",
            categoryName: "NON GST",
        },
        {
            categoryId: "4",
            categoryName: "ABC",
        },
    ]

    const columns = [
        {
            name: "Category Id",
            selector: (row) => row.categoryId,
            sortable: true,
            wrap: true,
            // width: "10%",
        },
        {
            name: "Category Name",
            selector: (row) => row.categoryName,
            sortable: true,
            wrap: true,
            // width: "30%",
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
        let categoryIdValue;
        let categoryNameValue;

        const newRows = data.filter((row) => {
            categoryIdValue = row.categoryId
                .toString()
                .includes(e.target.value);
            categoryNameValue = row.categoryName.toLowerCase().includes(e.target.value.toLowerCase());

            if (categoryNameValue) {
                searchValue = categoryNameValue;
            } else if (categoryIdValue) {
                searchValue = categoryIdValue;
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
                    All Categories
                    <small>
                        All Categories are shown below within the table.
                    </small>
                </h2>
                <Link to="/categorymaster">
                    <button className="btn theme-bg-primary rounded-pill" type="button">
                        <i className="fa fa-plus-circle"></i>&nbsp;&nbsp;
                        <span>Add Category</span>
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

export default CategoryTable;