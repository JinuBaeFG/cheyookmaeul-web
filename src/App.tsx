import { ApolloProvider, useReactiveVar } from "@apollo/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import SignUp from "./screens/SignUp";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import BannerList from "./screens/banner/BannerList";
import Board from "./screens/board/Board";
import AdminNotice from "./screens/board/AdminNotice";
import AddAdminNotice from "./screens/board/AddAdminNotice";
import AddBanner from "./screens/banner/AddBanner";
import BannerDetail from "./screens/banner/BannerDetail";
import EditBanner from "./screens/banner/EditBanner";
import EditAdminNotice from "./screens/board/EditAdminNotice";
import AdminNoticeDetail from "./screens/board/AdminNoticeDetail";
import AdminFaq from "./screens/board/AdminFaq";
import AddAdminFaq from "./screens/board/AddAdminFaq";
import AdminFaqDetail from "./screens/board/AdminFaqDetail";
import EditAdminFaq from "./screens/board/EditAdminFaq";
import AdminCategory from "./screens/category/AdminCategory";
import FacilityList from "./screens/facility/FacilityList";
import FacilityDetail from "./screens/facility/FacilityDetail";
import EditFacility from "./screens/facility/EditFacility";
import AddFacility from "./screens/facility/AddFacility";
import ContestList from "./screens/contest/ContestList";
import CreateContest from "./screens/contest/CreateContest";
import EditContest from "./screens/contest/EditContest";
import ContestUserList from "./screens/contest/ContestUserList";
import CreateContestUser from "./screens/contest/CreateContestUser";
import EditContestUser from "./screens/contest/EditContestUser";
import ContestGroupList from "./screens/contest/ContestGroupList";
import ContestGroupMatch from "./screens/contest/ContestGroupMatch";
import ContestCourtList from "./screens/contest/ContestCourtList";
import ContestMatchManagement from "./screens/contest/ContestMatchManagement";
import ContestGroupMatchByCourt from "./screens/contest/ContestGroupMatchByCourt";
import ContestNotice from "./screens/contest/ContestNotice";
import ContestReport from "./screens/contest/ContestReport";
import CreateContestNotice from "./screens/contest/CreateContestNotices";
import EditContestNotice from "./screens/contest/EditContestNotice";
import CreateContestReport from "./screens/contest/CreateContestReport";
import EditContestReport from "./screens/contest/EditContestReport";

