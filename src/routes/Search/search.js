import React, { Component, PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { ShowSquare } from '../../components/showSqr/showSqr';
import { blue500, pinkA200 } from 'material-ui/styles/colors';

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
}

export default class SearchPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      results: [],
      searching: false,
      sqrContent: [],
    }
  }

  static propTypes = {
    searchRes: PropTypes.object,
    searchTVAPI: PropTypes.func,
    getShowInfo: PropTypes.func,
  };

  runSearch = (searchContent) => {
    this.setState({searching: true});
    this.props.searchTVAPI(searchContent);
  };

  componentWillReceiveProps (newProps) {
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
        <div style={{textAlign: 'center'}}>
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
