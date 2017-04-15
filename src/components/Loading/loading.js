import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';

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
        <h2>Content is Loading, please wait</h2>
        <CircularProgress size={80} thickness={5} />
      </Dialog>
    );
  }

}
