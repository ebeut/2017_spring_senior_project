import React, { Component, PropTypes } from 'react';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import FavoriteHeart from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import { pinkA200 } from 'material-ui/styles/colors';
import Header from '../../components/Header';
import LogoutDlg from '../../components/LogoutDlg';
import Loading from '../../components/Loading';

// dictionary for favorites checklist
var favTitles = []

export default class Favorite extends Component {

  constructor (props) {
    super(props);
    this.state = {
      open: false,
      logout: false,
      userName: '',
    }
  }

  static propTypes = {
    favInfo: PropTypes.object,
    userData: PropTypes.object,
    getFav: PropTypes.func,
    isLogin: PropTypes.func,
    logout: PropTypes.func,
  };

  componentWillMount() {
    this.props.isLogin();
   // this.setState({open: true});
  }

  componentWillReceiveProps (newProps) {
    if (this.props.userData !== newProps.userData && newProps.userData.logoutData) {
      this.setState({logout: true});
    }
    if (this.props.userData !== newProps.userData && newProps.userData.loginData) {
      if (newProps.userData.loginData === 'N/A') {
        console.log("something.....")
      } else {
        const userName = newProps.userData.loginData;
        this.setState({userName});
        this.props.getFav(newProps.userData.loginData)
      }
    }

    if(this.props.showData !== newProps.showData && newProps.showData) {
        if(newProps.showData.show.id) {
            // information to be saved from show details request
            var temp = {
                'id': newProps.showData.show.id,
                'title': newProps.showData.show.title,
                'summary': newProps.showData.show.summary,
            }
            console.log(temp)
            favTitles.push(temp)
        }
    }

    if(this.props.favInfo.favorites != newProps.favInfo.favorites) {
        if(newProps.favInfo.favorites) {
            for(var i = 0; i < newProps.favInfo.favorites.length; i++) {
                var show = newProps.favInfo.favorites[i]
                this.props.getShowInfo(show)
            }
        }
    }
  }

mkFavList() {
    const favs = (
        <List>
            { favTitles.map((fav) => (
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
            Favorites
        </h4>

        <div style={{ width: '75%', margin: '0 auto' }}>
            {this.mkFavList()}
        </div>
    </div>
    );
  }
}
