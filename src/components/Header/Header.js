import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import LeftNav from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import { blueA700 } from 'material-ui/styles/colors';
import Search from 'material-ui/svg-icons/action/search';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Favorite from 'material-ui/svg-icons/action/favorite';
import Event from 'material-ui/svg-icons/action/event';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app'

export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
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

    render () {
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
                                    backgroundColor: blueA700
                                }}
                            >
                                <Avatar size={100} icon={< AccountCircle />} />
                            </div>
                            <MenuItem
                                leftIcon={< Favorite />}
                                onClick={() => this.dispatchNewRoute('/')}
                                style={{
                                    textAlign: 'left',
                                }}
                            >
                                Home
                            </MenuItem>

                            <MenuItem
                                leftIcon={< Search />}
                                onClick={() => this.dispatchNewRoute('/counter')}
                                style={{
                                    textAlign: 'left',
                                }}
                            >
                                Search
                            </MenuItem>

                            <MenuItem
                                leftIcon={< Event />}
                                //onClick={() => this.dispatchNewRoute('/counter')}
                                style={{
                                    textAlign: 'left',
                                }}
                            >
                                Calendar
                            </MenuItem>

                            <MenuItem
                                leftIcon={< ExitToApp />}
                                //onClick={() => this.dispatchNewRoute('/counter')}
                                style={{
                                    textAlign: 'left',
                                }}
                            >
                                Sign Out
                            </MenuItem>
                        </div>
                    }
                </LeftNav>
                <AppBar
                    title="The Watch List"
                    iconElementRight={<IconButton>< Search /></IconButton>}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={() => this.openNav()}
                    style={{
                        backgroundColor: blueA700,
                        textAlign: 'left',
                    }}
                />
            </div>
        );
    }
}

export default Header