const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Routes>
              <Route
                path="/home"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route path="/board">
                <Route
                  path="main"
                  element={
                    <Layout>
                      <Board />
                    </Layout>
                  }
                />
              </Route>
              <Route path="/contest">
                <Route
                  path="/contest"
                  element={<Navigate replace to="/contest/contestList" />}
                />
                <Route
                  path="contestList"
                  element={
                    <Layout>
                      <ContestList />
                    </Layout>
                  }
                />
                <Route
                  path="createContest"
                  element={
                    <Layout>
                      <CreateContest />
                    </Layout>
                  }
                />
                <Route
                  path="editContest"
                  element={
                    <Layout>
                      <EditContest />
                    </Layout>
                  }
                />
                <Route
                  path="contestCourtList"
                  element={
                    <Layout>
                      <ContestCourtList />
                    </Layout>
                  }
                />
                <Route
                  path="contestUserList"
                  element={
                    <Layout>
                      <ContestUserList />
                    </Layout>
                  }
                />
                <Route
                  path="createContestUser"
                  element={
                    <Layout>
                      <CreateContestUser />
                    </Layout>
                  }
                />
                <Route
                  path="editContestUser"
                  element={
                    <Layout>
                      <EditContestUser />
                    </Layout>
                  }
                />
                <Route
                  path="contestGroupList"
                  element={
                    <Layout>
                      <ContestGroupList />
                    </Layout>
                  }
                />
                <Route
                  path="contestGroupMatch"
                  element={
                    <Layout>
                      <ContestGroupMatch />
                    </Layout>
                  }
                />
                <Route
                  path="contestManagement"
                  element={
                    <Layout>
                      <ContestMatchManagement />
                    </Layout>
                  }
                />
                <Route
                  path="contestGroupMatchByCourt"
                  element={
                    <Layout>
                      <ContestGroupMatchByCourt />
                    </Layout>
                  }
                />
                <Route
                  path="contestNotice"
                  element={
                    <Layout>
                      <ContestNotice />
                    </Layout>
                  }
                />
                <Route
                  path="createContestNotice"
                  element={
                    <Layout>
                      <CreateContestNotice />
                    </Layout>
                  }
                />
                <Route
                  path="contestNoticeDetail"
                  element={
                    <Layout>
                      <EditContestNotice />
                    </Layout>
                  }
                />
                <Route
                  path="contestReport"
                  element={
                    <Layout>
                      <ContestReport />
                    </Layout>
                  }
                />
                <Route
                  path="createContestReport"
                  element={
                    <Layout>
                      <CreateContestReport />
                    </Layout>
                  }
                />
                <Route
                  path="contestReportDetail"
                  element={
                    <Layout>
                      <EditContestReport />
                    </Layout>
                  }
                />
              </Route>

              <Route path="/adminnotice">
                <Route
                  path=""
                  element={
                    <Layout>
                      <AdminNotice />
                    </Layout>
                  }
                />
                <Route
                  path="addadminnotice"
                  element={
                    <Layout>
                      <AddAdminNotice />
                    </Layout>
                  }
                />
                <Route
                  path="adminNoticeDetail"
                  element={
                    <Layout>
                      <AdminNoticeDetail />
                    </Layout>
                  }
                />
                <Route
                  path="editAdminNotice"
                  element={
                    <Layout>
                      <EditAdminNotice />
                    </Layout>
                  }
                />
              </Route>

              <Route path="/adminfaq">
                <Route
                  path=""
                  element={
                    <Layout>
                      <AdminFaq />
                    </Layout>
                  }
                />
                <Route
                  path="addadminfaq"
                  element={
                    <Layout>
                      <AddAdminFaq />
                    </Layout>
                  }
                />
                <Route
                  path="adminFaqDetail"
                  element={
                    <Layout>
                      <AdminFaqDetail />
                    </Layout>
                  }
                />
                <Route
                  path="editAdminFaq"
                  element={
                    <Layout>
                      <EditAdminFaq />
                    </Layout>
                  }
                />
              </Route>

              <Route path="/banner">
                <Route
                  path="/banner"
                  element={<Navigate replace to="/banner/bannerList" />}
                />
                <Route
                  path="bannerList"
                  element={
                    <Layout>
                      <BannerList />
                    </Layout>
                  }
                />
                <Route
                  path="bannerDetail"
                  element={
                    <Layout>
                      <BannerDetail />
                    </Layout>
                  }
                />
                <Route
                  path="editBanner"
                  element={
                    <Layout>
                      <EditBanner />
                    </Layout>
                  }
                />
                <Route
                  path="addbanner"
                  element={
                    <Layout>
                      <AddBanner />
                    </Layout>
                  }
                />
              </Route>

              <Route
                path="category"
                element={
                  <Layout>
                    <AdminCategory />
                  </Layout>
                }
              />

              <Route path="/facility">
                <Route
                  path="facilityList"
                  element={
                    <Layout>
                      <FacilityList />
                    </Layout>
                  }
                />
                <Route
                  path="facilityDetail"
                  element={
                    <Layout>
                      <FacilityDetail />
                    </Layout>
                  }
                />
                <Route
                  path="editFacility"
                  element={
                    <Layout>
                      <EditFacility />
                    </Layout>
                  }
                />
                <Route
                  path="addFacility"
                  element={
                    <Layout>
                      <AddFacility />
                    </Layout>
                  }
                />
              </Route>

              <Route
                path="*"
                element={
                  <Layout>
                    <NotFound />
                  </Layout>
                }
              />
            </Routes>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
};

export default App;
