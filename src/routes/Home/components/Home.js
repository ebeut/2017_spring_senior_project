import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

export default class HomePage extends Component {
  componentWillMount () {
    browserHistory.push("/home");
  }
  render () {
    return (
      <div id="home-page-push">
        <h4>Still need the router to push to /home</h4>
      </div>
    )
  }
}
