import React, { Component } from 'react';
import RuchLogo from '../../assets/logo-ruch.svg';
import PocztaLogo from '../../assets/logo-poczta.svg';
import InpostLogo from '../../assets/logo-inpost.svg';

import './style.scss';

class Index extends Component {
  render() {
    const parcelType = this.props.data[2];
    let parcelRealName;
    let parcelLogo;

    switch (parcelType) {
      case 'POCZTA_POLSKA':
        parcelRealName = 'Poczta Polska';
        parcelLogo = PocztaLogo;
        break;
      case 'PACZKOMAT':
        parcelRealName = 'Paczkomat InPost';
        parcelLogo = InpostLogo;
        break;
      case 'RUCH':
        parcelRealName = 'Paczkomat InPost';
        parcelLogo = RuchLogo;
        break;
      default:
        parcelRealName = '';
    }
    return (
      <div>
        <img className="rating-image" src={parcelLogo} alt={parcelRealName} />
        <p>
          <strong>{parcelRealName}</strong>
        </p>
        <p>Adres:</p>
        <p>
          ul. {this.props.data.address.street}
          <br />
          {this.props.data.address.postalCode} {this.props.data.address.city}
        </p>

        <p>Godziny otwarcia: </p>
        {this.props.data.openHoures.map((day, i) => {
          return (
            <p key={i}>
              {day.day}: {day.from} - {day.to}
            </p>
          );
        })}
      </div>
    );
  }
}

export default Index;
