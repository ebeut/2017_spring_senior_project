import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import Loading from '../../components/Loading';
import {List, ListItem} from 'material-ui/List';
import { blue500, pinkA200 } from 'material-ui/styles/colors';

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
      episodeDescription: [],
    }
  }

  static propTypes = {
    showInfo: PropTypes.object,
    getShowSeasonInfo: PropTypes.func,
    addFavorite: PropTypes.func,
    delEpisode: PropTypes.func,
    addEpisode: PropTypes.func,
    delFavorite: PropTypes.func,
    getEpisodes: PropTypes.func,
  };

  componentDidMount() {
    this.setState({open: true});
  }

  componentWillReceiveProps(newProps) {
    const newStuff = newProps.showInfo;
    if (this.props.showSeasonInfo != newStuff.showSeasonInfo && this.props.showInfo.show && newStuff.gettingShowSeasonInfo){
      this.setState({open: true});
    }
    if (this.props.showSeasonInfo != newStuff.showSeasonInfo && this.props.showInfo.show && !newStuff.gettingShowSeasonInfo){
      this.setState({open: false});
    }

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
              leftCheckbox={<Checkbox iconStyle={{fill: pinkA200}}/>}
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
      <div style={{display: 'inline-flex', padding: 10}}>
        {this.props.showInfo ? this.state.cast.map((cast) => (
          <div key={cast.character} style={{}}>
            <p style={{float: 'right', textAlign: 'left', paddingLeft: 10, paddingTop: 10, paddingRight: 10}}>
              <strong>{`${cast.name}`}</strong> <br />
              {`${cast.character}`}
            </p>
            <img src={cast.image} style={{height: 98.33, width: 70, float: 'left'}} />
          </div>
        )): <div> Loading.... </div>}
      </div>
    )
  }

  render () {
    const showInfo = (
      <div style={{padding: 20}}>
        <Loading id="show-info-loading" open={this.state.open} />
        <div style={{display: 'inline-flex', width: '100%', height: '50%'}}>
          <Paper id="show-poster" style={{width: 230, height: 315}} zDepth={5} >
            <img style={{padding: 10}} src={this.state.poster && this.state.poster != 'N/A' ? this.state.poster : 'https://www.alpinehomeair.com/css/images/image-not-available.png'}/>
          </Paper>
          <div style={{paddingLeft: 15, width: '100%'}}>
            <div>
              <Paper id="show-synopsis" style={{height: '45%', padding: 10, overflowY: 'auto'}} zDepth={5} >
                <h3 style={{textAlign: 'left', paddingLeft: 10}}>Summary</h3>
                <p style={{padding:10}}>{this.state.summary ? this.state.summary : "..."}</p>
                <p>{`Show Rating: ${this.state.rating}/10`}</p>
                {this.mkCast()}
              </Paper>
            </div>
          </div>
        </div>
        <div>
          <div style={{display: 'inline-flex', paddingTop: 15, width: '100%'}}>
            <div style={{paddingRight: 65, paddingLeft: 35}}>
              <Paper id="show-seasons" zDepth={5} style={{}} >
                {this.mkSeasonDropDown()}
              </Paper>
            </div>
            <div style={{width: '90%'}}>
              <Paper id="show-episodes" zDepth={5} >
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
      <div id="show-info-no-info"
          style = {{
            width: '50%',
            margin: '0 auto',
            padding: 20
          }}
      >
          <Paper zDepth={5} style={{height: '100%'}}>
            <h3
                style={{
                    padding: 20,
                    textAlign: 'center'
                }}
            >
                If no show information shows up in a second, please go back to search page to find the show you are looking for.
            </h3>
            <br />
            <div style={{textAlign: 'center', paddingBottom: 20}}>
              <RaisedButton id="show-info-back-to-search" label="Back to Search" labelColor="#ffffff" backgroundColor={pinkA200} onTouchTap={this.backToSrch}/>
            </div>
        </Paper>
      </div>
    );
    return (
      <div id="show-info-page" style={{minHeight: '100%'}}>
        {this.state.id ? showInfo : noInfo}
      </div>
    );
  }
}
