import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Loading from '../../components/Loading';
import Dialog from 'material-ui/Dialog';
import { browserHistory } from 'react-router';
import { blue500, pinkA200 } from 'material-ui/styles/colors';
import Header from '../../components/Header';

const styles = {
    underlineStyle: {
        borderColor: blue500,
    },
    floatingLabelFocusStyle: {
        color: pinkA200,
    },
    underlineFocusStyle: {
        borderColor: pinkA200,
    },
};

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
      userError: null,
      loginDlg: false,
      loginDlgMsg: '',
      loginDlgTitle: '',
      loginDlgCallBack: this.closeLoginDlg,
      waitDlg: false,
    }
  }

  componentWillMount () {
    this.props.isLogin();
  }

  static propTypes = {
    userData: PropTypes.object,
    login: PropTypes.func,
    register: PropTypes.func,
    isLogin: PropTypes.func,
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
    if (username && username.length > 0 && username[0] === '_' || username[0] === '.') return false;
    for (let i = 0; i<username.length; i++){
      const temp = username.charAt(i);
      if (isNaN(temp) && !this.isLetter(temp) && temp !== '_' && temp !== '.') {
        return false;
      }
    }
    return true;
  }

  goToHome = () => {
    browserHistory.push('/home');
  }

  isLetter(char) {
    const letter = 'qwertyuiopasdfghjklzxcvbnm';
    for (let i =0; i<26; i++){
      if (char.toLowerCase() === letter.charAt(i)) {
        return true;
      }
    }
    return false;
  }
  register = () => {
    this.props.register(this.state.newUser, this.state.newPass);
  };

  login = () => {
    this.props.login(this.state.username, this.state.password);
  };

  componentWillReceiveProps (newProps) {
    if (this.props.userData.loginData !== newProps.userData.loginData && newProps.userData.loginData) {
      if (newProps.userData.loginData !== 'N/A') {
        browserHistory.push('/home');
      }
      if (newProps.loginData && newProps.loginData.gettingLogin) {
        this.setState({ waitDlg: true });
      } else {
        this.setState({ waitDlg: false });
      }
      if (newProps.userData.loginData && newProps.userData.loginData.error && !newProps.userData.loginData.login) {
        this.setState({
          loginDlg: true,
          loginDlgMsg: 'The Username and Password did not match our records. Please try again.',
          loginDlgTitle: 'Error'
        });
      } else if (newProps.userData.loginData && newProps.userData.loginData.login === true && newProps.userData.loginData.error === 'None') {
        this.setState({
          loginDlg: true,
          loginDlgMsg: 'Login successful. Going to home Page',
          loginDlgTitle: 'Successful',
          loginDlgCallBack: this.goToHome
        });
      }
    }
    if (this.props.userData.registerData !== newProps.userData.registerData) {
      if (newProps.registerData && newProps.registerData.gettingRegister) {
        this.setState({ waitDlg: true });
      } else {
        this.setState({ waitDlg: false });
      }
      if (newProps.userData.registerData && newProps.userData.registerData.error && !newProps.userData.registerData.registered) {
        this.setState({
          loginDlg: true,
          loginDlgMsg: 'A user is already registered under this username. Please try another username',
          loginDlgTitle: 'Error'
        });
      } else if (newProps.userData.registerData && newProps.userData.registerData.registered === true && newProps.userData.registerData.error === 'None') {
        this.setState({
          loginDlg: true,
          loginDlgMsg: `You are registered and logged in. Welcome ${this.state.newUser}`,
          loginDlgTitle: 'Successful',
          loginDlgCallBack: this.goToHome
        });
      }
    }
  }

  closeLoginDlg = () => {
    this.setState({ loginDlg: false });
  }

  render() {
    const validLog = this.state.username === '' || this.state.password === '';
    const validReg = this.state.userError !== null || this.state.passError !== null || this.state.newUser === '' || this.state.newPass === '' || this.state.validPass === '';
    const action = (
      <RaisedButton
        id="login-error-close-btn"
        label="Close"
        secondary
        onTouchTap={this.state.loginDlgCallBack}
      />
    )
    return (
      <div id="login-page" style={{textAlign: 'center', width: '100%'}}>
        <Header />
        <Loading id="login-loading" open={this.state.waitDlg} />
        <Dialog
          title={this.state.loginDlgTitle}
          actions={action}
          open={this.state.loginDlg}
          onRequestClose={this.state.loginDlgCallBack}
        >
          {this.state.loginDlgMsg}
        </Dialog>
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
                underlineStyle={styles.underlineStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
              /><br />
              <TextField
                id="login-username"
                floatingLabelText="Password"
                type="password"
                value={this.state.password}
                onChange={this.passwordChange}
                underlineStyle={styles.underlineStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
              /><br /><br /><br />
              <RaisedButton
                id="login-btn"
                label="Login"
                onTouchTap={this.login}
                secondary
                disabled={validLog}
                backgroundColor={pinkA200}
                labelColor="#ffffff"
              />
            </Paper>
          </div>
          <div style={{paddingLeft: 20, height: 500, width: '50%', paddingRight: 50}}>
            <Paper zDepth={5} style={{height: '100%'}}>
              <h3 style={{paddingTop: 50}}>Create a New Account</h3><br />
              <TextField
                id="login-new-username"
                floatingLabelText="Username"
                hintText="Must be between 8-20 characters"
                value={this.state.newUser}
                errorText={this.state.userError}
                onChange={this.newUsernameChange}
                underlineStyle={styles.underlineStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
              /><br />
              <TextField
                id="login-new-password"
                floatingLabelText="Password"
                hintText="Must be between 5-15 characters"
                type="password"
                value={this.state.newPass}
                errorText={this.state.passError}
                onChange={this.newPasswordChange}
                underlineStyle={styles.underlineStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
              /><br />
              <TextField
                id="login-new-password-validation"
                floatingLabelText="Re-enter password"
                hintText="Validating password"
                type="password"
                value={this.state.validPass}
                errorText={this.state.invalidPass}
                onChange={this.validPasswordChange}
                underlineStyle={styles.underlineStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
              /><br /><br /><br />
              <RaisedButton
                id="register-btn"
                label="Register"
                onTouchTap={this.register}
                disabled={validReg}
                secondary
                backgroundColor={pinkA200}
                labelColor="#ffffff"
              />
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}
