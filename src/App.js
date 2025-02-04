import React from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import dashboard from "./screens/Dashbord/Dashbord";
import demographic from "./screens/Dashbord/Demographic";
import ioT from "./screens/Dashbord/IoT";
import NavbarMenu from "./components/NavbarMenu";
import appInbox from "./screens/App/Inbox";
import appChat from "./screens/App/Chat";
import appCalendar from "./screens/App/Calendar";
import appContact from "./screens/App/Contact";
import AppTaskbar from "./screens/App/Taskbar";
import PendingTasks from "./screens/App/PendingTasks";
import CompletedTasks from "./screens/App/CompletedTasks";
import CreateTask from "./screens/App/CreateTask";
import TaskBoard from "./screens/App/Taskbar";

import filemanagerdashboard from "./screens/FileManager/Dashboard";
import filedocuments from "./screens/FileManager/Documents";
import filemedia from "./screens/FileManager/Media";
import fileimages from "./screens/FileManager/Images";
import blognewPost from "./screens/Blog/NewPost";
import blogdetails from "./screens/Blog/BlogDetails";
import bloglist from "./screens/Blog/BlogList";
import uitypography from "./screens/UIElements/Typography";
import uitabs from "./screens/UIElements/Tabs";
import uibuttons from "./screens/UIElements/Button";
import bootstrapui from "./screens/UIElements/BootstrapUI";
import uiicons from "./screens/UIElements/Icons";
import uinotifications from "./screens/UIElements/Notifications";
import uicolors from "./screens/UIElements/Colors";
import uilistgroup from "./screens/UIElements/ListGroup";
import uimediaobject from "./screens/UIElements/MediaObject";
import uimodal from "./screens/UIElements/Modals";
import uiprogressbar from "./screens/UIElements/ProgressBar";
import widgetsdata from "./screens/Widgets/Data";
import widgetsweather from "./screens/Widgets/Weather";
import widgetsblog from "./screens/Widgets/Blog";
import widgetsecommers from "./screens/Widgets/ECommers";
import registration from "./screens/Auth/Registration";
import lockscreen from "./screens/Auth/Lockscreen";
import forgotpassword from "./screens/Auth/ForgotPassword";
import page404 from "./screens/Auth/Page404";
import page403 from "./screens/Auth/Page403";
import page500 from "./screens/Auth/Page500";
import page503 from "./screens/Auth/Page503";
import blankpage from "./screens/Pages/BlankPage";
import profilev1page from "./screens/Pages/ProfileV1";
import profilev2page from "./screens/Pages/ProfileV2";
import imagegalleryprofile from "./screens/Pages/ImageGallery";
import timeline from "./screens/Pages/TimeLine";
import pricing from "./screens/Pages/Pricing";
import invoices from "./screens/Pages/Invoices";
import invoicesv2 from "./screens/Pages/InvoicesV2";
import searchresult from "./screens/Pages/SearchResults";
import helperclass from "./screens/Pages/HelperClass";
import teamsboard from "./screens/Pages/TeamsBoard";
import projectslist from "./screens/Pages/ProjectsList";
import maintanance from "./screens/Pages/Maintanance";
import testimonials from "./screens/Pages/Testimonials";
import faqs from "./screens/Pages/Faqs";
import formvalidation from "./screens/Forms/FormValidation";
import basicelements from "./screens/Forms/BasicElements";
import tablenormal from "./screens/Tables/TableNormal";
import echart from "./screens/Charts/Echart";
import leafletmap from "./screens/Maps/GoogleMaps";
import Profile from "./page_components/profile/Profile";
import EntityMaster from "./page_components/masters/Entity/EntityMaster";
import ShowEntities from "./page_components/masters/Entity/ShowEntities";
import ViewEntity from "./page_components/masters/Entity/ViewEntity";
import ShowCategories from "./page_components/masters/Category/ShowCategories";
import AddCategory from "./page_components/masters/Category/AddCategory";
import AddParty from "./page_components/masters/Party/AddParty";
import ShowParties from "./page_components/masters/Party/ShowParties";
import ViewParty from "./page_components/masters/Party/ViewParty";
import CreateUsers from "./page_components/masters/Users/CreateUsers";
import ShowUsers from "./page_components/masters/Users/ShowUsers";
import ViewUsers from "./page_components/masters/Users/ViewUsers";
import OtherMasters from "./page_components/masters/Others/OtherMasters";
import ShowOtherMasters from "./page_components/masters/Others/ShowOtherMasters";
import TaskTemplateList from "./page_components/masters/Task/TaskTemplateList";
// import ViewOtherMasters from "./page_components/masters/Others/ViewOtherMasters";

// Import Review Components
import PendingReviews from "./screens/App/PendingReviews";
import CompletedReviews from "./screens/App/CompletedReviews";

// Import Payment Components
import AllInvoices from "./screens/App/AllInvoices";
import PendingPayments from "./screens/App/PendingPayments";
import CompletedPayments from "./screens/App/CompletedPayments";
import PaymentHistory from "./screens/App/PaymentHistory";

window.__DEV__ = true;

class App extends React.Component {
  constructor(props) {
    console.warn = () => {}
    super(props);
    this.state = {
      isLoad: true,
    };
  }

