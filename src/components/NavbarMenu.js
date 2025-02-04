import React from "react";
import { Dropdown, Nav, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  onPressDashbord,
  onPressDashbordChild,
  onPressThemeColor,
  onPressGeneralSetting,
  onPressNotification,
  onPressEqualizer,
  onPressSideMenuToggle,
  onPressMenuProfileDropdown,
  onPressSideMenuTab,
  tostMessageLoad,
} from "../actions";
import Logo from "../assets/images/A-logo-dark.png";
import LogoWhite from "../assets/images/A-logo-white.png";
import UserImage from "../assets/images/profile-pic.jpg";
import Avatar4 from "../assets/images/xs/avatar4.jpg";
import Avatar5 from "../assets/images/xs/avatar5.jpg";
import Avatar2 from "../assets/images/xs/avatar2.jpg";
import Avatar1 from "../assets/images/xs/avatar1.jpg";
import Avatar3 from "../assets/images/xs/avatar3.jpg";

class NavbarMenu extends React.Component {
  state = {
    linkupdate: false,
    selectedItem: "Select Financial Year"
  };
  componentDidMount() {
    this.props.tostMessageLoad(true);
    const { activeKey } = this.props;
    this.activeMenutabwhenNavigate("/" + activeKey);
  }

  activeMenutabwhenNavigate(activeKey) {
    if (
      activeKey === "/dashboard" ||
      activeKey === "/demographic" ||
      activeKey === "/ioT"
    ) {
      this.activeMenutabContainer("dashboradContainer");
    } else if (
      activeKey === "/showentities" ||
      activeKey === "/entitymaster" ||
      activeKey === "/viewentity" ||
      activeKey === "/categorymaster" ||
      activeKey === "/showcategories" ||
      activeKey === "/showparties" ||
      activeKey === "/createusers" ||
      activeKey === "/showusers" ||
      activeKey === "/viewusers" ||
      activeKey === "/othermasters" ||
      activeKey === "/showothermasters" ||
      activeKey === "/viewothermasters" ||
      activeKey === "/viewparty" ||
      activeKey === "/partymaster"
    ) {
      this.activeMenutabContainer("MastersContainer");
    } else if (
      activeKey === "apptaskbar" ||
      activeKey === "pendingtasks" ||
      activeKey === "completedtasks"
    ) {
      this.activeMenutabContainer("TasksContainer");
    } else if (
      activeKey === "/pendingreviews" ||
      activeKey === "/completedreviews"
    ) {
      this.activeMenutabContainer("ReviewContainer");
    } else if (
      activeKey === "/allinvoices" ||
      activeKey === "/pendingpayments" ||
      activeKey === "/completedpayments" ||
      activeKey === "/paymenthistory"
    ) {
      this.activeMenutabContainer("PaymentsContainer");
    } else {
      // this.activeMenutabContainer("dashboradContainer");
    }
  }

  // componentWillReceiveProps(){
  //   this.setState({
  //     linkupdate:!this.state.linkupdate
  //   })
  // }

