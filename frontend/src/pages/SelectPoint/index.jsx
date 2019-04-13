import React, { Component } from 'react';
import Map from '../../components/map';
import requests from '../../requests';
import Star from '../../components/star';
import { Spin, Card, Row, Col, Typography, Icon } from 'antd';

import './style.scss';

const { Title } = Typography;

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
                <div style={{ background: '#ECECEC', padding: '30px' }}>
                  <Row gutter={16}>
                    <Col className="gutter-row" xs={24} md={12}>
                      <div className="gutter-box">
                        <Card
                          hoverable
                          title={
                            <strong>Szczegóły punktu odbioru przesyłek:</strong>
                          }
                          bordered
                        />
                      </div>
                    </Col>
                    <Col className="gutter-row" xs={24} md={12}>
                      <div className="gutter-box">
                        <Card
                          hoverable
                          title={
                            <strong>Ocena punktu odbioru przesyłek:</strong>
                          }
                          bordered
                        >
                          <Star
                            key={this.state.selectedPoint.id}
                            data={Object.values(
                              this.state.selectedPoint.ratings
                            )}
                          />
                        </Card>
                      </div>
                    </Col>
                  </Row>
                </div>
              ) : (
                <Title style={{ textAlign: 'center' }} level={3}>
                  Wybierz swój punkt odbioru paczki <Icon type="smile" />
                </Title>
              )}
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
