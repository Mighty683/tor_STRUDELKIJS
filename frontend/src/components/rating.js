import React, { Component } from 'react';

class Rating extends Component {
  render() {
    console.log(this.props.data);
    return (
      <div>
        <p>{this.props.data.type}</p>
        <p>{this.props.data.name}</p>
        <p>
          {this.props.data.address.city} {this.props.data.address.postalCode}{' '}
          {this.props.data.address.street}
        </p>

        <p>Open hours:</p>
        {this.props.data.openHours.map((day, i) => {
          return (
            <p>
              {day.day}: {day.from} - {day.to}
            </p>
          );
        })}
        {/*<p>{this.props.data.openHours[0].day}: {this.props.data.openHours[0].from} - {this.props.data.openHours[0].to}</p>*/}
      </div>
    );
  }
}

export default Rating;
