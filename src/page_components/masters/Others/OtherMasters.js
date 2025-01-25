import React, { useEffect } from "react";
import { connect } from "react-redux";
import PageHeader from "../../../components/PageHeader";
import { Tabs, Tab } from "react-bootstrap";
import AddFinancialMaster from "./AddFinancialMaster";

const OtherMasters = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Add Other Masters - ABC Track';
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
            HeaderText="Masters"
            Breadcrumb={[
              { name: "Masters" },
              { name: "Others Masters" },
              { name: "Add Others Masters" },
            ]}
          />
          <div className="row clearfix">
            <div className="col-lg-12">
              <div className="card">
                <div className="body">
                  <Tabs
                    defaultActiveKey="financhialMaster"
                    id="uncontrolled-tab-example"
                  >
                    <Tab eventKey="financhialMaster" title="Financial Masters">
                      <AddFinancialMaster />
                    </Tab>
                    {/* <Tab eventKey="subCategories" title="Sub Categories">
                    </Tab> */}
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

export default connect(mapStateToProps, {})(OtherMasters);