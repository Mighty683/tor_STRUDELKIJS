import React, { Component } from 'react';

class Rating extends Component {
  render() {
    const parcelType = this.props.data[2];
    let parcelRealName;

    switch (parcelType) {
      case 'POCZTA_POLSKA':
        parcelRealName = 'Poczta Polska';
        break;
      case 'PACZKOMAT':
        parcelRealName = 'Paczkomat InPost';
        break;
      case 'RUCH':
        parcelRealName = 'Paczkomat InPost';
        break;
      default:
        parcelRealName = '';
    }

    return (
      <div>
        <p>
          <strong>{parcelRealName}</strong>
        </p>
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
