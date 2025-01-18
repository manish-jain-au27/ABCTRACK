import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/PageHeader";
import { Tabs, Tab } from "react-bootstrap";
import Categories from "./Categories";
import SubCategories from "./SubCategories";

const AddCategory = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div
      style={{ flex: 1 }}
      onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}
    >
      <div>
        <div className="container-fluid">
          <PageHeader
            HeaderText="Categories"
            Breadcrumb={[
              { name: "Masters", navigate: "" },
              { name: "Category Master", navigate: "" },
              { name: "Add Category", navigate: "" },
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
                        <Categories />
                    </Tab>
                    <Tab eventKey="subCategories" title="Sub Categories">
                      <SubCategories />
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ ioTReducer }) => ({
  isSecuritySystem: ioTReducer.isSecuritySystem,
});

export default connect(mapStateToProps, {})(AddCategory);