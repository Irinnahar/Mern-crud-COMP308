import React, { Component } from "react";
import Navbar from "./Navbar";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  LinearProgress,
  DialogTitle,
  DialogContent,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import swal from "sweetalert";
const axios = require("axios");

export default class PatientDashboard extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Navbar />
        <h1>Welcome to Patient dashboard</h1>
        <div></div>
      </div>
    );
  }
}
