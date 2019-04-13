import React, { Component } from 'react';
import { Chart } from 'chart.js';
import 'chartjs-plugin-dragdata';
import {
  SERVICE,
  AVAILABILITY,
  TIME_OF_RETRIVAL
} from '../common/criteria.enum';

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

  render() {
    return (
      <div className={this.props.className}>
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
              <div className="dot red" /> - {TIME_OF_RETRIVAL}
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
            backgroundColor: 'rgba(255, 90, 0, 1)',
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
            display: !this.state.isMobile
          },
          display: true,
          gridLines: {
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
        dragData: this.props.nieprzesuwable,
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
