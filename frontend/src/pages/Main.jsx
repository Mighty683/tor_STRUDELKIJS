import React, { Component } from 'react';

import { Row, Col, Button, Icon, Typography } from 'antd';

const { Title } = Typography;

class Main extends Component {
  render() {
    return (
      <Row type="flex" justify="center" align="middle" className="main-page">
        <Col span={12}>
          <Title>Pimp my mailbox!</Title>

          <Button type="primary">
            Forward
            <Icon type="right" />
          </Button>
        </Col>
      </Row>
    );
  }
}

export default Main;
