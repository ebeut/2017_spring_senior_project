import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

export default class CalendarDlg extends Component {
    constructor(props){
      super(props);
      this.state = {
        open: true,
      }
    }

  static PropTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    desc: PropTypes.string,
    onClose: PropTypes.func
  };

  render () {
    const actions = (
      <RaisedButton
        label='Close'
        onTouchTap={this.props.onClose}
      />
    )
    return (
      <Dialog
        open={this.state.open}
        style={{textAlign: 'left'}}
        title={this.props.title}
        actions={actions}
      >
          {this.props.desc}
      </Dialog>
    );
  }

}
