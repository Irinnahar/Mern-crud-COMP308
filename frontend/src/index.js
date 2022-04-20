import React from "react";
import ReactDOM from "react-dom";
import { Switch, Redirect, Route } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import NurseDashboard from "./NurseDashboard";
import PatientDashboard from "./Components/Patient/PatientDashboard";
import Videos from "./Components/Patient/Videos";
import DailyInformation from "./Components/Patient/DailyInformation";
import CommonSigns from "./Components/Patient/CommonSigns";
import "./Login.css";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route path="/nurse-dashboard" component={NurseDashboard} />
      <Route path="/patient-dashboard" component={PatientDashboard} />
      <Route path="/videos" component={Videos} />
      <Route path="/daily-information" component={DailyInformation} />
      <Route path="/common-signs" component={CommonSigns} />

      {/* <Route component={NotFound}/> */}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
