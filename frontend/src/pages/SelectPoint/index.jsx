import React, { Component } from 'react';
import Map from '../../components/map';
import requests from '../../requests';
import Star from '../../components/star';
import { Spin, Card, Row, Col, Typography, Icon, Button, Modal } from 'antd';
import Rating from '../../components/rating';

import { Link } from 'react-router-dom';

import Geolib from 'geolib';
import './style.scss';

const { Title } = Typography;

class Main extends Component {
  static defaultProps = {
    lan: 52,
    lng: 21
  };

  constructor() {
    super();
    this.state = {
      points: [],
      selectedPoint: null,
      modalOpen: false
    };

    this.onPointSelect = this.onPointSelect.bind(this);
    this.findBetterPoint = this.findBetterPoint.bind(this);
  }

  onPointSelect(id) {
    if (this.state.selectedPoint) {
      this.findBetterPoint(this.state.selectedPoint);
    }
    this.setState({
      selectedPoint: this.state.points.find(point => point.id === id)
    });
  }

  findBetterPoint(point) {
    const betterPoints = this.state.points
      .filter(p => {
        return p.overAllRating > point.overAllRating;
      })
      .filter(p => {
        const userLocation = {
          latitude: this.props.lan,
          longitude: this.props.lng
        };
        const pD = Geolib.getDistance(userLocation, {
          latitude: p.coordinates[0],
          longitude: p.coordinates[1]
        });
        const pointDistance = Geolib.getDistance(userLocation, {
          latitude: point.coordinates[0],
          longitude: point.coordinates[1]
        });

        return pD < pointDistance;
      });

    if (betterPoints.length) {
      return betterPoints[0];
    }
  }

  async componentDidMount() {
    try {
      const points = await requests.getPoints(this.props.lan, this.props.lng);
      if (points && points.data) {
        this.setState({
          points: points.data
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  showModal = () => {
    this.setState(state => ({
      modalOpen: !state.modalOpen
    }));
  };

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
                              <strong>Ocena punktu odbioru przesyłek</strong>
                            }
                            bordered
                          >
                            <Star
                              overall={this.state.selectedPoint.overAllRating}
                              key={this.state.selectedPoint.id}
                              data={Object.values(
                                this.state.selectedPoint.ratings
                              )}
                              overallRating={
                                this.state.selectedPoint.overallRating
                              }
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
                                Szczegóły punktu odbioru przesyłek
                              </strong>
                            }
                            bordered
                          >
                            <Rating
                              key={this.state.selectedPoint.id}
                              data={this.state.selectedPoint}
                              hours
                            />
                          </Card>
                        </div>
                      </Col>
                      <Row gutter={16}>
                        <Col className="gutter-row" xs={24}>
                          <div style={{ textAlign: 'center' }}>
                            <Button
                              onClick={this.showModal}
                              className="main-page__button"
                              type="primary"
                            >
                              <strong>Wybieram punkt!</strong>
                            </Button>
                          </div>
                        </Col>
                      </Row>
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
            {this.state.selectedPoint ? (
              <Modal
                style={{ textAlign: 'center' }}
                visible={this.state.modalOpen}
                closable
                onCancel={this.showModal}
              >
                <Title level={1}>
                  <Icon type="gift" theme="filled" />
                </Title>
                <Title level={4} style={{ marginBottom: '30px' }}>
                  Nasz system znalazł świetny punkt odbioru bliżej Ciebie!
                </Title>
                <Row gutter={25} type="flex" align="top">
                  <Col className="gutter-row" xs={24} md={24} lg={24} xl={12}>
                    <div className="gutter-box">
                      <p>Aktualnie wybrany punkt:</p>
                      <Rating
                        key={this.state.selectedPoint.id}
                        data={this.state.selectedPoint}
                      />
                      <Star
                        overall={this.state.selectedPoint.overAllRating}
                        key={this.state.selectedPoint.id}
                        data={Object.values(this.state.selectedPoint.ratings)}
                        overallRating={this.state.selectedPoint.overallRating}
                      />
                    </div>
                  </Col>
                  <Col className="gutter-row" xs={24} md={24} lg={24} xl={12}>
                    <div className="gutter-box">
                      <p>
                        <strong>Punkt odbioru położony bliżej:</strong>
                      </p>
                      <Rating
                        key={this.findBetterPoint(this.state.selectedPoint).id}
                        data={this.findBetterPoint(this.state.selectedPoint)}
                      />
                      <Star
                        overall={
                          this.findBetterPoint(this.state.selectedPoint)
                            .overAllRating
                        }
                        key={this.findBetterPoint(this.state.selectedPoint).id}
                        data={Object.values(
                          this.findBetterPoint(this.state.selectedPoint).ratings
                        )}
                        overallRating={
                          this.findBetterPoint(this.state.selectedPoint)
                            .overallRating
                        }
                      />
                    </div>
                  </Col>
                </Row>
                <div>
                  <Link
                    to={{
                      pathname: '/send',
                      state: {
                        elo: this.state.selectedPoint
                      }
                    }}
                  >
                    <Button className="button-modal-first">Innym razem</Button>
                  </Link>
                  <Link
                    to={{
                      pathname: '/send',
                      state: {
                        elo: this.state.selectedPoint
                      }
                    }}
                  >
                    <Button className="ant-btn-primary button-modal-second">
                      Zgadzam się!
                    </Button>
                  </Link>
                </div>
              </Modal>
            ) : null}
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
