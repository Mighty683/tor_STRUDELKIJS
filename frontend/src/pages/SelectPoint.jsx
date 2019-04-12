import React, { Component } from 'react';
import Map from '../components/map';
import requests from '../requests';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      points: []
    };
  }

  async componentDidMount() {
    try {
      const points = await requests.getPoints(52, 21);
      console.log(points);
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return <div>test</div>;
  }
}

export default Main;
