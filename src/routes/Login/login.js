import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export default class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      newUser: '',
      newPass: '',
      validPass: '',
      invalidPass: null,
      passError: null,
      userError: null
    }
  }

  static propTypes = {
    userData: PropTypes.object,
    login: PropTypes.func,
  };

  usernameChange = (evt, username, letter) => {
    this.setState({username});
  };

  passwordChange = (evt, password) => {
    this.setState({password});
  };

  newUsernameChange = (evt, newUser) => {
    const userError = this.validateUsername(newUser) ? null : 'Invalid User name';
    this.setState({newUser, userError});
  };

  newPasswordChange = (evt, newPass) => {
    const passError = this.validatePassword(newPass) ? null : 'Incorrect';
    this.setState({newPass, passError});
  };

  validPasswordChange = (evt, validPass) => {
    const invalidPass = validPass === this.state.newPass ? null : 'Does not match Password';
    this.setState({validPass, invalidPass});
  };

  validatePassword (password) {
    return password.length > 7 && password.length < 21
  }

  validateUsername (username) {
    if (username.length < 5 || username.length > 15){
      return false;
    }
    for (let i = 0; i<username.length; i++){
      const temp = username.charAt(i);
      if (isNaN(temp) && !this.isLetter(temp) && temp !== '_' && temp !== '.') {
        return false;
      }
    }
    return true;
  }

  isLetter(char) {
    const letter = 'qwertyuiopasdfghjklzxcvbnm';
    for (let i =0; i<26; i++){
      if (char === letter.charAt(i)) {
        return true;
      }
    }
    return false;
  }
  register = () => {
    console.log("register the user");
  };

  login = () => {
    console.log("user logs in");
    this.props.login(this.state.username, this.state.password);
  };

  render() {
    const validLog = this.state.username === '' || this.state.password === '';
    const validReg = this.state.userError !== null || this.state.passError !== null || this.state.newUser === '' || this.state.newPass === '' || this.state.validPass === '';
    return (
      <div id="login-page" style={{textAlign: 'center', width: '100%'}}>
        <br /><br /><br />
        <div style={{display: 'inline-flex', height: '100%', width: '100%' }}>
          <div style={{paddingRight: 20, height: 500, width: '50%', paddingLeft: 50}}>
            <Paper zDepth={5} style={{height: '100%'}}>
              <h3 style={{paddingTop: 50}}>Login</h3><br />
              <TextField
                id="login-username"
                floatingLabelText="Username"
                value={this.state.username}
                onChange={this.usernameChange}
              /><br />
              <TextField
                id="login-username"
                floatingLabelText="Password"
                type="password"
                value={this.state.password}
                onChange={this.passwordChange}
              /><br /><br /><br />
              <RaisedButton
                id="login-btn"
                label="Login"
                onTouchTap={this.login}
                disabled={validLog}
              />
            </Paper>
          </div>
          <div style={{paddingLeft: 20, height: 500, width: '50%', paddingRight: 50}}>
            <Paper zDepth={5} style={{height: '100%'}}>
              <h3 style={{paddingTop: 50}}>New User - Register here</h3><br />
              <TextField
                id="login-new-username"
                floatingLabelText="Username"
                hintText="Must be between 8-20 characters"
                value={this.state.newUser}
                errorText={this.state.userError}
                onChange={this.newUsernameChange}
              /><br />
              <TextField
                id="login-new-password"
                floatingLabelText="Password"
                hintText="Must be between 5-15 characters"
                type="password"
                value={this.state.newPass}
                errorText={this.state.passError}
                onChange={this.newPasswordChange}
              /><br />
              <TextField
                id="login-new-password-validation"
                floatingLabelText="Re-enter password"
                hintText="Validating password"
                type="password"
                value={this.state.validPass}
                errorText={this.state.invalidPass}
                onChange={this.validPasswordChange}
              /><br /><br /><br />
              <RaisedButton
                id="register-btn"
                label="Register"
                onTouchTap={this.register}
                disabled={validReg}
              />
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}