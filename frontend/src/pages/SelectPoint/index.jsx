import React, { Component } from 'react';
import Map from '../../components/map';
import requests from '../../requests';
import Star from '../../components/star';
import { Spin, Card, Row, Col, Typography, Icon } from 'antd';
import Rating from '../../components/rating';

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
          <Row gutter={16}>
            <Col className="gutter-row" xs={24} md={24} lg={24} xl={12}>
              <div className="gutter-box">
                <Map
                  selectedPoint={this.state.selectedPoint}
                  onPointSelect={this.onPointSelect}
                  points={this.state.points}
                />
              </div>
            </Col>
            <Col className="gutter-row" xs={24} md={24} lg={24} xl={12}>
              <div className="gutter-box">
                {this.state.selectedPoint ? (
                  <div className="select-point__info-container">
                    <Row gutter={16}>
                      <Col
                        className="gutter-row"
                        xs={24}
                        md={24}
                        lg={24}
                        xl={14}
                      >
                        <div className="gutter-box">
                          <Card
                            hoverable
                            title={
                              <strong>Ocena punktu odbioru przesyłek:</strong>
                            }
                            bordered
                          >
                            <Star
                              overall={this.state.selectedPoint.overAllRating}
                              key={this.state.selectedPoint.id}
                              data={Object.values(
                                this.state.selectedPoint.ratings
                              )}
                            />
                          </Card>
                        </div>
                      </Col>
                      <Col
                        className="gutter-row select-point__info-column"
                        xs={24}
                        md={24}
                        lg={24}
                        xl={10}
                      >
                        <div className="gutter-box">
                          <Card
                            hoverable
                            title={
                              <strong>
                                Szczegóły punktu odbioru przesyłek:
                              </strong>
                            }
                            bordered
                          >
                            <Rating
                              key={this.state.selectedPoint.id}
                              data={Object.values(this.state.selectedPoint)}
                            />
                          </Card>
                        </div>
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <div className="select-point__info-container--empty">
                    <Title style={{ textAlign: 'center' }} level={3}>
                      Wybierz swój punkt odbioru paczki <Icon type="smile" />
                    </Title>
                  </div>
                )}
              </div>
            </Col>
          </Row>
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
