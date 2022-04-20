import React, { Component } from 'react';
import {
  Button, TextField, Dialog, DialogActions, LinearProgress,
  DialogTitle, DialogContent, TableBody, Table,
  TableContainer, TableHead, TableRow, TableCell
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import swal from 'sweetalert';
const axios = require('axios');

export default class PatientDashboard extends Component {
  constructor() {
    super();
  }

  logOut = () => {
    localStorage.setItem('token', null);
    this.props.history.push('/');
  }

 

  render() {
    return (
     <div>
       <h1>Welcome to Patient dashboard</h1>
       <div>
       <Button
            className="button_style"
            variant="contained"
            size="small"
            onClick={this.logOut}
          >
            Log Out
          </Button>
       </div>
     </div>
    );
  }
}