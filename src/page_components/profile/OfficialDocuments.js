import React, { useState } from "react";

const OfficialDocuments = () => {
    const [documentsData, setdocumentsData] = useState({});

    return (
        <div>
            <div className="body">
                <h6>Official Documents</h6>
                <div className="row clearfix">
                    <div className="col-lg-3 col-md-6">
                        <div className="form-group">
                            <label>CTC</label>
                            <br />
                            <input
                                className="form-control"
                                placeholder="CTC"
                                disabled
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="text-center">Sr. No.</th>
                                    <th>Document</th>
                                    <th className="text-center">Choose Document</th>
                                    <th className="text-center">Preview</th>
                                </tr>
                            </thead>
                            <tbody id="documentTable">
                                <tr>
                                    <td className="text-center">
                                        <label>1</label>
                                    </td>
                                    <td>
                                        <label>
                                            Aadhar Card (Front And Back Side In One PDF) {"  "}
                                            <span style={{ color: "red" }}>*</span>
                                        </label>
                                    </td>
                                    <td className="text-center">
                                        <label className="btn theme-bg" id="addressProofButton">
                                            Select File
                                            <input
                                                type="file"
                                                accept="application/pdf"
                                                id="addressProof"
                                                onChange={(e) => {
                                                    setdocumentsData({
                                                        ...documentsData,
                                                        addressProof: e.target.files[0].name,
                                                    });
                                                }}
                                                hidden
                                            />
                                        </label>
                                    </td>
                                    <td className="text-center">
                                        {
                                            documentsData.addressProof
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">
                                        <label>2</label>
                                    </td>
                                    <td>
                                        <label>
                                            PAN Card {"  "}
                                            <span style={{ color: "red" }}>*</span>
                                        </label>
                                    </td>
                                    <td className="text-center">
                                        <label className="btn theme-bg" id="idProofButton">
                                            {" "}
                                            Select File
                                            <input
                                                type="file"
                                                accept="application/pdf"
                                                name=""
                                                id="idProof"
                                                onChange={(e) => {
                                                    setdocumentsData({
                                                        ...documentsData,
                                                        idProof: e.target.files[0].name,
                                                    });
                                                }}
                                                hidden
                                            />
                                        </label>
                                    </td>
                                    <td className="text-center">
                                        {
                                            documentsData.idProof
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">
                                        <label>3</label>
                                    </td>
                                    <td>
                                        <label>
                                            Resume {"  "}
                                            <span style={{ color: "red" }}>*</span>
                                        </label>
                                    </td>
                                    <td className="text-center">
                                        <label className="btn theme-bg" id="resumeProofButton">
                                            {" "}
                                            Select File
                                            <input
                                                type="file"
                                                accept="application/pdf"
                                                name=""
                                                id="resumeProof"
                                                onChange={(e) => {
                                                    setdocumentsData({
                                                        ...documentsData,
                                                        resumeProof: e.target.files[0].name,
                                                    });
                                                }}
                                                hidden
                                            />
                                        </label>
                                    </td>
                                    <td className="text-center">
                                        {
                                            documentsData.resumeProof
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">
                                        <label>4</label>
                                    </td>
                                    <td>
                                        <label>
                                            Last Academic Certificate {"  "}
                                            <span style={{ color: "red" }}>*</span>
                                        </label>
                                    </td>
                                    <td className="text-center">
                                        <label className="btn theme-bg" id="academicCertificateButton">
                                            {" "}
                                            Select File
                                            <input
                                                type="file"
                                                accept="application/pdf"
                                                name=""
                                                id="academicCertificate"
                                                onChange={(e) => {
                                                    setdocumentsData({
                                                        ...documentsData,
                                                        academicCertificate: e.target.files[0].name,
                                                    });
                                                }}
                                                hidden
                                            />
                                        </label>
                                    </td>
                                    <td className="text-center">
                                        {
                                            documentsData.academicCertificate
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">
                                        <label>5</label>
                                    </td>
                                    <td>
                                        <label>
                                            Past Experience Certificate(s)/Letter(s)
                                        </label>
                                    </td>
                                    <td className="text-center">
                                        <label className="btn theme-bg" id="experienceCertButton">
                                            {" "}
                                            Select File
                                            <input
                                                type="file"
                                                accept="application/pdf"
                                                name=""
                                                id="experienceProof"
                                                onChange={(e) => {
                                                    setdocumentsData({
                                                        ...documentsData,
                                                        experienceProof: e.target.files[0].name,
                                                    });
                                                }}
                                                hidden
                                            />
                                        </label>
                                    </td>
                                    <td className="text-center">
                                        {
                                            documentsData.experienceProof
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <button className="btn theme-bg" type="button">
                    Update
                </button>
            </div>
        </div>
    );
}


export default OfficialDocuments;