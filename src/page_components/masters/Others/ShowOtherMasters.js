import React, { useEffect } from "react";
import PageHeader from "../../../components/PageHeader";
import { Tabs, Tab } from "react-bootstrap";
import ShowFinancialMaster from "./ShowFinancialMaster";

const ShowOtherMasters = () => {
    useEffect(() => {
        document.title = 'Other Masters - ABC Track';
      }, []);

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
                            { name: "Others Master" },
                        ]}
                    />
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="body">
                                    <Tabs
                                        defaultActiveKey="financialMasters"
                                        id="uncontrolled-tab-example"
                                    >
                                        <Tab eventKey="financialMasters" title="Financial Masters">
                                            <ShowFinancialMaster />
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

export default ShowOtherMasters;