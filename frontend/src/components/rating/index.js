import React, { Component } from 'react';
import RuchLogo from '../../assets/logo-ruch.svg';
import PocztaLogo from '../../assets/logo-poczta.svg';
import InpostLogo from '../../assets/logo-inpost.svg';
import { INPOST, POLIST_POST, RUCH } from '../../common/delivery-point.enum';

import './style.scss';

class Index extends Component {
  render() {
    const parcelType = this.props.data.type;
    let parcelRealName;
    let parcelLogo;
    switch (parcelType) {
      case POLIST_POST:
        parcelRealName = 'Poczta Polska';
        parcelLogo = PocztaLogo;
        break;
      case INPOST:
        parcelRealName = 'Paczkomat InPost';
        parcelLogo = InpostLogo;
        break;
      case RUCH:
        parcelRealName = 'Paczkomat InPost';
        parcelLogo = RuchLogo;
        break;
      default:
        parcelRealName = '';
    }
    return (
      <div>
        <img className="rating-image" src={parcelLogo} alt={parcelRealName} />
        <h2>
          <strong>
            {parcelRealName} (nr {this.props.data.id})
          </strong>
        </h2>
        <p>
          <strong>Adres:</strong>
        </p>
        <p>
          ul. {this.props.data.address.street}
          <br />
          {this.props.data.address.postalCode} {this.props.data.address.city}
        </p>

        {this.props.hours && (
          <div>
            <p>
              <strong>Godziny otwarcia:</strong>
            </p>
            {this.props.data.openHoures.map((day, i) => {
              return (
                <p key={i}>
                  {day.day}: {day.from} - {day.to}
                </p>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Index;
