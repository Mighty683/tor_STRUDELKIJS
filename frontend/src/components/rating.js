import React, { Component } from 'react';

class Rating extends Component {
  render() {
    return (
      <div>
        <p>{this.props.data[2]}</p>
        <p>
          {this.props.data[1].city} {this.props.data[1].postalCode}{' '}
          {this.props.data[1].street}
        </p>

        <p>Godziny otwarcia: </p>
        {this.props.data[5].map((day, i) => {
          return (
            <p key={i}>
              {day.day}: {day.from} - {day.to}
            </p>
          );
        })}
        {/*<p>*/}
        {/*  {this.props.data[5].day}: {this.props.data[5].from} -{' '}*/}
        {/*  {this.props.data[5].to}*/}
        {/*</p>*/}
      </div>
    );
  }
}

export default Rating;
