import React, { Component } from 'react';
import PropTypes from 'prop-types'
import AutoComplete from 'material-ui/AutoComplete';
import { ShowSquare } from '../../components/showSqr/showSqr';
import Loading from '../../components/Loading';
import { blue500, pinkA200 } from 'material-ui/styles/colors';
import Header from '../../components/Header';
import LogoutDlg from '../../components/LogoutDlg';

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

export default class SearchPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      results: [],
      searching: false,
      sqrContent: [],
      open: false,
    }
  }

  static propTypes = {
    searchRes: PropTypes.object,
    calendarData: PropTypes.object,
    userData: PropTypes.object,
    getTrending: PropTypes.func,
    searchTVAPI: PropTypes.func,
    getShowInfo: PropTypes.func,
    isLogin: PropTypes.func,
    logout: PropTypes.func,
  };

  componentWillMount () {
    this.props.isLogin();
    this.props.getTrending();
    this.setState({open: true});
  }

  runSearch = (searchContent) => {
    this.setState({searching: true});
    this.props.searchTVAPI(searchContent);
  };

  componentWillReceiveProps (newProps) {
    if (this.props.userData !== newProps.userData && newProps.userData.logoutData) {
      this.setState({logout: true});
    }
    if (this.props.userData !== newProps.userData && newProps.userData.loginData) {
      if (newProps.userData.loginData === 'N/A') {
        this.props.getTrending();
      } else {
        this.setState({userName: newProps.userData.loginData});
      }
    }
    if (this.props.calendarData.trendingData != newProps.calendarData.trendingData && newProps.calendarData.trendingData) {
      let results = [];
      this.setState({open: false});
      newProps.calendarData.trendingData.map((show) => {
        if (results.indexOf(show.title) == -1) {
          results.push(show.title);
        }
      });
      this.setState({sqrContent: newProps.calendarData.trendingData, results});
    }
    if (this.props.searchRes.searchResults != newProps.searchRes.searchResults) {
      let results = [];
      if (newProps.searchRes.searchResults) {
        newProps.searchRes.searchResults.map((show) => {
          if (results.indexOf(show.title) == -1) {
            results.push(show.title);
          }
        });
        this.setState({results});
      }
      if (this.state.searching && newProps.searchRes.searchResults){
        const sqrContent = newProps.searchRes.searchResults;
        this.setState({searching: false, sqrContent});
      }
    }
  }

  searchUpdated = (search) => {
    if (search.length % 4 == 0 && search){
      this.props.searchTVAPI(search);
    }
  };

  render () {
    let outerDiv = {
      overflowX: 'hidden',
      overflowY: 'hidden'
    };
    if (this.props.content && this.props.content.length > 15) {
      outerDiv.overflowY = 'scroll';
    }
    return (
      <div id="search-page" style={outerDiv}>
        <LogoutDlg open={this.state.logout} email={this.state.userName} />
        <Header userEmail={this.state.userName ? this.state.userName : ''} logout={this.props.logout} />
        <div style={{textAlign: 'center'}}>
          <Loading id="search-loading" open={this.state.open} />
          <AutoComplete
            id="auto-complete-search"
            floatingLabelText="Search for a show"
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={this.state.results}
            onNewRequest={this.runSearch}
            maxSearchResults={20}
            onUpdateInput={this.searchUpdated}
            underlineStyle={styles.underlineStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            underlineFocusStyle={styles.underlineFocusStyle}
          />
          <ShowSquare
            id="search-squares"
            content={this.state.sqrContent}
            getShowInfo={this.props.getShowInfo}
          />
        </div>
      </div>
    )
  }
}
