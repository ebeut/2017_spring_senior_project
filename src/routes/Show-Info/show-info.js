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
import { pinkA200 } from 'material-ui/styles/colors';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import moment from 'moment';
import Header from '../../components/Header';
import LogoutDlg from '../../components/LogoutDlg';
import ImageNA from '../../images/ImageNA.png';

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
      episodeList: [],
      clickAble: false,
      fav: false,
      userName: '',
      watchedEpiList: [],
    }
  }

  static propTypes = {
    showInfo: PropTypes.object,
    userData: PropTypes.object,
    getShowSeasonInfo: PropTypes.func,
    addFavorite: PropTypes.func,
    delEpisode: PropTypes.func,
    addEpisode: PropTypes.func,
    delFavorite: PropTypes.func,
    getEpisodes: PropTypes.func,
    isLogin: PropTypes.func,
    logout: PropTypes.func,
    getFav: PropTypes.func,
  };

  componentWillMount() {
    this.props.isLogin();
    this.setState({open: true});
  }

  componentWillReceiveProps (newProps) {
    const newStuff = newProps.showInfo;
    if (this.props.userData !== newProps.userData && newProps.userData.logoutData) {
      this.setState({logout: true});
    }
    if (this.props.userData !== newProps.userData && newProps.userData.loginData) {
      if (newProps.userData.loginData === 'N/A') {
        this.setState({clickAble: false});
      } else {
        const userName = newProps.userData.loginData;
        this.setState({userName});
        this.setState({clickAble: true});
      }
    }
    if (this.props.showInfo.show !== newStuff.show && newStuff.gettingShowInfo){
      this.setState({open: true});
    }
    if (this.props.showInfo.showSeasonInfo !== newStuff.showSeasonInfo && newStuff.gettingShowSeasonInfo === false) {
      if (this.state.numSeasons && this.state.numSeasons === this.state.season && newStuff.showSeasonInfo.length === 0) {
        this.setState({open: false, episodeList: newStuff.showSeasonInfo});
      } else if (newStuff.showSeasonInfo.length !== 0) {
        this.setState({open: false, episodeList: newStuff.showSeasonInfo});
      }
    }

    if (this.props.showInfo !== newProps.showInfo && newProps.showInfo.watchedEpiList && newProps.showInfo.watchedEpiList.length > 0) {
      this.setState({watchedEpiList: newProps.showInfo.watchedEpiList})
    }

    if (this.props.showInfo !== newProps.showInfo && newProps.showInfo.getFavRes && newProps.showInfo.getFavRes.length > 0) {
      newProps.showInfo.getFavRes.map((res) => {
        if (res === this.state.id) {
          this.setState({fav: true});
        }
      });
    }

    if (this.props.showInfo !== newProps.showInfo && newStuff.show && newProps.showInfo.show.id) {
      this.setState({
        poster: newStuff.show.poster,
        title: newStuff.show.title,
        cast: newStuff.show.cast,
        rating: newStuff.show.imdbRating,
        summary: newStuff.show.summary,
        network: newStuff.show.network,
        streaming: newStuff.show.streaming,
        year: newStuff.show.year,
        id: newStuff.show.id,
        numSeasons: newStuff.show.numSeasons,
      });
      this.props.getShowSeasonInfo(newStuff.show.id, 1);
      if (this.state.userName) {
        this.props.getFav(this.state.userName);
        this.props.getEpisodes(this.state.userName, newProps.showInfo.show.id);
      }
    }
  }

  backToSrch = () => {
    browserHistory.push('/search');
  };

  seasonChange = (event, index, season) => {
    this.setState({season});
    this.props.getShowSeasonInfo(this.state.id,season);
  };

  checkEpisode = (epi,bool) => {
    const sepisode = parseFloat(epi.season + (epi.number/100));
    if (bool) {
      let watchedEpiList = this.state.watchedEpiList;
      watchedEpiList[epi.number-1] = sepisode;
      this.setState({watchedEpiList});
      this.props.addEpisode(this.state.userName,epi.id,sepisode)
    } else {
      let watchedEpiList = this.state.watchedEpiList;
      delete watchedEpiList[epi.number-1];
      this.setState({watchedEpiList});
      this.props.delEpisode(this.state.userName,epi.id,sepisode)
    }
  }

  mkCheckbx (episode) {
    let checkBx = (
      <div />
    )
    let checked = false;
    if (this.state.watchedEpiList && this.state.watchedEpiList.length > 0) {
      this.state.watchedEpiList.map((epi) => {
        if (epi === (parseFloat(episode.season+(episode.number/100)))) {
          checked = true;
        }
      })
    }
    if (this.state.fav) {
      checkBx = (
        <Checkbox checked={checked} onCheck={ (evt,bool) => {this.checkEpisode(episode,bool) }} iconStyle={{fill: pinkA200}}/>
      )
    }
    return checkBx
  }

  mkEpisodeList () {
    if (this.state.episodeList.length === 0) return (<div>N/A</div>)

    const episodes = (
      <List>
        {this.state.episodeList.map((episode) => (
          <div key={episode.number} style={{height: '100%', cursor: 'pointer'}}>
            <ListItem
              style={{height: '100%', cursor: 'pointer'}}
              primaryText={`${episode.number}: "${episode.name}" ${episode.date} ${moment(episode.time, "HH:mm").format("h:mm A") != "Invalid date" ? moment(episode.time, "HH:mm").format("h:mm A") : ""}`}
              secondaryText={<div style={{height: '100%', overflow: 'visible', whiteSpace: 'normal'}}>{`${episode.summary}`}</div>}
              leftCheckbox={this.mkCheckbx(episode)}
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
      <div style={{display: 'inline-flex', padding: 10, paddingLeft: 25}}>
        {this.props.showInfo ? this.state.cast.map((cast) => (
          <div key={cast.character} style={{}}>
            <p style={{float: 'right', textAlign: 'left', paddingLeft: 10, paddingTop: 10, paddingRight: 10}}>
              <strong>{`${cast.name}`}</strong> <br />
              {`${cast.character}`}
            </p>
            <img src={cast.image} style={{height: 98.33, width: 70, float: 'left'}} />
          </div>
        )): <div> N/A </div>}
      </div>
    )
  }

  favoriteCheck = (evt, bool) => {
    if (bool) {
      this.props.addFavorite(this.state.userName, this.state.id);
    } else {
      this.setState({watchedEpiList: []});
      this.props.delFavorite(this.state.userName, this.state.id);
    }
    this.setState({fav: bool});
  }

  render () {
    const showInfo = (
      <div style={{width: '100%'}}>
        <LogoutDlg open={this.state.logout} email={this.state.userName} />
        <Header userEmail={this.state.userName ? this.state.userName : ''} logout={this.props.logout} />
      <div style={{padding: 20}}>
        <Loading id="show-info-loading" open={this.state.open} />
        <div style={{display: 'inline-flex', width: '100%', height: '50%'}}>
          <Paper id="show-poster" style={{width: 230, height: 315}} zDepth={5} >
            <img style={{padding: 10}} src={this.state.poster && this.state.poster !== 'N/A' ? this.state.poster : ImageNA}/>
          </Paper>
          <div style={{paddingLeft: 15, width: '100%'}}>
            <div>
              <Paper id="show-synopsis" style={{height: '45%', padding: 10, overflowY: 'auto'}} zDepth={5} >
                <h3 style={{textAlign: 'left', paddingLeft: 10}}>Summary</h3>
                <p style={{padding:10}}>{this.state.summary ? this.state.summary : "..."}</p>
                <p style={{padding:10}}> Airs on <strong>{this.state.network === "N/A" ? this.state.streaming : this.state.network}</strong></p>
                <div>
                    <p style={{padding:10, paddingBottom: 35, paddingTop: 35, paddingRight: 25, float: 'left', borderRight: 'thin solid #000000'}}>
                        <strong>IMDb</strong> <br />
                        {`${this.state.rating}/10`}
                    </p>
                    {this.mkCast()}
                </div>
              </Paper>
            </div>
          </div>
        </div>
        <div>
          <div style={{display: 'inline-flex', paddingTop: 15, width: '100%'}}>
            <div style={{paddingRight: 57, paddingLeft: 45}}>
                <div style={{paddingTop: 20, paddingLeft: 1, paddingBottom: 5}}>
                    <Checkbox
                      checkedIcon={< Favorite />}
                      disabled={!this.state.clickAble}
                      uncheckedIcon={< FavoriteBorder />}
                      label="FAVORITE"
                      iconStyle={{fill: pinkA200}}
                      checked={this.state.fav}
                      onCheck={this.favoriteCheck}
                    />
                </div>
                {this.mkSeasonDropDown()}
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
      </div>
    );
    const noInfo = (
      <div>
        <Header userEmail={this.state.userName ? this.state.userName : ''} logout={this.props.logout}  />
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
      </div>
    );
    return (
      <div id="show-info-page" style={{minHeight: '100%'}}>
        {this.state.id ? showInfo : noInfo}
      </div>
    );
  }
}
