import React, { Component, PropTypes } from 'react';
import { ShowSquare } from '../../components/showSqr/showSqr';


export default class HomePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      sqrContent: [],
    }
  }

  static propTypes = {
    homeData: PropTypes.object,
    calendarData: PropTypes.object,
    showInfo: PropTypes.object,
    getHomePageData: PropTypes.func,
    getTrending: PropTypes.func,
    getShowInfo: PropTypes.func,
  };

  isLogedIn () {
    return false;
  }

  componentWillMount () {
    this.isLogedIn() ? this.props.getHomePageData() : this.props.getTrending();
  }

  componentWillReceiveProps (newProps) {
    if (this.props.homeData.homeData != newProps.homeData.homeData && newProps.homeData.homeData) {
      this.setState({sqrContent: newProps.homeData.homeData});
    } else if (this.props.calendarData.trendingData != newProps.calendarData.trendingData && newProps.calendarData.trendingData) {
      this.setState({sqrContent: newProps.calendarData.trendingData});
    }
  }

  render () {
    let sqr = (
      <div id="home-loading">Loading..... Please wait</div>
    );

    if (this.state.sqrContent.length > 0) {
      sqr = (
        <ShowSquare
          id="home-squares"
          content={this.state.sqrContent}
          getShowInfo={this.props.getShowInfo}
        />
      );
    }
    return (
      <div id="home-page">
        <h4 id="home-title" style={{textAlign: 'center'}}>
          {this.isLogedIn() ? 'Your Favorite\'s' : 'Top Trending Shows'}
        </h4>
        {sqr}
      </div>
    );
  }
}
