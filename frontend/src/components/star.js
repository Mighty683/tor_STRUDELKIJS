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
            label: 'Ocena',
            data: this.props.data,
            pointBackgroundColor: '#609ACF',
            pointHitRadius: 25
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scale: {
          display: true,
          gridLines: {
            display: false,
            circular: false,
            drawTicks: false,
            lineWidth: 3
          },
          scaleLabel: {
            display: true
          },
          ticks: {
            display: false
          }
        },
        dragData: this.props.draggable,
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
