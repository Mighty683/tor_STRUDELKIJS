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
        <canvas ref={this.myRef} width="200" height="200" />
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
            label: 'Data 2',
            data: [20, 18, 15],
            pointBackgroundColor: '#609ACF',
            pointHitRadius: 25
          },
          {
            label: 'Data 1',
            data: [5, 18, 15]
          }
        ]
      },
      options: {
        scale: {
          display: true
        },
        dragData: this.props.nieprzesuwable,
        dragDataRound: 0,
        onDragEnd: function(event, datasetIndex, index, value) {
          console.log('elo');
        }
      }
    });
  }
}

export default Star;
