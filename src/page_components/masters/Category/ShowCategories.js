import React, { useState } from "react";
import PageHeader from "../../../components/PageHeader";
import { Tabs, Tab } from "react-bootstrap";
import CategoryTable from "./CategoryTable";
import SubCategoryTable from "./SubCategoryTable ";

const ShowCategories = () => {
    
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
                            { name: "Category Master" },
                        ]}
                    />
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="body">
                                    <Tabs
                                        defaultActiveKey="categories"
                                        id="uncontrolled-tab-example"
                                    >
                                        <Tab eventKey="categories" title="Categories">
                                           <CategoryTable/>
                                        </Tab>
                                        <Tab eventKey="subcategories" title="Sub Categories">
                                            <SubCategoryTable />
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ShowCategories;