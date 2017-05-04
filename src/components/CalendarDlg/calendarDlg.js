import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'

export default class CalendarDlg extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: this.props.open ? this.props.open : true
    }
  }

  static get propTypes () {
    return {
      open: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      onClose: PropTypes.func.isRequired
    }
  }

  render () {
    const actions = (
      <RaisedButton
        label='Close'
        onTouchTap={this.props.onClose ? this.props.onClose : null}
      />
    )
    return (
      <Dialog
        open={this.state.open}
        style={{ textAlign: 'left' }}
        title={this.props.title}
        actions={actions}
      >
        {this.props.desc}
      </Dialog>
    )
  }

}
