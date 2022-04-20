import React, { Component } from "react";
import { Link } from "react-router-dom";

const navstyle = {
  display: "flex",
  flexFlow: "row",
  justifyContent: "space-evenly",
  background: "#397072",
  padding: "10px",
};

const listHref = {
  color: "white",
  textDecoration: "none",
  padding: "10px",
};

export default class Navbar extends Component {
  constructor() {
    super();
  }

  logOut = () => {
    localStorage.setItem("token", null);
    localStorage.clear();
    window.location.href = "/";
  };
  render() {
    return (
      <div className="navbar-list" style={navstyle}>
        <li style={{ listStyle: "none" }}>
          <Link to="/patient-dashboard" style={listHref}>
            Home
          </Link>
        </li>
        <li style={{ listStyle: "none" }}>
          <Link to="/videos" style={listHref}>
            Motivational Videos
          </Link>
        </li>
        <li style={{ listStyle: "none" }}>
          <Link to="/daily-information" style={listHref}>
            Daily Information
          </Link>
        </li>
        <li style={{ listStyle: "none" }}>
          <Link to="/common-signs" style={listHref}>
            Common signs and symptoms
          </Link>
        </li>
        <li style={{ listStyle: "none" }}>
          <button
            className="button_style"
            variant="contained"
            size="small"
            onClick={this.logOut}
          >
            Log Out
          </button>
        </li>
      </div>
    );
  }
}
