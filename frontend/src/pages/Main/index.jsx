import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Row, Col, Button, Typography, Icon } from 'antd';

import './style.scss';

import mark from '../../assets/mark.svg';

const { Title } = Typography;

class Main extends Component {
  render() {
    return (
      <Row type="flex" justify="center" align="middle" className="main-page">
        <Col span={24} style={{ textAlign: 'center' }}>
          <img className="main-page__icon" src={mark} alt="Mark" />
          <Title>Oceniator punktów 4000 🧠</Title>
          <Title level={3}>
            Narzędzie służące wyszukiwaniu oraz ocenianiu punktów odbioru
            przesyłek <Icon type="smile" />
          </Title>

          <Link to="/select-point">
            <Button className="main-page__button" type="primary">
              <strong>Zaczynam!</strong>
            </Button>
          </Link>
        </Col>
      </Row>
    );
  }
}

export default Main;
