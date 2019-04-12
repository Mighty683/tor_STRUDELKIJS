import React, { Component } from 'react';
import { Chart } from 'chart.js';

class Star extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return (
      <div>
        <p>{this.props.data}</p>
        <canvas ref={this.myRef} width="200" height="200" />
      </div>
    );
  }

  componentDidMount() {
    const myRadarChart = new Chart(this.myRef.current, {
      type: 'radar',
      data: {
        labels: ['Running', 'Swimming', 'Eating'],
        datasets: [
          {
            data: [20, 10, 4]
          }
        ]
      },
      options: {
        scale: {
          // Hides the scale
          display: true
        }
      }
    });
  }
}

export default Star;
