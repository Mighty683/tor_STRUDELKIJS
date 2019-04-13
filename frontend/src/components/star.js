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
    let gridGreen = 0;
    let gridRed = 0;
    if (props.overallRating > 5) {
      gridGreen = 200 + 55 * ((props.overallRating - 5) / 5);
    } else {
      gridRed = 200 + 55 * ((5 - props.overallRating) / 5);
    }

    console.log(props.overallRating, gridGreen, gridRed);

    this.state = {
      gridColor: `rgba(${gridRed}, ${gridGreen}, 0, 1)`,
      isMobile: window.innerWidth < 720
    };
  }

  componentWillUnmount() {
    this.myRadarChart.destroy();
  }

  render() {
    const parcelOverall = this.props.overall;
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

  componentDidMount() {
    this.myRadarChart = new Chart(this.myRef.current, {
      type: 'radar',
      data: {
        labels: [SERVICE, AVAILABILITY, TIME_OF_RETRIVAL],
        datasets: [
          {
            pointHoverBackgroundColor: 'transparent',
            pointBorderColor: 'rgba(255, 90, 0, 1)',
            backgroundColor: 'rgba(255, 90, 0, 0.6)',
            pointBackgroundColor: ['#006600', '#333399', '#cc0000'],
            data: this.props.data,
            pointHitRadius: 25,
            pointRadius: 5
          }
        ]
      },
      options: {
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
            color: this.state.gridColor,
            lineWidth: 3,
            circular: true
          },
          scaleLabel: {
            display: true
          },
          ticks: {
            display: false,
            maxTicksLimit: 2
          }
        },
        dragData: !this.props.nieprzesuwable,
        dragDataRound: 0,
        onDragEnd: function(event, datasetIndex, index, value) {
          this.props.onDataChange &&
            this.props.onDataChange(event, datasetIndex, index, value);
        }
      }
    });
  }
}

export default Star;
