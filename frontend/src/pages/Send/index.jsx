import React, { Component } from 'react';
import Star from '../../components/star';
import Rating from '../../components/rating';

import './style.scss';
import { Button, Card, Col, Icon, Modal, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

class Send extends Component {
  constructor(props) {
    super();
    this.state = {
      points: [],
      selectedPoint: null,
      ratings: [3, 3, 3],
      overall: 6,
      modalOpen: false,
      point: props.location.state && props.location.state.point
    };
  }

  onDataChange = (event, datasetIndex, index, value) => {
    this.setState(state => {
      const ratings = state.ratings.map((item, j) => {
        if (index === j) {
          return value;
        } else {
          return item;
        }
      });
      return {
        ratings,
        overall: (ratings.reduce((a, r) => a + r, 0) / 3) * 2
      };
    });
  };

  showModal = () => {
    this.setState(state => ({
      modalOpen: !state.modalOpen
    }));
  };

  render() {
    return (
      <div className="send">
        <div className="send__title">
          <Title style={{ textAlign: 'center' }} level={3}>
            Oceń punkt odbioru <Icon type="smile" />
          </Title>
        </div>
        <Row gutter={16}>
          <Col className="gutter-row" xs={24} md={24} lg={24} xl={12}>
            <div className="gutter-box">
              <Card
                hoverable
                title={
                  <strong>Szczegóły ocenianego punktu odbioru przesyłek</strong>
                }
                bordered
              >
                <Rating data={this.state.point} />
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" xs={24} md={24} lg={24} xl={12}>
            <div className="gutter-box">
              <Card
                hoverable
                title={
                  <strong>
                    Kliknij aby ocenić wybrany punkt odbioru przesyłki
                  </strong>
                }
                bordered
              >
                <Star
                  overall={this.state.overall}
                  nieprzesuwable={true}
                  data={this.state.ratings}
                  onDataChange={this.onDataChange}
                />
              </Card>
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
            <div className="gutter-box">
              <div style={{ textAlign: 'center' }}>
                <Button
                  onClick={this.showModal}
                  className="main-page__button"
                  type="primary"
                >
                  <strong>Wyślij</strong>
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <Modal visible={this.state.modalOpen}>
          <Title style={{ textAlign: 'center' }} level={1}>
            <p>Dziękujemy!</p>
            <p>Twoja ocena to: {this.state.overall}</p>
            <Icon type="gift" theme="filled" />
          </Title>
          <div style={{ textAlign: 'center' }}>
            <Link to="/select-point">
              <Button
                style={{ marginRight: '10px' }}
                className="main-page__button"
                type="primary"
              >
                <strong>Zakończ</strong>
              </Button>
            </Link>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Send;
