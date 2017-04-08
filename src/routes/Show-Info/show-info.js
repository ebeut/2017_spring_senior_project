import React, { Component, PropTypes } from 'react';
import Logo from '../../../logo.png';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import { browserHistory } from 'react-router';

export default class ShowInfoPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      open: false,
      poster: '',
      title: '',
      cast: [],
      season: 1,
      episodeTitle: [],
      episodeDescription: []
    }
  }

  static propTypes = {
    showInfo: PropTypes.object,
    getShowSeasonInfo: PropTypes.func
  };

  componentWillReceiveProps(newProps) {
    console.log("in component",newProps);
    if (this.props.showInfo.gettingShowInfo !== newProps.showInfo.gettingShowInfo && newProps.showInfo.gettingShowInfo)
      this.setState({open: true});
    if (this.props.showInfo.gettingShowInfo !== newProps.showInfo.gettingShowInfo && !newProps.showInfo.gettingShowInfo)
      this.setState({open: false});
    //if (this.props.showInfo !== newProps.showInfo && newProps.showInfo.show && newProps.showInfo && newProps.showInfo.show.id)
     // this.props.getShowSeasonInfo(newProps.showInfo.show.id,1);
  }

  backToSrch = () => {
    browserHistory.push('/search');
  };

  seasonChange = (event, index, season) => {
    this.setState({season});
    //this.props.getShowSeasonInfo(this.props.showInfo.show.id,season);
  };

  mkSeasonDropDown (){
    if (!this.props.showInfo.show.numSeasons) return (<div>Number of season's not available</div>);
    const seasons = [];
    for (let i = 0; i < this.props.showInfo.show.numSeasons; i++) {
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
    if (!this.props.showInfo.show.cast) return (<div>Cast not available</div>);
    return (
      <div style={{display: 'inline-flex'}}>
        {this.props.showInfo ? this.props.showInfo.show.cast.map((cast) => (
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
            <img style={{width: '100%', padding: 10, height: '100%'}} src={this.props.showInfo.show ? this.props.showInfo.show.poster : Logo}/>
          </Paper>
          <div style={{paddingLeft: 15, width: '70%'}}>
            <div style={{paddingBottom: 20}}>
              <Paper id="show-synopsis" style={{height: '45%', padding: 10, overflowY: 'auto'}} zDepth={5} >
                <h3 style={{textAlign: 'center'}}>Synopsis</h3>
                <br />
                {this.props.showInfo.show.summary ? this.props.showInfo.show.summary : "..."}
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
          <div style={{display: 'inline-flex'}}>
            <div style={{paddingRight: 15}}>
              <Paper id="show-seasons" zDepth={5} style={{overflowY: 'auto'}} >
                {this.mkSeasonDropDown()}
              </Paper>
            </div>
            <Paper id="show-episodes" zDepth={5} style={{overflowY: 'auto'}}>
              Episodes
            </Paper>
          </div>
        </div>
      </div>
    );
    const noInfo = (
      <div id="show-info-no-info">
        Please go back to search page to find the show you are looking for
        <br />
        <div style={{textAlign: 'center'}}>
          <RaisedButton label="Go back to search" primary onTouchTap={this.backToSrch} />
        </div>
      </div>
    );
    return (
      <div id="show-info-page" style={{minHeight: '100%'}}>
        {this.props.showInfo.show ? showInfo : noInfo}
      </div>
    );
  }
}
