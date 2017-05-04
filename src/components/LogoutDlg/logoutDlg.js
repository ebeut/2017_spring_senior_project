import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

export default class LogoutDlg extends Component {

  static PropTypes = {
    open: PropTypes.bool,
    email: PropTypes.string,
  };

  onClose = () => {
    browserHistory.push('/login');
  }

  render () {
    const actions = (
      <RaisedButton
        label='Close'
        onTouchTap={this.onClose}
      />
    )
    return (
      <Dialog
        open={this.props.open ? this.props.open : false}
        style={{textAlign: 'center'}}
        title={`Goodbye, ${this.props.email}`}
        actions={actions}
      />
    );
  }

}
