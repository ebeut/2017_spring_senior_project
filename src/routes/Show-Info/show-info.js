import React, { Component, PropTypes } from 'react';
import Logo from '../../../logo.png';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import { browserHistory } from 'react-router';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';

export default class ShowInfoPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      open: false,
      id: 0,
      poster: '',
      title: '',
      cast: [],
      season: 1,
      rating: 0.0,
      summary: '',
      network: '',
      numSeasons: 0,
      year: '',
      episodeTitle: [],
      episodeDescription: []
    }
  }

  static propTypes = {
    showInfo: PropTypes.object,
    getShowSeasonInfo: PropTypes.func
  };

  componentWillReceiveProps(newProps) {
    const newStuff = newProps.showInfo;
    if (this.props.showInfo.gettingShowInfo !== newStuff.gettingShowInfo && newProps.showInfo.gettingShowInfo)
      this.setState({open: true});
    if (this.props.showInfo.gettingShowInfo !== newStuff.gettingShowInfo && !newProps.showInfo.gettingShowInfo)
      this.setState({open: false});
    if (this.props.showInfo !== newProps.showInfo && newStuff.show && newProps.showInfo.show.id) {
      this.setState({
        poster: newStuff.show.poster,
        title: newStuff.show.title,
        cast: newStuff.show.cast,
        rating: newStuff.show.imdbRating,
        summary: newStuff.show.summary,
        network: newStuff.show.network,
        year: newStuff.show.year,
        id: newStuff.show.id,
        numSeasons: newStuff.show.numSeasons,
      });
      this.props.getShowSeasonInfo(newStuff.show.id, 1);
    }
    if (this.props.showInfo !== newProps.showInfo && newStuff.show && newStuff && newProps.showInfo.show.id && newStuff.showSeasonInfo.length > 0) {
      this.setState({

      })
    }
  }

  backToSrch = () => {
    browserHistory.push('/search');
  };

  seasonChange = (event, index, season) => {
    this.setState({season});
    this.props.getShowSeasonInfo(this.state.id,season);
  };

  mkEpisodeList () {
    if (this.props.showInfo.showSeasonInfo.length === 0) return (<div>loading .....</div>)
    const episodes = (
      <List>
        {this.props.showInfo.showSeasonInfo.map((episode) => (
          <div key={episode.number} style={{height: '100%'}}>
            <ListItem
              style={{height: '100%'}}
              primaryText={`${episode.number}: ${episode.name} ${episode.date} ${episode.time}`}
              secondaryText={<div style={{height: '100%', overflow: 'visible', whiteSpace: 'normal'}}>{`${episode.summary}`}</div>}
              leftCheckbox={<Checkbox />}
            />
            <Divider />
          </div>
        ))}
      </List>
    );
    return episodes;
  }

  mkSeasonDropDown (){
    if (!this.state.numSeasons) return (<div>Number of season's not available</div>);
    const seasons = [];
    for (let i = 0; i < this.state.numSeasons; i++) {
      seasons.push(i+1);
    }
    return (
    <DropDownMenu value={this.state.season} onChange={this.seasonChange}>
      {seasons.map((season) => (
        <MenuItem key={season} value={season} primaryText={`Season ${season}`} />
      ))}
    </DropDownMenu>
    )
  }

  mkCast () {
    if (!this.state.cast) return (<div>Cast not available</div>);
    return (
      <div style={{display: 'inline-flex'}}>
        {this.props.showInfo ? this.state.cast.map((cast) => (
          <div key={cast.character} style={{paddingLeft: 15}}>
            <h3>
              {`${cast.name} as ${cast.character}`}
            </h3>
            <img src={cast.image} />
          </div>
        )): <div> Loading.... </div>}
      </div>
    )
  }

  render () {
    const showInfo = (
      <div>
        <Dialog
          title="Content is loading please wait"
          open={this.state.open}
        >
          <div style={{textAlign: 'center'}}>
            <CircularProgress size={60} thickness={7} />
          </div>
        </Dialog>
        <div style={{display: 'inline-flex', width: '100%', height: '50%'}}>
          <Paper id="show-poster" style={{width: '25%'}} zDepth={5} >
            <img style={{width: '100%', padding: 10, height: '100%'}} src={this.state.poster && this.state.poster != 'N/A' ? this.state.poster : 'https://www.alpinehomeair.com/css/images/image-not-available.png'}/>
          </Paper>
          <div style={{paddingLeft: 15, width: '70%'}}>
            <div style={{paddingBottom: 20}}>
              <Paper id="show-synopsis" style={{height: '45%', padding: 10, overflowY: 'auto'}} zDepth={5} >
                <h3 style={{textAlign: 'center'}}>Synopsis</h3>
                <br />
                {this.state.summary ? this.state.summary : "..."}
              </Paper>
            </div>
            <div style={{textAlign: 'center'}}>
              <Paper id="show-cast" style={{height: '45%', padding: 10, overflowY: 'auto'}} zDepth={5} >
                <h3 style={{textAlign: 'center'}}>Cast</h3><br />
                {this.mkCast()}
              </Paper>
            </div>
          </div>
        </div>
        <div>
          <div style={{display: 'inline-flex', paddingTop: 15, width: '100%'}}>
            <div style={{paddingRight: 15, width: '10%'}}>
              <Paper id="show-seasons" zDepth={5} style={{overflowY: 'auto'}} >
                {this.mkSeasonDropDown()}
              </Paper>
            </div>
            <div style={{width: '90%'}}>
              <Paper id="show-episodes" zDepth={5} >
                <h3 id="season-title" style={{textAlign: 'center'}}>
                  {this.state.season ? `Season ${this.state.season}` : 'N/A'}
                </h3>
                <div id="episode-list">
                  {this.mkEpisodeList()}
                </div>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    );
    const noInfo = (
      <div id="show-info-no-info">
        Please go back to search page to find the show you are looking for
        <br />
        <div style={{textAlign: 'center'}}>
          <RaisedButton id="show-info-back-to-search" label="Go back to search" primary onTouchTap={this.backToSrch} />
        </div>
      </div>
    );
    return (
      <div id="show-info-page" style={{minHeight: '100%'}}>
        {this.state.id ? showInfo : noInfo}
      </div>
    );
  }
}
