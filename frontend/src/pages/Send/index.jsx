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
      ratings: [1, 1, 1],
      modalOpen: false,
      point: props.location.state && props.location.state.point
    };
  }

  onDataChange = (event, datasetIndex, index, value) => {
    console.log(event);
    console.log(datasetIndex);
    console.log(index);
    console.log(value);
  };

  showModal = () => {
    this.setState(state => ({
      modalOpen: !state.modalOpen
    }));
  };

  render() {
    return (
      <div>
        <div className="send__title">
          <Title style={{ textAlign: 'center' }} level={3}>
            Oceń punkt odbioru: <Icon type="smile" />
          </Title>
        </div>
        <Col className="gutter-row" xs={24} md={24} lg={24} xl={12}>
          <div className="gutter-box">
            <Card
              hoverable
              title={<strong>Szczegóły punktu odbioru przesyłek:</strong>}
              bordered
            >
              <Rating data={this.state.point} />
            </Card>
          </div>
        </Col>
        <Col className="gutter-row" xs={24} md={24} lg={24} xl={12}>
          <div className="gutter-box">
            <div className="send__info-container">
              <Star
                nieprzesuwable={false}
                data={this.state.ratings}
                onDataChange={this.onDataChange}
              />
            </div>
          </div>
        </Col>
        <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
          <div className="gutter-box">
            <div style={{ textAlign: 'center' }}>
              <Button
                onClick={this.showModal}
                className="main-page__button"
                type="primary"
              >
                <strong>Wyślij!</strong>
              </Button>
            </div>
          </div>
        </Col>

        <Modal visible={this.state.modalOpen}>
          <Title style={{ textAlign: 'center' }} level={1}>
            <p>Dziękujemy!</p>
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
