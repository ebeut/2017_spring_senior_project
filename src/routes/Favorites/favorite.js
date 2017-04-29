import React, { Component, PropTypes } from 'react';
import Header from '../../components/Header';
import LogoutDlg from '../../components/LogoutDlg';
import Loading from '../../components/Loading';

export default class Favorite extends Component {

  constructor (props) {
    super(props);
    this.state = {
      open: false,
      logout: false,
      userName: '',
    }
  }

  static propTypes = {
    favInfo: PropTypes.object,
    userData: PropTypes.object,
    getFav: PropTypes.func,
    isLogin: PropTypes.func,
    logout: PropTypes.func,
  };

  componentWillMount() {
    this.props.isLogin();
   // this.setState({open: true});
  }

  componentWillReceiveProps (newProps) {
    if (this.props.userData !== newProps.userData && newProps.userData.logoutData) {
      this.setState({logout: true});
    }
    if (this.props.userData !== newProps.userData && newProps.userData.loginData) {
      if (newProps.userData.loginData === 'N/A') {
        console.log("something.....")
      } else {
        const userName = newProps.userData.loginData;
        this.setState({userName});
      }
    }
  }
  render () {

    return (
      <div style={{width: '100%'}}>
        <LogoutDlg open={this.state.logout} email={this.state.userName} />
        <Header userEmail={this.state.userName ? this.state.userName : ''} logout={this.props.logout} />
        <Loading id="favorite-loading" open={this.state.open} />
      </div>
    );
  }
}
