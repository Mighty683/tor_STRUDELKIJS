import React, { Component } from 'react';
import { Chart } from 'chart.js';

class Star extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    console.log(this.props.data);
    return (
      <div>
        <p>{this.props.data.address.postalCode}</p>
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
            data: [20, 18, 15]
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
