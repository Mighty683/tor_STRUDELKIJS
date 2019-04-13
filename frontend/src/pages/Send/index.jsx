import React, { Component } from 'react';
import Star from '../../components/star';
import Rating from '../../components/rating';

import './style.scss';
import { Card, Col, Icon, Typography } from 'antd';

const { Title } = Typography;

class Send extends Component {
  constructor() {
    super();
    this.state = {
      points: [],
      selectedPoint: null,
      ratings: [0, 0, 0],
      elo: {}
    };
  }

  onDataChange = (event, datasetIndex, index, value) => {
    console.log(event);
    console.log(datasetIndex);
    console.log(index);
    console.log(value);
  };

  componentWillMount() {
    const { elo } = this.props.location.state;
    this.setState({
      elo
    });
  }

  componentDidMount() {
    const { elo } = this.props.location.state;
    this.setState({
      elo
    });
  }

  render() {
    const { elo } = this.props.location.state;
    console.log(elo);

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
              <Rating data={this.state.elo} />
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
      </div>
    );
  }
}

export default Send;
