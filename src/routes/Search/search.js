import React, { Component, PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { ShowSquare } from '../../components/showSqr/showSqr'

export default class SearchPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      results: ['some','test','data','for','now'],
    }
  }

  static propTypes = {
    searchRes: PropTypes.object,
    getShows: PropTypes.func,
    searchTVAPI: PropTypes.func,
  };

  componentWillMount () {
    this.props.getShows('the wal');
  }

  runSearch = (searchContent) => {
   // this.props.searchTVAPI(searchContent);
  };

  componentWillReceiveProps (newProps) {
    const currProps = this.props;
  }

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
          />
          <ShowSquare
            id="test"
            content={[
              {image: "",name: "The Walking Dead", year: 2011},
              {image: "",name: "Game of Thrones", year: 2000},
              {image: "",name: "Gotham", year: 2000},
              {image: "",name: "Flash", year: 1995},
              {image: "",name: "Arrow", year: 2008},
              {image: "",name: "Mirror", year: 2012},
              {image: "",name: "Lost", year: 2015},
              {image: "",name: "Naruto", year: 1978},
              {image: "",name: "Empire", year: 2200}
              ]}
          />
        </div>
      </div>
    )
  }
}
