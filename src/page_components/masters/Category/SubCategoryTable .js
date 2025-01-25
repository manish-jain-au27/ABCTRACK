import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const SubCategoryTable = () => {
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
            subCategoryId: "1",
            categoryName: "GST",
            subCategoryName: "ITR Filing",
        },
        {
            subCategoryId: "2",
            categoryName: "TAX",
            subCategoryName: "Accounting",
        },
        {
            subCategoryId: "3",
            categoryName: "GST",
            subCategoryName: "GST",
        },
        {
            subCategoryId: "4",
            categoryName: "GST",
            subCategoryName: "GST",
        },
    ]

    const columns = [
        {
            name: "Sub Category Id",
            selector: (row) => row.subCategoryId,
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
            name: "Sub Category Name",
            selector: (row) => row.subCategoryName,
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
                        to={"/editcategory" + row.subCategoryId}
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
        let subCategoryIdValue;
        let categoryNameValue;
        let subCategoryNameValue;

        const newRows = data.filter((row) => {
            subCategoryIdValue = row.subCategoryId
                .toString()
                .includes(e.target.value);
            categoryNameValue = row.categoryName.toLowerCase().includes(e.target.value.toLowerCase());
            subCategoryNameValue = row.subCategoryName.toLowerCase().includes(e.target.value.toLowerCase());

            if (subCategoryNameValue) {
                searchValue = subCategoryNameValue;
            } else if (categoryNameValue) {
                searchValue = categoryNameValue;
            } else if (subCategoryIdValue) {
                searchValue = subCategoryIdValue;
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
                    All Sub Categories
                    <small>
                        All Sub Categories are shown below within the table.
                    </small>
                </h2>
                <Link to="/categorymaster">
                    <button className="btn theme-bg-primary rounded-pill" type="button">
                        <i className="fa fa-plus-circle"></i>&nbsp;&nbsp;
                        <span>Add Sub Category</span>
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

export default SubCategoryTable;