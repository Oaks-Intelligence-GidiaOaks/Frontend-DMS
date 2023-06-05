import axios from "axios";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { EnumeratorForm } from "./pages/enumerator";

import {
  Enumerators,
  Tracker,
  FormResponses,
  Dashboard,
  Profile,
  MasterList,
} from "./pages/team-lead";
import {
  AdminEnumerators,
  AdminTracker,
  AdminFormResponses,
  AdminDashboard,
  AdminProfile,
  AdminMasterList,
  TeamLeads,
  AddTeamLead,
  AdminNewRoute,
} from "./pages/admin";

import TeamLead from "./components/layout/TeamLead";
import AddEnumerator from "./pages/team-lead/AddEnumerator";
import Login from "./pages/Login";
import NewRoute from "./pages/team-lead/NewRoute";
import { EnumeratorFormProvider, useApp, useAuth } from "./context";
import { useState } from "react";
import { base_url } from "./lib/paths";
import Admin from "./components/layout/Admin";
import TeamLeadEnumerator from "./components/TeamLeadEnumerator";

function App() {
  const { user, isLoggedIn } = useAuth();

  // axios configs
  axios.defaults.baseURL = base_url;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.common["Authorization"] = `Bearer ${user?.token}`;

  const identifyRoute = (user) => {
    if (user.role === "enumerator") {
      return <Navigate replace to={"/form"} />;
    }
    if (user.role === "team_lead") {
      return <Navigate replace to={"/home"} />;
    }
  };

  return (
    <Router>
      <div className="h-screen">
        <Routes>
          <Route
            path="/"
            element={isLoggedIn && user ? identifyRoute(user) : <Login />}
          />
          {/* enumerator routes */}
          <Route
            path="/form"
            element={
              isLoggedIn && user && user.role === "enumerator" ? (
                <EnumeratorFormProvider>
                  <EnumeratorForm />
                </EnumeratorFormProvider>
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />

          {/* team lead routes */}
          <Route
            path="/home"
            element={
              isLoggedIn && user && user.role === "team_lead" ? (
                <TeamLead>
                  <Dashboard />
                </TeamLead>
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />
          <Route
            path="/enumerators"
            element={
              isLoggedIn && user && user.role === "team_lead" ? (
                <TeamLead>
                  <Enumerators />
                </TeamLead>
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />
          <Route
            path="/responses"
            element={
              isLoggedIn && user && user.role === "team_lead" ? (
                <TeamLead>
                  <FormResponses />
                </TeamLead>
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />
          <Route
            path="/tracker"
            element={
              isLoggedIn && user && user.role === "team_lead" ? (
                <TeamLead>
                  <Tracker />
                </TeamLead>
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />
          <Route
            path="/add"
            element={
              isLoggedIn && user && user.role === "team_lead" ? (
                <TeamLead>
                  <AddEnumerator />
                </TeamLead>
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isLoggedIn && user && user.role === "team_lead" ? (
                <TeamLead>
                  <Profile />
                </TeamLead>
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />
          <Route
            path="/master"
            element={
              user && user.role === "team_lead" ? (
                <TeamLead>
                  <MasterList />
                </TeamLead>
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />
          <Route
            path="/new-lga"
            element={
              isLoggedIn && user && user.role === "team_lead" ? (
                <TeamLead>
                  <NewRoute />
                </TeamLead>
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />

          {/* admin routes */}
          <Route
            path="admin/home"
            element={
              isLoggedIn && user && user.role === "admin" ? (
                <Admin>
                  <AdminDashboard />
                </Admin>
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />

          <Route
            path="admin/team_leads"
            element={
              isLoggedIn && user && user.role === "admin" ? (
                <Admin>
                  <TeamLeads />
                </Admin>
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />

          <Route
            path="/admin/team_leads/:_id"
            element={
              isLoggedIn && user && user.role === "admin" ? (
                <Admin>
                  <TeamLeadEnumerator />
                </Admin>
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />

          <Route
            path="admin/responses"
            element={
              isLoggedIn && user && user.role === "admin" ? (
                <Admin>
                  <AdminFormResponses />
                </Admin>
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />
          <Route
            path="admin/tracker"
            element={
              isLoggedIn && user && user.role === "admin" ? (
                <Admin>
                  <AdminTracker />
                </Admin>
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />
          <Route
            path="admin/add"
            element={
              isLoggedIn && user && user.role === "admin" ? (
                <Admin>
                  <AddTeamLead />
                </Admin>
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />
          <Route
            path="admin/profile"
            element={
              isLoggedIn && user && user.role === "admin" ? (
                <Admin>
                  <AdminProfile />
                </Admin>
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />
          <Route
            path="admin/master"
            element={
              user && user.role === "admin" ? (
                <Admin>
                  <AdminMasterList />
                </Admin>
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />
          <Route
            path="admin/new-lga"
            element={
              isLoggedIn && user && user.role === "admin" ? (
                <Admin>
                  <AdminNewRoute />
                </Admin>
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />

          <Route path="*" element={<p>This route doesn't exist</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
