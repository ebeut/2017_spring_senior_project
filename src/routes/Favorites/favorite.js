import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import FavoriteHeart from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import { pinkA200 } from 'material-ui/styles/colors';
import Header from '../../components/Header';
import LogoutDlg from '../../components/LogoutDlg';
import Loading from '../../components/Loading';


export default class Favorite extends Component {

  constructor (props) {
    super(props);
    this.state = {
      open: false,
      logout: false,
      userName: '',
      favTitles: [],
    }
  }

  static propTypes = {
    favInfo: PropTypes.object,
    userData: PropTypes.object,
    getFav: PropTypes.func,
    isLogin: PropTypes.func,
    logout: PropTypes.func,
    delFavorite: PropTypes.func,
    addFavorite: PropTypes.func,
  };

  componentWillMount() {
    this.props.isLogin();
    this.setState({open: true});
  }

  componentWillReceiveProps (newProps) {
    if (this.props.userData !== newProps.userData && newProps.userData.logoutData) {
      this.setState({logout: true});
    }
    if (this.props.userData !== newProps.userData && newProps.userData.loginData) {
      if (newProps.userData.loginData !== 'N/A') {
        const userName = newProps.userData.loginData;
        this.setState({userName});
        this.props.getFav(newProps.userData.loginData)
      }
    }

    if(this.props.showData !== newProps.showData && newProps.showData.show) {
        if(newProps.showData.show.id) {
            // information to be saved from show details request
            let favTitles = this.state.favTitles;
            var temp = {
                'id': newProps.showData.show.id,
                'title': newProps.showData.show.title,
                'summary': newProps.showData.show.summary,
            }
            favTitles.push(temp);
            this.setState({open: false, favTitles});
        }
    }

    if(this.props.favInfo !== newProps.favInfo) {
        if(newProps.favInfo.favorites) {
            for(var i = 0; i < newProps.favInfo.favorites.length; i++) {
                var show = newProps.favInfo.favorites[i]
                this.props.getShowInfo(show)
            }
        } else {
          this.setState({open: false})
        }
    }
  }

checkFav = (fav, bool) => {
    if (bool)
      this.props.addFavorite(this.state.userName, fav.id);
    else
      this.props.delFavorite(this.state.userName, fav.id);
  }

mkFavList() {
    if (!this.state.favTitles || this.state.favTitles.length < 1) return (<div id="fav-no-tiles" />);
    const favs = (
        <List>
            { this.state.favTitles.map((fav) => (
                <div key={fav.id} style={{height: '100%', cursor: 'pointer'}}>
                    <ListItem
                        style={{height: '100%', cursor: 'pointer'}}
                        primaryText={`${fav.title}`}
                        secondaryText={<div style={{height: '100%', overflow: 'visible', whiteSpace: 'normal'}}>{`${fav.summary}`}</div>}
                        leftCheckbox= {
                            <Checkbox
                              checkedIcon={< FavoriteHeart />}
                              uncheckedIcon={< FavoriteBorder />}
                              iconStyle={{fill: pinkA200}}
                              defaultChecked={true}
                              onCheck={ (evt,bool) => {this.checkFav(fav,bool) }}
                            />
                        }
                    />
                    <Divider />
                </div>
            ))}
        </List>
    );
    return favs
}

  render () {

    return (
      <div style={{width: '100%'}}>
        <LogoutDlg open={this.state.logout} email={this.state.userName} />
        <Header userEmail={this.state.userName ? this.state.userName : ''} logout={this.props.logout} />
        <Loading id="favorite-loading" open={this.state.open} />

        <h4 style={{textAlign: 'center', paddingTop: 25}}>
            Manage Favorites
        </h4>

        <div style={{ width: '75%', margin: '0 auto' }}>
            {this.mkFavList()}
        </div>
    </div>
    );
  }
}
