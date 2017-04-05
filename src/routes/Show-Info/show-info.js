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
  };

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    if (this.props.showInfo.gettingShowInfo !== newProps.showInfo.gettingShowInfo && newProps.showInfo.gettingShowInfo)
      this.setState({open: true});
    if (this.props.showInfo.gettingShowInfo !== newProps.showInfo.gettingShowInfo && !newProps.showInfo.gettingShowInfo)
      this.setState({open: false});
  }

  backToSrch = () => {
    browserHistory.push('/search');
  };

  seasonChange = (event, index, season) => {
    this.setState({season});
  };

  mkSeasonDropDown (){
    if (!this.props.showInfo.showInfo) return (<div />);
    const seasons = []
    for (let i = 0; i < this.props.showInfo.showInfo.numSeasons; i++) {
      seasons.push(i+1);
    }
    return (
    <DropDownMenu value={this.state.season} onChange={this.seasonChange}>
      {seasons.map((season) => (
        <MenuItem key={season} value={season} primaryText={season} />
      ))}
    </DropDownMenu>
    )
  }

  mkCast () {
    if (!this.props.showInfo.showInfo) return (<div />);
    return (
      <div style={{display: 'inline-flex'}}>
        {this.props.showInfo.showInfo.cast.map((cast) => (
          <div key={cast.character} style={{paddingLeft: 15}}>
            <h3>
              {`${cast.name} as ${cast.character}`}
            </h3>
            <img src={cast.image} />
          </div>
        ))}
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
          {console.log(this.props)}
          <Paper id="show-poster" style={{width: '25%'}} zDepth={5} >
            <img style={{width: '100%', padding: 10, height: '100%'}} src={this.props.showInfo.showInfo ? this.props.showInfo.showInfo.poster : Logo}/>
          </Paper>
          <div style={{paddingLeft: 15, width: '70%'}}>
            <div style={{paddingBottom: 20}}>
              <Paper id="show-synopsis" style={{height: '45%', padding: 10, overflowY: 'auto'}} zDepth={5} >
                <h3 style={{textAlign: 'center'}}>Synopsis</h3>
                <br />
                {this.props.showInfo.showInfo ? this.props.showInfo.showInfo.summary : "..."}
              </Paper>
            </div>
            <div style={{textAlign: 'center'}}>
              <Paper id="show-cast" style={{width: '70%', height: '45%', padding: 10, overflowY: 'auto'}} zDepth={5} >
                <h3 style={{textAlign: 'center'}}>Cast</h3><br />
                {this.mkCast()}
              </Paper>
            </div>
          </div>
        </div>
        <div>
          <Paper id="show-episodes" zDepth={5} style={{overflowY: 'auto'}}>Episodes</Paper>
          <Paper is="show-seasons" zDepth={5} style={{overflowY: 'auto'}} >
            {this.mkSeasonDropDown()}
          </Paper>
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
        {this.props.showInfo.showInfo ? showInfo : noInfo}
      </div>
    );
  }
}
