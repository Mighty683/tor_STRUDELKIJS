import React, { Component } from 'react';
import Map from '../components/map';
import requests from '../requests';

class Main extends Component {
  constructor() {
    super();
    this.state.points = [];
  }

  async componentDidMount() {
    try {
      // TODO
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return <Map />;
  }
}

export default Main;
