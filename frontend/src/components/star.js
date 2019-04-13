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
  }

  componentWillUnmount() {
    this.myRadarChart.destroy();
  }

  render() {
    return (
      <div>
        <canvas
          ref={this.myRef}
          style={{
            maxWidth: '400px',
            maxHeight: '400px'
          }}
        />
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
            pointBackgroundColor: 'rgba(255, 90, 0, 1)',
            pointBorderColor: 'rgba(255, 90, 0, 1)',
            backgroundColor: 'rgba(255, 90, 0, 1)',
            data: this.props.data,
            pointHitRadius: 25
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scale: {
          pointLabels: {
            fontColor: 'black',
            fontSize: 20
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
