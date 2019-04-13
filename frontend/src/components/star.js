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
  render() {
    return (
      <div>
        <canvas ref={this.myRef} />
      </div>
    );
  }

  componentDidMount() {
    const myRadarChart = new Chart(this.myRef.current, {
      type: 'radar',
      data: {
        labels: [SERVICE, AVAILABILITY, TIME_OF_RETRIVAL],
        datasets: [
          {
            data: [20, 18, 15],
            pointBackgroundColor: '#609ACF',
            lineTension: 0
          },
          {
            data: [5, 18, 15],
            lineTension: 0
          }
        ]
      },
      options: {
        elements: {
          line: {
            borderWidth: 0,
            borderColor: 'red'
          }
        },
        scale: {
          // Hides the scale
          display: true
        },
        dragData: true,
        dragDataRound: 0,
        onDragEnd: function(event, datasetIndex, index, value) {
          console.log('elo');
        }
      }
    });
  }
}

export default Star;
