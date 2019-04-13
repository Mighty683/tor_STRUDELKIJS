import React, { Component } from 'react';
import Map from '../../components/map';
import requests from '../../requests';
import Star from '../../components/star';
import { Spin } from 'antd';

import './style.scss';
class Main extends Component {
  constructor() {
    super();
    this.state = {
      points: [],
      selectedPoint: null
    };

    this.onPointSelect = this.onPointSelect.bind(this);
  }

  onPointSelect(id) {
    this.setState({
      selectedPoint: this.state.points.find(point => point.id === id)
    });
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
      <div className="select-point">
        {this.state.points.length ? (
          <div>
            <Map
              onPointSelect={this.onPointSelect}
              points={this.state.points}
            />
            <div className="select-point__info-container">
              {this.state.selectedPoint ? (
                <Star
                  key={this.state.selectedPoint.id}
                  data={Object.values(this.state.selectedPoint.ratings)}
                />
              ) : null}
            </div>
          </div>
        ) : (
          <div className="select-point__spinner-container">
            <Spin size="large" tip="Ładowanie..." />
          </div>
        )}
      </div>
    );
  }
}

export default Main;
