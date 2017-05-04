import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Header from '../../../components/Header';

export default class HomePage extends Component {
  componentWillMount () {
    browserHistory.push("/home");
  }
  render () {
    return (
      <div id="home-page-push" >
        <Header />
      </div>
    )
  }
}
