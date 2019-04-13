import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Main from './pages/Main';
import SelectPoint from './pages/SelectPoint';

import { Layout, Icon } from 'antd';

import './App.scss';

import logo from './assets/logo-allegro.svg';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <Layout className="layout">
          <Header>
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="Allegro" />
              </Link>
            </div>
          </Header>
          <Content>
            <Route path="/" exact component={Main} />
            <Route path="/select-point" component={SelectPoint} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <strong>Strudelki.js</strong> © 2019 Created with{' '}
            <Icon
              type="heart"
              className="icon-footer"
              theme="twoTone"
              twoToneColor="#eb2f96"
            />{' '}
            on Allegro BrainCode 2019 Toruń
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
