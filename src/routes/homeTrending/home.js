import React, { Component, PropTypes } from 'react';
import { ShowSquare } from '../../components/showSqr/showSqr';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import LogoutDlg from '../../components/LogoutDlg';
import { pinkA200 } from 'material-ui/styles/colors';

export default class HomePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      sqrContent: [],
      userContent: [],
      open: false,
      userName: '',
      userFav: [],
      logout: false,
    }
  }

  static propTypes = {
    homeData: PropTypes.object,
    calendarData: PropTypes.object,
    showInfo: PropTypes.object,
    userData: PropTypes.object,
    getHomePageData: PropTypes.func,
    getTrending: PropTypes.func,
    getShowInfo: PropTypes.func,
    isLogin: PropTypes.func,
    logout: PropTypes.func,
  };

  isLogedIn () {
    return !!this.state.userName;
  }

  componentWillMount () {
    this.props.isLogin();
    this.setState({open: true});
  }

  componentWillReceiveProps (newProps) {
    if (this.props.userData !== newProps.userData && newProps.userData.logoutData) {
      this.setState({logout: true});
    }
    if (this.props.showInfo.show !== newProps.showInfo.show && newProps.showInfo.show && newProps.showInfo.show.title) {
      const userFav = this.state.userFav;
      userFav.push(newProps.showInfo.show);
      this.setState({userContent: userFav, userFav});
    }
    if (this.props.userData !== newProps.userData && newProps.userData.loginData) {
      if (newProps.userData.loginData === 'N/A') {
        this.props.getTrending();
      } else {
        this.setState({userName: newProps.userData.loginData});
        this.props.getHomePageData(newProps.userData.loginData);
        this.props.getTrending();
      }
    }
    if (this.props.homeData.homeData !== newProps.homeData.homeData && newProps.homeData.homeData && newProps.homeData.homeData.length > 0) {
      newProps.homeData.homeData.map((id) => {
        this.props.getShowInfo(id);
      })
    }
    if (this.props.calendarData.trendingData !== newProps.calendarData.trendingData && newProps.calendarData.trendingData && newProps.calendarData.trendingData.length > 0) {
      let sqrContent = []
      if (newProps.calendarData.trendingData.length > 4) {
        for (let i=0;i < newProps.calendarData.trendingData.length;i++) {
          if (i<5) {
            sqrContent.push(newProps.calendarData.trendingData[i])
          }
        }
      }
      this.setState({sqrContent, open: false});
    }
  }

  render () {
    let userSqr = (
      <div />
    )

    if (this.state.userContent && this.state.userContent.length > 0) {
      console.log(this.state.userContent);
      userSqr = (
        <ShowSquare
          id="home-squares"
          content={this.state.userContent}
          getShowInfo={this.props.getShowInfo}
        />
      )
    }

    let sqr = (
      <div />
    );

    if (this.state.sqrContent && this.state.sqrContent.length > 0) {
      sqr = (
        <ShowSquare
          id="trending-squares"
          content={this.state.sqrContent}
          getShowInfo={this.props.getShowInfo}
        />
      );
    }
    return (
      <div id="home-page">
        <LogoutDlg open={this.state.logout} email={this.state.userName} />
        <Header userEmail={this.state.userName ? this.state.userName : ''} logout={this.props.logout} />
        <Loading id="home-page-loading" open={this.state.open} />
        {this.state.userContent && this.state.userContent.length > 0 ? <h4 style={{textAlign: 'center', paddingTop: 25}}>Favorites</h4> : null}
        {userSqr}
        <h4 id="home-title" style={{textAlign: 'center', paddingTop: 25}}>
          Trending
        </h4>
        {sqr}
      </div>
    );
  }
}
