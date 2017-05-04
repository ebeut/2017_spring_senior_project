import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import AppBar from 'material-ui/AppBar'
import LeftNav from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'
import { blue500 } from 'material-ui/styles/colors'
import Search from 'material-ui/svg-icons/action/search'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import Home from 'material-ui/svg-icons/action/Home'
import Event from 'material-ui/svg-icons/action/event'
import FlatButton from 'material-ui/FlatButton'
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app'
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new'
import Favorite from 'material-ui/svg-icons/action/favorite'

export class Header extends Component {
  constructor(props) {
      super(props);
      this.state = {
          open: false,
          logged: false,
      };
  }

  static propTypes = {
    userEmail: PropTypes.string,
    logout: PropTypes.func,
  };

  componentWillMount () {
    const logged = !!this.props.userEmail;
    this.setState({logged})
  }

  componentWillReceiveProps (newProps) {
      if (this.props.userEmail !== newProps.userEmail) {
        this.setState({logged: !!newProps.userEmail});
      }
  }

    dispatchNewRoute(route) {
        // Used in LeftNav onClick to route to different pages
        browserHistory.push(route);
        this.setState({
            open: false,
        });

    }

    handleClickOutside() {
        // Used to close LeftNav on click outside of it
        this.setState({
            open: false,
        });
    }

    openNav() {
        // Used to open LeftNav when the left menu button is clicked
        this.setState({
            open: true,
        });
    }

    login = () => {
      browserHistory.push('/login');
    };

    logOut = () => {
      this.props.logout(this.props.userEmail);
    };

    handleChange = (event, logged) => {
        // Used for logged toggle
        this.setState({logged: logged});
    };
    render () {
        let settingsMenuItem = null;
        let loginButton = null;

        // check if logged in
        if(this.state.logged) {
            settingsMenuItem = ((
                <MenuItem
                    id="header-favorite-btn"
                    leftIcon={< Favorite />}
                    onClick={() => this.dispatchNewRoute('/favorites')}
                    style={{
                        textAlign: 'left',
                    }}
                >
                    Favorites
                </MenuItem>
            ));

            loginButton = (
                <FlatButton
                  id="header-login-btn"
                  onTouchTap={this.logOut}
                  label="Logout"
                  icon={< PowerSettingsNew />}
                />
            );
        }
        else {
            loginButton = (
              <FlatButton
                id="header-logout-btn"
                onTouchTap={this.login}
                label="Login"
                icon={< ExitToApp />}
              />
            );
        }

        return (
            <div id="header">
                <LeftNav
                    id="header-left-nav"
                    open={this.state.open}
                    onRequestChange={() => this.handleClickOutside()}
                    docked={false}
                >
                    {
                        <div>
                            <div
                                style={{
                                    textAlign: 'center',
                                    padding: '20px',
                                    paddingTop: '30px',
                                    backgroundColor: blue500
                                }}
                            >
                                <Avatar id="header-user-avatar" size={100} icon={< AccountCircle />} /><br /><br />
                              <p style={{color: "#ffffff", fontSize: 20}}>
                                {this.props.userEmail ? this.props.userEmail : ''}
                              </p>
                            </div>
                            <MenuItem
                                id="header-home-btn"
                                leftIcon={< Home />}
                                onClick={() => this.dispatchNewRoute('/')}
                                style={{
                                    textAlign: 'left',
                                }}
                            >
                                Home
                            </MenuItem>

                            <MenuItem
                                id="header-search-btn"
                                leftIcon={< Search />}
                                onClick={() => this.dispatchNewRoute('/search')}
                                style={{
                                    textAlign: 'left',
                                }}
                            >
                                Search
                            </MenuItem>

                            <MenuItem
                                id="header-calendar-btn"
                                leftIcon={< Event />}
                                onClick={() => this.dispatchNewRoute('/calendar')}
                                style={{
                                    textAlign: 'left',
                                }}
                            >
                                Calendar
                            </MenuItem>

                            {settingsMenuItem}
                        </div>
                    }
                </LeftNav>
                <AppBar
                    id="header-app-bar"
                    title="The Watch List"
                    iconElementRight={loginButton}
                    onLeftIconButtonTouchTap={() => this.openNav()}
                    style={{
                        backgroundColor: blue500,
                        textAlign: 'left',
                    }}
                />
            </div>
        );
    }
}

export default Header
