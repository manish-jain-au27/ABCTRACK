import React, { useEffect } from "react";
import { connect } from "react-redux";
import PageHeader from "../../components/PageHeader";
import { Tabs, Tab } from "react-bootstrap";
import PersonalInformation from "./PersonalInformation";
import CommunicationAddress from "./CommunicationAddress";
import BankDetails from "./BankDetails";
import OfficialDocuments from "./OfficialDocuments";
import Agreement from "./Agreement";

const Profile = () => {
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
            HeaderText="User Profile"
            Breadcrumb={[
              { name: "Profile", navigate: "" },
            ]}
          />
          <div className="row clearfix">
            <div className="col-lg-12">
              <div className="card">
                <div className="body">
                  <Tabs
                    defaultActiveKey="personalInformation"
                    id="uncontrolled-tab-example"
                  >
                    <Tab eventKey="personalInformation" title="Personal Information">
                      <PersonalInformation />
                    </Tab>
                    <Tab eventKey="communicationAddress" title="Communication Address">
                      <CommunicationAddress />
                    </Tab>
                    <Tab eventKey="BankDetails" title="Bank Details">
                      <BankDetails />
                    </Tab>
                    <Tab eventKey="OfficialDocuments" title="Official Documents">
                      <OfficialDocuments />
                    </Tab>
                    <Tab eventKey="Agreement" title="Agreement">
                      <Agreement />
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

export default connect(mapStateToProps, {})(Profile);