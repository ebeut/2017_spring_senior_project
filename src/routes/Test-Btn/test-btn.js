import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import GoogleLogin from 'react-google-login';
//577924513252-oqhh3vilv5pkcjsvtrga222vcepv0303.apps.googleusercontent.com
export default class TestBtn extends Component {

  constructor(props){
    super(props);
    this.state = {
      testOpen: false
    }
  }

  static propTypes = {
    test: PropTypes.object,
    doubleTestAsync: PropTypes.func,
    testHttpReq: PropTypes.func,
  };

  testAction = () => {
    this.props.doubleTestAsync(
      'https://vpic.nhtsa.dot.gov/api/vehicles/decodevinextended/5UXWX7C5*BA?format=json&modelyear=2011');
  };

  onTestDialogClosed = () => {
    this.setState({testOpen: false});
  };

  componentWillReceiveProps(newProps){
    if (this.props.test.data !== newProps.test.data){
      this.setState({testOpen: true});
    }
  }
test = () => {
  console.log("works")
}
  render() {
    return (
    <div>
      <Dialog
        title="NHTSA returned:"
        open={this.state.testOpen}
        onRequestClose={this.onTestDialogClosed}
      >
        {this.props.test.data ? this.props.test.data : "nothing yet"}
      </Dialog>
      <RaisedButton
        label="Click to launch action"
        onTouchTap={this.testAction}
        primary={true}
      />
      <GoogleLogin
    clientId="577924513252-oqhh3vilv5pkcjsvtrga222vcepv0303.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={this.test}
    onFailure={this.test}
  />
    </div>
    )
  }
}
