import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import { pinkA200 } from 'material-ui/styles/colors';

export default class Loading extends Component {

  static PropTypes = {
    open: PropTypes.bool,
  };

  render () {
    return (
      <Dialog
        open={this.props.open}
        style={{textAlign: 'center'}}
      >
        <h2 style={{paddingBottom: 25}}>Content is loading, please wait</h2>
        <CircularProgress size={80} thickness={5} color={pinkA200} />
      </Dialog>
    );
  }

}
