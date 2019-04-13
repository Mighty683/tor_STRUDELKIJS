import React, { Component } from 'react';
import Map from '../../components/map';
import requests from '../../requests';
import Star from '../../components/star';
import { Spin, List, Card } from 'antd';

import './style.scss';

const data = [
  {
    title: <strong>Szczegóły punktu odbioru</strong>,
    content: <div>test</div>
  },
  {
    title: <strong>Ocena punktu odbioru</strong>,
    content: <Star />
  }
];

class Main extends Component {
  constructor() {
    super();
    this.state = {
      points: []
    };

    this.onPointSelect = this.onPointSelect.bind(this);
  }

  onPointSelect(id) {
    console.log('Clicked', id);
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
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2
                }}
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <Card title={item.title}>{item.content}</Card>
                  </List.Item>
                )}
              />
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