  render() {
    var res = window.location.pathname;
    var baseUrl = process.env.PUBLIC_URL;
    baseUrl = baseUrl.split("/");
    res = res.split("/");
    res = res.length > 0 ? res[baseUrl.length] : "/";
    res = res ? res : "/";
    const activeKey1 = res;

    return (
      <div id="wrapper">
        {activeKey1 === "" ||
        activeKey1 === "/" ||
        activeKey1 === "login" ||
        activeKey1 === "registration" ||
        activeKey1 === "lockscreen" ||
        activeKey1 === "forgotpassword" ||
        activeKey1 === "page404" ||
        activeKey1 === "page403" ||
        activeKey1 === "page500" ||
        activeKey1 === "page503" ||
        activeKey1 === "maintanance" ? (
          <Routes>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/`}
              element={<Login />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/login`}
              element={<Login />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/forgotpassword`}
              element={<forgotpassword />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/page404`}
              element={<page404 />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/page403`}
              element={<page403 />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/page500`}
              element={<page500 />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/page503`}
              element={<page503 />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/registration`}
              element={<registration />}
            />
            <Route
              exact
              path={`registration`}
              element={<registration />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/lockscreen`}
              element={<lockscreen />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/maintanance`}
              element={<maintanance />}
            />
          </Routes>
        ) : (
          <>
            <NavbarMenu activeKey={activeKey1} />
            <div id="main-content">
              <Routes>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/dashboard`}
                  element={<dashboard />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/demographic`}
                  element={<demographic />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/ioT`}
                  element={<ioT />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/myprofile`}
                  element={<Profile />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/showentities`}
                  element={<ShowEntities />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/entitymaster`}
                  element={<EntityMaster />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/viewentity/:id`}
                  element={<ViewEntity />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/showcategories`}
                  element={<ShowCategories />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/categorymaster`}
                  element={<AddCategory />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/viewparty/:id`}
                  element={<ViewParty />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/showparties`}
                  element={<ShowParties />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/partymaster`}
                  element={<AddParty />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/createusers`}
                  element={<CreateUsers />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/showusers`}
                  element={<ShowUsers />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/viewusers/:id`}
                  element={<ViewUsers />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/othermasters`}
                  element={<OtherMasters />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/showothermasters`}
                  element={<ShowOtherMasters />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/tasktemplates`}
                  element={<TaskTemplateList />}
                />
                {/* <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/viewothermasters`}
                  element={<ViewOtherMasters />}
                /> */}
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/appinbox`}
                  element={<appInbox />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/appchat`}
                  element={<appChat />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/appcalendar`}
                  element={<appCalendar />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/appcontact`}
                  element={<appContact />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/apptaskbar`}
                  element={<AppTaskbar />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/pendingtasks`}
                  element={<PendingTasks />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/createtask`}
                  element={<CreateTask />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/taskboard`}
                  element={<TaskBoard />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/completedtasks`}
                  element={<CompletedTasks />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/filemanagerdashboard`}
                  element={<filemanagerdashboard />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/filedocuments`}
                  element={<filedocuments />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/filemedia`}
                  element={<filemedia />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/fileimages`}
                  element={<fileimages />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/blognewpost`}
                  element={<blognewPost />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/blogdetails`}
                  element={<blogdetails />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/bloglist`}
                  element={<bloglist />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/uitypography`}
                  element={<uitypography />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/uitabs`}
                  element={<uitabs />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/bootstrapui`}
                  element={<bootstrapui />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/uiicons`}
                  element={<uiicons />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/uinotifications`}
                  element={<uinotifications />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/uicolors`}
                  element={<uicolors />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/uilistgroup`}
                  element={<uilistgroup />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/uimediaobject`}
                  element={<uimediaobject />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/uimodal`}
                  element={<uimodal />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/uibuttons`}
                  element={<uibuttons />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/uiprogressbar`}
                  element={<uiprogressbar />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/widgetsdata`}
                  element={<widgetsdata />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/widgetsweather`}
                  element={<widgetsweather />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/widgetsblog`}
                  element={<widgetsblog />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/widgetsecommers`}
                  element={<widgetsecommers />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/blankpage`}
                  element={<blankpage />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/profilev1page`}
                  element={<profilev1page />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/profilev2page`}
                  element={<profilev2page />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/imagegalleryprofile`}
                  element={<imagegalleryprofile />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/timeline`}
                  element={<timeline />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/pricing`}
                  element={<pricing />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/invoices`}
                  element={<invoices />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/invoicesv2`}
                  element={<invoicesv2 />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/searchresult`}
                  element={<searchresult />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/helperclass`}
                  element={<helperclass />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/teamsboard`}
                  element={<teamsboard />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/projectslist`}
                  element={<projectslist />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/testimonials`}
                  element={<testimonials />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/faqs`}
                  element={<faqs />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/formvalidation`}
                  element={<formvalidation />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/basicelements`}
                  element={<basicelements />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/tablenormal`}
                  element={<tablenormal />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/echart`}
                  element={<echart />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/leafletmap`}
                  element={<leafletmap />}
                />
                {/* Review Routes */}
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/pendingreviews`}
                  element={<PendingReviews />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/completedreviews`}
                  element={<CompletedReviews />}
                />
                {/* Payment Routes */}
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/allinvoices`}
                  element={<AllInvoices />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/pendingpayments`}
                  element={<PendingPayments />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/completedpayments`}
                  element={<CompletedPayments />}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/paymenthistory`}
                  element={<PaymentHistory />}
                />
              </Routes>
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ loginReducer }) => ({});

export default connect(mapStateToProps, {})(App);
