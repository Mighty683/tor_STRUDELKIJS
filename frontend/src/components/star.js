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
            label: 'Ocena',
            data: this.props.data,
            pointBackgroundColor: '#609ACF',
            pointHitRadius: 25
          }
        ]
      },
      options: {
        scale: {
          display: false
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
