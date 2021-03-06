import React, { Component } from 'react';
import { Chart } from 'chart.js';
import 'chartjs-plugin-dragdata';
import {
  SERVICE,
  AVAILABILITY,
  TIME_OF_RETRIVAL
} from '../common/criteria.enum';

import { Typography } from 'antd';

const { Title } = Typography;

class Star extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      isMobile: window.innerWidth < 720
    };
  }

  componentWillUnmount() {
    this.myRadarChart.destroy();
  }

  componentDidUpdate() {
    this.updateChart(this.props);
  }

  render() {
    const parcelOverall = this.props.overall && this.props.overall.toFixed(2);
    let parcelOverallMarkup;

    switch (Math.round(parcelOverall)) {
      case 1:
        parcelOverallMarkup = (
          <span className="text-red">{parcelOverall} 😞 😞 😞</span>
        );
        break;
      case 2:
        parcelOverallMarkup = (
          <span className="text-red">{parcelOverall} 😞 😞</span>
        );
        break;
      case 3:
        parcelOverallMarkup = (
          <span className="text-red">{parcelOverall} 😞</span>
        );
        break;
      case 4:
        parcelOverallMarkup = (
          <span className="text-orange">{parcelOverall} 😔 😔 😔</span>
        );
        break;
      case 5:
        parcelOverallMarkup = (
          <span className="text-orange">{parcelOverall} 😔 😔</span>
        );
        break;
      case 6:
        parcelOverallMarkup = (
          <span className="text-orange">{parcelOverall} 😔</span>
        );
        break;
      case 7:
        parcelOverallMarkup = (
          <span className="text-green">{parcelOverall} 😁</span>
        );
        break;
      case 8:
        parcelOverallMarkup = (
          <span className="text-green">{parcelOverall} 😁 😁</span>
        );
        break;
      case 9:
        parcelOverallMarkup = (
          <span className="text-green">{parcelOverall} 😁 😁 😁</span>
        );
        break;
      case 10:
        parcelOverallMarkup = (
          <span className="text-pink">{parcelOverall} ❤️</span>
        );
        break;
      default:
        parcelOverallMarkup = '';
    }

    return (
      <div className={this.props.className}>
        <Title level={3} style={{ marginBottom: '30px' }}>
          Ogólna ocena: {parcelOverallMarkup}
        </Title>
        <canvas ref={this.myRef} />
        {this.state.isMobile ? (
          <div className="legend">
            Legenda:
            <p>
              <span className="dot green" /> - {SERVICE}
            </p>
            <p>
              <span className="dot blue" /> - {AVAILABILITY}
            </p>
            <p>
              <span className="dot red" /> - {TIME_OF_RETRIVAL}
            </p>
          </div>
        ) : null}
      </div>
    );
  }

  updateChart = props => {
    this.myRadarChart.data = this.getGraphData(props);
    this.myRadarChart.options = this.getGraphOptions(props);
    this.myRadarChart.update();
  };

  getGraphOptions = props => {
    let that = this;
    return {
      layout: {
        padding: 5
      },
      aspectRatio: this.isMobile ? 1 : 2,
      maintainAspectRatio: true,
      legend: {
        display: false
      },
      scale: {
        pointLabels: {
          fontColor: 'black',
          fontSize: 16,
          display: !this.state.isMobile
        },
        display: true,
        gridLines: {
          color: this.graphColor,
          lineWidth: 3,
          circular: true
        },
        scaleLabel: {
          display: true
        },
        ticks: {
          min: 0,
          max: 5,
          display: false,
          maxTicksLimit: 1
        }
      },
      dragData: props.nieprzesuwable,
      animation: !props.nieprzesuwable,
      dragDataRound: 0,
      onDragEnd: function(event, datasetIndex, index, value) {
        if (value >= 1) {
          that.props.onDataChange &&
            that.props.onDataChange(event, datasetIndex, index, value);
        }
      }
    };
  };

  getGraphData = props => {
    const parcelOverallReal = props.overall;
    let parcelOverallColor;

    switch (Math.round(parcelOverallReal)) {
      case 1:
        parcelOverallColor = '#d50000';
        break;
      case 2:
        parcelOverallColor = '#d50000';
        break;
      case 3:
        parcelOverallColor = '#d50000';
        break;
      case 4:
        parcelOverallColor = '#ff8f00';
        break;
      case 5:
        parcelOverallColor = '#ff8f00';
        break;
      case 6:
        parcelOverallColor = '#ff8f00';
        break;
      case 7:
        parcelOverallColor = '#43a047';
        break;
      case 8:
        parcelOverallColor = '#43a047';
        break;
      case 9:
        parcelOverallColor = '#43a047';
        break;
      case 10:
        parcelOverallColor = '#f50057';
        break;
      default:
        parcelOverallColor = '';
    }
    this.graphColor = parcelOverallColor;
    return {
      labels: [SERVICE, AVAILABILITY, TIME_OF_RETRIVAL],
      datasets: [
        {
          pointHoverBackgroundColor: 'transparent',
          pointBorderColor: 'rgba(255, 90, 0, 0)',
          backgroundColor: `${parcelOverallColor}`,
          pointBackgroundColor: ['#006600', '#333399', '#cc0000'],
          data: props.data,
          pointHitRadius: 25,
          pointRadius: 5
        }
      ]
    };
  };

  componentDidMount() {
    const that = this;
    this.myRadarChart = new Chart(this.myRef.current, {
      type: 'radar',
      data: this.getGraphData(this.props),
      options: this.getGraphOptions(this.props)
    });
  }
}

export default Star;
