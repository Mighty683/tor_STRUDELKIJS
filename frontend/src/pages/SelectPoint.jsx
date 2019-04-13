import React, { Component } from 'react';
import Map from '../components/map';
import requests from '../requests';
import Star from '../components/star';

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
      if (points && points.data) {
        this.setState({
          points: points.data
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <div>
        <Star />
        {this.state.points.length && <Map points={this.state.points} />}
      </div>
    );
  }
}

export default Main;
