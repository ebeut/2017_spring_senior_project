import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import LeftNav from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import { blue500 } from 'material-ui/styles/colors';
import Search from 'material-ui/svg-icons/action/search';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Home from 'material-ui/svg-icons/action/Home';
import Event from 'material-ui/svg-icons/action/event';
import GoogleLogin from 'react-google-login';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app'
import Settings from 'material-ui/svg-icons/action/settings'
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new'


// just for toggle for testing
const styles = {
  thumbSwitched: {
    backgroundColor: '#ec407a',
  },
  trackSwitched: {
    backgroundColor: '#f8bbd0',
  },
  labelStyle: {
    color: 'white',
  },
};

export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            logged: false,
        };

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

    handleChange = (event, logged) => {
        // Used for logged toggle
        this.setState({logged: logged});
    };
    onSuccessfullLogin = (response) => {
      console.log ("logged in successfully", response)
    }
    onFailedLogin = (response) => {
      console.log ("logged in failed", response)
    }
    render () {
        let calendarMenuItem = null;
        let settingsMenuItem = null;
        let loginButton = null;

        // check if logged in
        if(this.state.logged) {
            calendarMenuItem = ((
                <MenuItem
                    leftIcon={< Event />}
                    //onClick={() => this.dispatchNewRoute('/counter')}
                    style={{
                        textAlign: 'left',
                    }}
                >
                    Calendar
                </MenuItem>
            ));

            settingsMenuItem = ((
                <MenuItem
                    leftIcon={< Settings />}
                    //onClick={() => this.dispatchNewRoute('/counter')}
                    style={{
                        textAlign: 'left',
                    }}
                >
                    Settings
                </MenuItem>
            ));

            loginButton = ((
              <GoogleLogin
            clientId="577924513252-oqhh3vilv5pkcjsvtrga222vcepv0303.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.onSuccessfullLogin}
            onFailure={this.onFailedLogin}
          />
            ));
        }
        else {
            loginButton = ((
              <GoogleLogin
            clientId="577924513252-oqhh3vilv5pkcjsvtrga222vcepv0303.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.onSuccessfullLogin}
            onFailure={this.onFailedLogin}
          />
            ));
        }

        return (
            <div>
                <LeftNav
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
                                    backgroundColor: blue500
                                }}
                            >
                                <Avatar size={100} icon={< AccountCircle />} />
                                <Toggle // toggle for testing
                                    label="Logged"
                                    defaultToggled={false}
                                    onToggle={this.handleChange}
                                    labelPosition="right"
                                    thumbSwitchedStyle={styles.thumbSwitched}
                                    trackSwitchedStyle={styles.trackSwitched}
                                    labelStyle={styles.labelStyle}
                                    style={{
                                        margin: 20
                                    }}
                                />
                            </div>
                            <MenuItem
                                leftIcon={< Home />}
                                onClick={() => this.dispatchNewRoute('/')}
                                style={{
                                    textAlign: 'left',
                                }}
                            >
                                Home
                            </MenuItem>

                            <MenuItem
                                leftIcon={< Search />}
                                onClick={() => this.dispatchNewRoute('/search')}
                                style={{
                                    textAlign: 'left',
                                }}
                            >
                                Search
                            </MenuItem>

                            {calendarMenuItem}

                            {settingsMenuItem}
                        </div>
                    }
                </LeftNav>
                <AppBar
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
