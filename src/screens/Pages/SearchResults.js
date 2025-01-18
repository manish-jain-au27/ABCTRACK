import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: [true, false, false],
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { tab } = this.state;
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
              HeaderText="Search Result"
              Breadcrumb={[
                { name: "Page", navigate: "" },
                { name: "Search Result", navigate: "" },
              ]}
            />
            <div className="row clearfix">
              <div className="col-md-12">
                <div className="card">
                  <div className="body">
                    <div className="input-group" id="adv-search">
                      <input
                        className="form-control mr-1"
                        placeholder="Search here..."
                        type="text"
                      />
                      <button className="btn btn-primary" type="button">
                        <span
                          aria-hidden="true"
                          className="icon-magnifier"
                        ></span>
                      </button>
                    </div>
                  </div>
                  <div className="body">
                    <ul className="nav nav-tabs-new m-b-20">
                      <li className="nav-item mr-1">
                        <Link to="#"
                          className={`nav-link ${tab[0] && "active"}`}
                          onClick={() => {
                            this.setState({ tab: [true, false, false] });
                          }}
                        >
                          Web
                        </Link>
                      </li>
                      <li className="nav-item mr-1">
                        <Link to="#"
                          className={`nav-link ${tab[1] && "active"}`}
                          onClick={() => {
                            this.setState({ tab: [false, true, false] });
                          }}
                        >
                          Images
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="#"
                          className={`nav-link ${tab[2] && "active"}`}
                          onClick={() => {
                            this.setState({ tab: [false, false, true] });
                          }}
                        >
                          Videos
                        </Link>
                      </li>
                    </ul>
                    <p className="m-b-0">
                      Search Result For "Bootstrap 4 admin"
                    </p>
                    <strong> About 16,853 result ( 0.13 seconds)</strong>
                  </div>
                </div>
                <div className="tab-content padding-0">
                  <div className={`tab-pane card ${tab[0] && "active"}`}>
                    <div className="body">
                      <h6 className="mb-0">
                        <Link to="#" target="_blank">
                          sQuare - Bootstrap 4 Light &amp; Dark Admin with Free
                          Angular5 + UI Kit
                        </Link>
                      </h6>
                      <small>
                        https://themeforest.net/user/wraptheme/portfolio
                      </small>
                      <p className="m-t-10">
                        sQuare Admin is Material Design premium admin dashboard
                        theme. It’s builded on popular Twitter Bootstrap4
                        framework. sQuare is fully based on HTML5 + CSS3
                        Standards. Is fully responsive and clean on every device
                        and every browser.
                      </p>
                      <Link to="#" className="m-r-20" target="_blank">
                        AdminCC
                      </Link>
                      <Link to="#" className="m-r-20" target="_blank">
                        Swift Admin
                      </Link>
                    </div>
                    <hr />
                    <div className="body">
                      <h6 className="mb-0">
                        <Link to="#" target="_blank">
                          InfiniO - Bootstrap 4 Admin Dashboard Template{" "}
                        </Link>
                      </h6>
                      <small>
                        https://themeforest.net/user/wraptheme/portfolio
                      </small>
                      <p className="m-t-10">
                        InfiniO is fully professional, responsive, modern,
                        multi-purpose and featured Admin template which can be
                        used to create various website, Admin templates, Admin
                        dashboards, Backend Websites, CMS, CRM or one can aldo
                        build Blog, Business website and time line as well as
                        portfolio. InfiniO Admin makes the development process
                        easy and fast for you and aims to help you implement
                        your idea to real time.
                      </p>
                      <Link to="#" className="m-r-20" target="_blank">
                        Oakleaf Admin
                      </Link>
                      <Link to="#" className="m-r-20" target="_blank">
                        sQuare
                      </Link>
                    </div>
                    <hr />
                    <div className="body">
                      <h6 className="mb-0">
                        <Link to="#" target="_blank">
                          Compass - The ultimate Bootstrap 4 Admin Dashboard{" "}
                        </Link>
                      </h6>
                      <small>
                        https://themeforest.net/user/wraptheme/portfolio
                      </small>
                      <p className="m-t-10">
                        Compass Admin is Material Design premium admin dashboard
                        theme. It’s builded on popular Twitter Bootstrap4
                        framework. Compass is fully based on HTML5 + CSS3
                        Standards. Is fully responsive and clean on every device
                        and every browser.
                      </p>
                      <Link to="#" className="m-r-20" target="_blank">
                        AdminCC
                      </Link>
                      <Link to="#" className="m-r-20" target="_blank">
                        Oakleaf Admin
                      </Link>
                      <Link to="#" className="m-r-20" target="_blank">
                        sQuare
                      </Link>
                    </div>
                    <hr />
                    <div className="body">
                      <h6 className="mb-0">
                        <Link to="#" target="_blank">
                          Alpino - Bootstrap 4 Admin Dashboard Template
                        </Link>
                      </h6>
                      <small>
                        https://themeforest.net/user/wraptheme/portfolio
                      </small>
                      <p className="m-t-10">
                        15+ Dashboard, 100+ Integrated Plugins, 400+ Pages,
                        Light and Dark Menu, The Multistep Form, Timeline view,
                        Summermnote Editor, Image Cropping Tool, Easy to access
                        Menu Styles
                      </p>
                      <Link to="#" className="m-r-20" target="_blank">
                        Oakleaf Admin
                      </Link>
                      <Link to="#" className="m-r-20" target="_blank">
                        sQuare
                      </Link>
                      <Link to="#" className="m-r-20" target="_blank">
                        AdminCC
                      </Link>
                    </div>
                    <hr />
                    <ul className="body pagination pagination-primary">
                      <li className="page-item">
                        <Link to="#" className="page-link">Previous</Link>
                      </li>
                      <li className="page-item active">
                        <Link to="#" className="page-link">1</Link>
                      </li>
                      <li className="page-item">
                        <Link to="#" className="page-link">2</Link>
                      </li>
                      <li className="page-item">
                        <Link to="#" className="page-link">3</Link>
                      </li>
                      <li className="page-item">
                        <Link to="#" className="page-link">Next</Link>
                      </li>
                    </ul>
                  </div>
                  <div className={`tab-pane card ${tab[1] && "active"}`}>
                    <div className="body text-center">
                      <div className="not_found">
                        <h4 className="m-b-0">Sorry No result found.</h4>
                      </div>
                    </div>
                  </div>
                  <div className={`tab-pane card ${tab[2] && "active"}`}>
                    <div className="body text-center">
                      <div className="not_found">
                        <h4 className="m-b-0">Sorry No result found.</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ioTReducer }) => ({
  isSecuritySystem: ioTReducer.isSecuritySystem,
});

export default connect(mapStateToProps, {})(SearchResult);