  activeMenutabContainer(id) {
    var parents = document.getElementById("main-menu");
    var activeMenu = document.getElementById(id);

    for (let index = 0; index < parents.children.length; index++) {
      if (parents.children[index].id !== id) {
        parents.children[index].classList.remove("active");
        parents.children[index].children[1].classList.remove("in");
      }
    }
    setTimeout(() => {
      activeMenu.classList.toggle("active");
      activeMenu.children[1].classList.toggle("in");
    }, 10);
  }
  render() {
    const {
      addClassactive,
      addClassactiveChildAuth,
      addClassactiveChildMaps,
      themeColor,
      toggleNotification,
      toggleEqualizer,
      sideMenuTab,
      isToastMessage,
      activeKey,
    } = this.props;
    document.body.classList.add(themeColor);

    return (
      <div>
        {isToastMessage ? (
          <Toast
            id="toast-container"
            show={isToastMessage}
            onClose={() => {
              this.props.tostMessageLoad(false);
            }}
            className="toast-info toast-top-right"
            autohide={true}
            delay={5000}
          >
            <Toast.Header className="toast-info mb-0">
              Hello, welcome to ABC Track, a unique website.
            </Toast.Header>
          </Toast>
        ) : null}
        <nav className="navbar navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-btn">
              <button
                className="btn-toggle-offcanvas"
                onClick={() => {
                  this.props.onPressSideMenuToggle();
                }}
              >
                <i className="lnr lnr-menu fa fa-bars"></i>
              </button>
            </div>

            <div className="navbar-brand">
              <a href="dashboard" style={{ position: "relative" }}>
                {/* <img
                  src={
                    document.body.classList.contains("full-dark")
                      ? LogoWhite
                      : Logo
                  }
                  alt="Lucid Logo"
                  className="img-responsive logo"
                /> */}
                <img
                  src={
                    document.body.classList.contains("full-dark")
                      ? LogoWhite
                      : Logo
                  }
                  alt="ABC Track Logo"
                  style={{ height: "25px", width: "23px" }}
                  className="img-responsive logo"
                />
                <p
                  style={
                    document.body.classList.contains("full-dark")
                      ? { display: "inline", margin: "0px 0px 0px 6px", color: "#fff" }
                      : { display: "inline", margin: "0px 0px 0px 6px", color: "#444" }
                  }
                >
                  ABC Track
                </p>
              </a>
            </div>

            <div className="navbar-right">
              {/* <form id="navbar-search" className="navbar-form search-form">
                <input
                  className="form-control"
                  placeholder="Search here..."
                  type="text"
                />
                <button type="button" className="btn btn-default">
                  <i className="icon-magnifier"></i>
                </button>
              </form> */}
              <form id="navbar-search" className="navbar-form search-form">
                <select
                  className="form-control"
                >
                  <option value="SELECT FINANCIAL YEAR">SELECT FINANCIAL YEAR</option>
                  <option value="2023-2024">2023-2024</option>
                  <option value="2024-2025">2024-2025</option>
                </select>
              </form>

              {/* <Dropdown>
                <Dropdown.Toggle
                  variant="primary"
                  id="dropdown-basic"
                  // className="user-name"
                >
                 {this.state.selectedItem ? <strong>{this.state.selectedItem}</strong> : <strong>Select Financial Year</strong>}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu">
                  <Dropdown.Item name="2023-2024" onClick = {(e) => {
                    this.setState({selectedItem: e.target.value })
                  }}>
                    2023-2024
                  </Dropdown.Item>
                  <Dropdown.Item name="2024-2025">
                    2024-2025
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}

              <div id="navbar-menu">
                <ul className="nav navbar-nav">
                  <li>
                    <a
                      href="filedocuments"
                      className="icon-menu d-none d-sm-block d-md-none d-lg-block"
                    >
                      <i className="fa fa-folder-open-o"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="appcalendar"
                      className="icon-menu d-none d-sm-block d-md-none d-lg-block"
                    >
                      <i className="icon-calendar"></i>
                    </a>
                  </li>
                  <li>
                    <a href="appchat" className="icon-menu d-none d-sm-block">
                      <i className="icon-bubbles"></i>
                    </a>
                  </li>
                  <li>
                    <a href="appinbox" className="icon-menu d-none d-sm-block">
                      <i className="icon-envelope"></i>
                      <span className="notification-dot"></span>
                    </a>
                  </li>
                  <li
                    className={
                      toggleNotification ? "show dropdown" : "dropdown"
                    }
                  >
                    <a
                      href="#!"
                      className="dropdown-toggle icon-menu"
                      data-toggle="dropdown"
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.onPressNotification();
                      }}
                    >
                      <i className="icon-bell"></i>
                      <span className="notification-dot"></span>
                    </a>
                    <ul
                      className={
                        toggleNotification
                          ? "dropdown-menu notifications show"
                          : "dropdown-menu notifications"
                      }
                    >
                      <li className="header">
                        <strong>You have 4 new Notifications</strong>
                      </li>
                      <li>
                        <Link to="#">
                          <div className="media">
                            <div className="media-left">
                              <i className="icon-info text-warning"></i>
                            </div>
                            <div className="media-body">
                              <p className="text">
                                Campaign <strong>Holiday Sale</strong> is nearly
                                reach budget limit.
                              </p>
                              <span className="timestamp">10:00 AM Today</span>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <div className="media">
                            <div className="media-left">
                              <i className="icon-like text-success"></i>
                            </div>
                            <div className="media-body">
                              <p className="text">
                                Your New Campaign <strong>Holiday Sale</strong>{" "}
                                is approved.
                              </p>
                              <span className="timestamp">11:30 AM Today</span>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <div className="media">
                            <div className="media-left">
                              <i className="icon-pie-chart text-info"></i>
                            </div>
                            <div className="media-body">
                              <p className="text">
                                Website visits from Twitter is 27% higher than
                                last week.
                              </p>
                              <span className="timestamp">04:00 PM Today</span>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <div className="media">
                            <div className="media-left">
                              <i className="icon-info text-danger"></i>
                            </div>
                            <div className="media-body">
                              <p className="text">
                                Error on website analytics configurations
                              </p>
                              <span className="timestamp">Yesterday</span>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li className="footer">
                        <Link to="#" className="more">See all notifications</Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={toggleEqualizer ? "show dropdown" : "dropdown"}
                  >
                    <a
                      href="#!"
                      className="dropdown-toggle icon-menu"
                      data-toggle="dropdown"
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.onPressEqualizer();
                      }}
                    >
                      <i className="icon-equalizer"></i>
                    </a>
                    <ul
                      className={
                        toggleEqualizer
                          ? "dropdown-menu user-menu menu-icon show"
                          : "dropdown-menu user-menu menu-icon"
                      }
                    >
                      <li className="menu-heading">ACCOUNT SETTINGS</li>
                      <li>
                        <Link to="#">
                          <i className="icon-note"></i> <span>Basic</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="icon-equalizer"></i>{" "}
                          <span>Preferences</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="icon-lock"></i> <span>Privacy</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="icon-bell"></i>{" "}
                          <span>Notifications</span>
                        </Link>
                      </li>
                      <li className="menu-heading">BILLING</li>
                      <li>
                        <Link to="#">
                          <i className="icon-credit-card"></i>{" "}
                          <span>Payments</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="icon-printer"></i> <span>Invoices</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="icon-refresh"></i> <span>Renewals</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="login" className="icon-menu">
                      <i className="icon-login"></i>
                    </a>
                  </li>
                  <li>
                    <button 
                      type="button" 
                      className="btn btn-info mr-1"
                      onClick={() => window.open('https://www.wrraptheme.com/templates/lucid/react/dashboard', '_blank')}
                    >
                      <i className="fa fa-external-link"></i> Theme Templates
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <div id="left-sidebar" className="sidebar" style={{ zIndex: 9 }}>
          <div className="sidebar-scroll">
            <div className="user-account">
              <img
                src={UserImage}
                className="rounded-circle user-photo"
                alt="User Profile"
              />
              <Dropdown>
                <span>Welcome,</span>
                <Dropdown.Toggle
                  variant="none"
                  as="a"
                  id="dropdown-basic"
                  className="user-name"
                >
                  <strong>Alizee Thomas</strong>
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-right account">
                  <Dropdown.Item href="myprofile">
                    <i className="icon-user"></i>My Profile
                  </Dropdown.Item>
                  <Dropdown.Item href="appinbox">
                    {" "}
                    <i className="icon-envelope-open"></i>Messages
                  </Dropdown.Item>
                  <Dropdown.Item>
                    {" "}
                    <i className="icon-settings"></i>Settings
                  </Dropdown.Item>
                  <li className="divider"></li>
                  <Dropdown.Item href="login">
                    {" "}
                    <i className="icon-power"></i>Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* <hr /> */}
              {/* <ul className="row list-unstyled">
                <li className="col-4">
                  <small>Sales</small>
                  <h6>456</h6>
                </li>
                <li className="col-4">
                  <small>Order</small>
                  <h6>1350</h6>
                </li>
                <li className="col-4">
                  <small>Revenue</small>
                  <h6>₹2.13B</h6>
                </li>
              </ul> */}
            </div>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link
                  to="#"
                  className={sideMenuTab[0] ? "nav-link active" : "nav-link"}
                  data-toggle="tab"
                  onClick={() => {
                    this.props.onPressSideMenuTab(0);
                  }}
                >
                  Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="#"
                  className={sideMenuTab[1] ? "nav-link active" : "nav-link"}
                  data-toggle="tab"
                  onClick={() => {
                    this.props.onPressSideMenuTab(1);
                  }}
                >
                  <i className="icon-book-open"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="#"
                  className={sideMenuTab[2] ? "nav-link active" : "nav-link"}
                  data-toggle="tab"
                  onClick={() => {
                    this.props.onPressSideMenuTab(2);
                  }}
                >
                  <i className="icon-settings"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="#"
                  className={sideMenuTab[3] ? "nav-link active" : "nav-link"}
                  data-toggle="tab"
                  onClick={() => {
                    this.props.onPressSideMenuTab(3);
                  }}
                >
                  <i className="icon-question"></i>
                </Link>
              </li>
            </ul>
            <div className="tab-content p-l-0 p-r-0">
              <div
                className={sideMenuTab[0] ? "tab-pane active show" : "tab-pane"}
                id="menu"
              >
                <Nav id="left-sidebar-nav" className="sidebar-nav">
                  <ul id="main-menu" className="metismenu">
                    <li className="" id="dashboradContainer">
                      <a
                        href="#!"
                        className="has-arrow"
                        onClick={(e) => {
                          e.preventDefault();
                          this.activeMenutabContainer("dashboradContainer");
                        }}
                      >
                        <i className="icon-home"></i> <span>Dashboard</span>
                      </a>
                      <ul className="collapse">
                        <li
                          className={activeKey === "dashboard" ? "active" : ""}
                        >
                          <Link to="dashboard">Analytical</Link>
                        </li>
                        <li
                          className={
                            activeKey === "demographic" ? "active" : ""
                          }
                        >
                          <Link to="demographic">Demographic</Link>
                        </li>
                        <li className={activeKey === "ioT" ? "active" : ""}>
                          <Link to="ioT">IoT</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="" id="TasksContainer">
                      <a
                        href="#!"
                        className="has-arrow"
                        onClick={(e) => {
                          e.preventDefault();
                          this.activeMenutabContainer("TasksContainer");
                        }}
                      >
                        <i className="fa fa-tasks"></i> <span>Task</span>
                      </a>
                      <ul className="collapse">
                      <li
                          className={activeKey === "createtask" ? "active" : ""}
                        >
                          <Link to="createtask">Create Task</Link>
                        </li>
                        <li
                          className={activeKey === "apptaskbar" ? "active" : ""}
                        >
                          <Link to="apptaskbar">Create Assignment</Link>
                        </li>
                        <li
                          className={activeKey === "pendingtasks" ? "active" : ""}
                        >
                          <Link to="/pendingtasks">Pending Tasks</Link>
                        </li>
                        <li
                          className={activeKey === "completedtasks" ? "active" : ""}
                        >
                          <Link to="completedtasks">Completed Tasks</Link>
                        </li>
                      </ul>
                    </li>
                    <li id="ReviewContainer">
                      <a
                        href="#!"
                        className="has-arrow"
                        onClick={(e) => {
                          e.preventDefault();
                          this.activeMenutabContainer("ReviewContainer");
                        }}
                      >
                        <i className="fa fa-star"></i> <span>Review</span>
                      </a>
                      <ul className="collapse">
                        <li className={activeKey === "/pendingreviews" ? "active" : ""}>
                          <Link to="/pendingreviews">
                            Pending Reviews
                          </Link>
                        </li>
                        <li className={activeKey === "/completedreviews" ? "active" : ""}>
                          <Link to="/completedreviews">
                            Completed Reviews
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="" id="PaymentsContainer">
                      <a
                        href="#!"
                        className="has-arrow"
                        onClick={(e) => {
                          e.preventDefault();
                          this.activeMenutabContainer("PaymentsContainer");
                        }}
                      >
                        <i className="fa fa-money"></i> <span>Payments</span>
                      </a>
                      <ul className="collapse">
                        <li className={activeKey === "/allinvoices" ? "active" : ""}>
                          <Link to="/allinvoices">
                            All Invoices
                          </Link>
                        </li>
                        <li className={activeKey === "/pendingpayments" ? "active" : ""}>
                          <Link to="/pendingpayments">
                            Pending Payments
                          </Link>
                        </li>
                        <li className={activeKey === "/completedpayments" ? "active" : ""}>
                          <Link to="/completedpayments">
                            Completed Payments
                          </Link>
                        </li>
                        <li className={activeKey === "/paymenthistory" ? "active" : ""}>
                          <Link to="/paymenthistory">
                            Payment History
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li id="MastersContainer" className="">
                      <a
                        href="#!"
                        className="has-arrow"
                        onClick={(e) => {
                          e.preventDefault();
                          this.activeMenutabContainer("MastersContainer");
                        }}
                      >
                        <i className="icon-grid"></i> <span>Masters</span>
                      </a>
                      <ul className="collapse">
                        <li
                          className={activeKey === "entitymaster" || activeKey === "showentities" || activeKey === "viewentity" ? "active" : ""}
                          onClick={() => { }}
                        >
                          <Link to="showentities">Entity Master</Link>
                        </li>
                        <li
                          className={activeKey === "categorymaster" || activeKey === "showcategories" ? "active" : ""}
                          onClick={() => { }}
                        >
                          <Link to="showcategories">Category Master</Link>
                        </li>
                        <li
                          className={activeKey === "partymaster" || activeKey === "showparties" || activeKey === "viewparty" ? "active" : ""}
                          onClick={() => { }}
                        >
                          <Link to="showparties">Party Master</Link>
                        </li>
                        <li
                          className={activeKey === "createusers" || activeKey === "viewusers" || activeKey === "showusers" ? "active" : ""}
                          onClick={() => { }}
                        >
                          <Link to="showusers">Users Master</Link>
                        </li>
                        <li
                          className={activeKey === "othermasters" || activeKey === "showothermasters" || activeKey === "showothermasters" ? "active" : ""}
                          onClick={() => { }}
                        >
                          <Link to="showothermasters">Others Master</Link>
                        </li>
                        <li
                          className={activeKey === "tasktemplates" ? "active" : ""}
                          onClick={() => { }}
                        >
                          <Link to="tasktemplates">Task Templates</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </Nav>
              </div>
              <div
                className={
                  sideMenuTab[1]
                    ? "tab-pane p-l-15 p-r-15 show active"
                    : "tab-pane p-l-15 p-r-15"
                }
                id="Chat"
              >
                <form>
                  <div className="input-group m-b-20">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="icon-magnifier"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                    />
                  </div>
                </form>
                <ul className="right_chat list-unstyled">
                  <li className="online">
                    <Link to="#">
                      <div className="media">
                        <img className="media-object " src={Avatar4} alt="" />
                        <div className="media-body">
                          <span className="name">Chris Fox</span>
                          <span className="message">Designer, Blogger</span>
                          <span className="badge badge-outline status"></span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="online">
                    <Link to="#">
                      <div className="media">
                        <img className="media-object " src={Avatar5} alt="" />
                        <div className="media-body">
                          <span className="name">Joge Lucky</span>
                          <span className="message">Java Developer</span>
                          <span className="badge badge-outline status"></span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="offline">
                    <Link to="#">
                      <div className="media">
                        <div className="media-left">
                          <img className="media-object " src={Avatar2} alt="" />
                        </div>
                        <div className="media-body">
                          <span className="name">Isabella</span>
                          <span className="message">
                            CEO, Thememakker
                          </span>
                          <span className="badge badge-outline status"></span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="offline">
                    <Link to="#">
                      <div className="media">
                        <img className="media-object " src={Avatar1} alt="" />
                        <div className="media-body">
                          <span className="name">Folisise Chosielie</span>
                          <span className="message">
                            Art director, Movie Cut
                          </span>
                          <span className="badge badge-outline status"></span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="online">
                    <Link to="#">
                      <div className="media">
                        <img className="media-object " src={Avatar3} alt="" />
                        <div className="media-body">
                          <span className="name">Alexander</span>
                          <span className="message">
                            Writter, Mag Editor
                          </span>
                          <span className="badge badge-outline status"></span>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className={
                  sideMenuTab[2]
                    ? "tab-pane p-l-15 p-r-15 show active"
                    : "tab-pane p-l-15 p-r-15"
                }
                id="setting"
              >
                <h6>Choose Mode</h6>
                <ul className="choose-skin list-unstyled">
                  <li
                    data-theme="white"
                    className={
                      document.body.classList.contains("full-dark")
                        ? ""
                        : "active"
                    }
                    onClick={() => {
                      this.setState({ somethi: false });
                      document.body.classList.remove("full-dark");
                    }}
                  >
                    <div className="white"></div>
                    <span>Light</span>
                  </li>
                  <li
                    data-theme="black"
                    className={
                      document.body.classList.contains("full-dark")
                        ? "active"
                        : ""
                    }
                    onClick={() => {
                      this.setState({ somethi: true });
                      document.body.classList.add("full-dark");
                    }}
                  >
                    <div className="black"></div>
                    <span>Dark</span>
                  </li>
                </ul>
                <hr />
                <h6>Choose Skin</h6>
                <ul className="choose-skin list-unstyled">
                  <li
                    data-theme="purple"
                    className={themeColor === "theme-purple" ? "active" : ""}
                  >
                    <div
                      className="purple"
                      onClick={() => {
                        if (themeColor !== "theme-purple") {
                          document.body.classList.remove(themeColor);
                        }
                        this.props.onPressThemeColor("purple");
                      }}
                    ></div>
                    <span>Purple</span>
                  </li>
                  <li
                    data-theme="blue"
                    className={themeColor === "theme-blue" ? "active" : ""}
                  >
                    <div
                      className="blue"
                      onClick={() => {
                        if (themeColor !== "theme-blue") {
                          document.body.classList.remove(themeColor);
                        }
                        this.props.onPressThemeColor("blue");
                      }}
                    ></div>
                    <span>Blue</span>
                  </li>
                  <li
                    data-theme="cyan"
                    className={themeColor === "theme-cyan" ? "active" : ""}
                  >
                    <div
                      className="cyan"
                      onClick={() => {
                        if (themeColor !== "theme-cyan") {
                          document.body.classList.remove(themeColor);
                        }
                        this.props.onPressThemeColor("cyan");
                      }}
                    ></div>
                    <span>Cyan</span>
                  </li>
                  <li
                    data-theme="green"
                    className={themeColor === "theme-green" ? "active" : ""}
                  >
                    <div
                      className="green"
                      onClick={() => {
                        if (themeColor !== "theme-green") {
                          document.body.classList.remove(themeColor);
                        }
                        this.props.onPressThemeColor("green");
                      }}
                    ></div>
                    <span>Green</span>
                  </li>
                  <li
                    data-theme="orange"
                    className={themeColor === "theme-orange" ? "active" : ""}
                  >
                    <div
                      className="orange"
                      onClick={() => {
                        if (themeColor !== "theme-orange") {
                          document.body.classList.remove(themeColor);
                        }
                        this.props.onPressThemeColor("orange");
                      }}
                    ></div>
                    <span>Orange</span>
                  </li>
                  <li
                    data-theme="blush"
                    className={themeColor === "theme-blush" ? "active" : ""}
                  >
                    <div
                      className="blush"
                      onClick={() => {
                        if (themeColor !== "theme-blush") {
                          document.body.classList.remove(themeColor);
                        }
                        this.props.onPressThemeColor("blush");
                      }}
                    ></div>
                    <span>Blush</span>
                  </li>
                </ul>
                <hr />
                <h6>General Settings</h6>
                <ul className="setting-list list-unstyled">
                  <li>
                    <label className="fancy-checkbox">
                      <input type="checkbox" name="checkbox" />
                      <span>Report Panel Usag</span>
                    </label>
                  </li>
                  <li>
                    <label className="fancy-checkbox">
                      <input type="checkbox" name="checkbox" />
                      <span>Email Redirect</span>
                    </label>
                  </li>
                  <li>
                    <label className="fancy-checkbox">
                      <input type="checkbox" name="checkbox" />
                      <span>Notifications</span>
                    </label>
                  </li>
                  <li>
                    <label className="fancy-checkbox">
                      <input type="checkbox" name="checkbox" />
                      <span>Auto Updates</span>
                    </label>
                  </li>
                  <li>
                    <label className="fancy-checkbox">
                      <input type="checkbox" name="checkbox" />
                      <span>Offline</span>
                    </label>
                  </li>
                  <li>
                    <label className="fancy-checkbox">
                      <input type="checkbox" name="checkbox" />
                      <span>Location Permission</span>
                    </label>
                  </li>
                </ul>
              </div>
              <div
                className={
                  sideMenuTab[3]
                    ? "tab-pane p-l-15 p-r-15 show active"
                    : "tab-pane p-l-15 p-r-15"
                }
                id="question"
              >
                <form>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="icon-magnifier"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                    />
                  </div>
                </form>
                <ul className="list-unstyled question">
                  <li className="menu-heading">HOW-TO</li>
                  <li>
                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      How to Create Campaign
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Boost Your Sales
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Website Analytics
                    </a>
                  </li>
                  <li className="menu-heading">ACCOUNT</li>
                  <li>
                    <a
                      href="registration"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Cearet New Account
                    </a>
                  </li>
                  <li>
                    <a
                      href="forgotpassword"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Change Password?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Privacy &amp; Policy
                    </a>
                  </li>
                  <li className="menu-heading">BILLING</li>
                  <li>
                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Payment info
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Auto-Renewal
                    </a>
                  </li>
                  <li className="menu-button m-t-30">
                    <a
                      href="#!"
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <i className="icon-question"></i> Need Help?
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NavbarMenu.propTypes = {
  addClassactive: PropTypes.array.isRequired,
  addClassactiveChild: PropTypes.array.isRequired,
  addClassactiveChildApp: PropTypes.array.isRequired,
  addClassactiveChildFM: PropTypes.array.isRequired,
  addClassactiveChildBlog: PropTypes.array.isRequired,
  addClassactiveChildUI: PropTypes.array.isRequired,
  addClassactiveChildWidgets: PropTypes.array.isRequired,
  addClassactiveChildAuth: PropTypes.array.isRequired,
  addClassactiveChildPages: PropTypes.array.isRequired,
  addClassactiveChildForms: PropTypes.array.isRequired,
  addClassactiveChildTables: PropTypes.array.isRequired,
  addClassactiveChildChart: PropTypes.array.isRequired,
  addClassactiveChildMaps: PropTypes.array.isRequired,
  themeColor: PropTypes.string.isRequired,
  generalSetting: PropTypes.array.isRequired,
  toggleNotification: PropTypes.bool.isRequired,
  toggleEqualizer: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ navigationReducer }) => {
  const {
    addClassactive,
    addClassactiveChild,
    addClassactiveChildApp,
    addClassactiveChildFM,
    addClassactiveChildBlog,
    addClassactiveChildUI,
    addClassactiveChildWidgets,
    addClassactiveChildAuth,
    addClassactiveChildPages,
    addClassactiveChildForms,
    addClassactiveChildTables,
    addClassactiveChildChart,
    addClassactiveChildMaps,
    themeColor,
    generalSetting,
    toggleNotification,
    toggleEqualizer,
    menuProfileDropdown,
    sideMenuTab,
    isToastMessage,
  } = navigationReducer;
  return {
    addClassactive,
    addClassactiveChild,
    addClassactiveChildApp,
    addClassactiveChildFM,
    addClassactiveChildBlog,
    addClassactiveChildUI,
    addClassactiveChildWidgets,
    addClassactiveChildAuth,
    addClassactiveChildPages,
    addClassactiveChildForms,
    addClassactiveChildTables,
    addClassactiveChildChart,
    addClassactiveChildMaps,
    themeColor,
    generalSetting,
    toggleNotification,
    toggleEqualizer,
    menuProfileDropdown,
    sideMenuTab,
    isToastMessage,
  };
};

export default connect(mapStateToProps, {
  onPressDashbord,
  onPressDashbordChild,
  onPressThemeColor,
  onPressGeneralSetting,
  onPressNotification,
  onPressEqualizer,
  onPressSideMenuToggle,
  onPressMenuProfileDropdown,
  onPressSideMenuTab,
  tostMessageLoad,
})(NavbarMenu);
