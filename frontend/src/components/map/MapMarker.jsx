import React, { Component } from 'react';
import Mark from '../../assets/map-marker.svg';
import RuchLogo from '../../assets/logo-ruch.svg';
import PocztaLogo from '../../assets/logo-poczta.svg';
import InpostLogo from '../../assets/logo-inpost.svg';
import { INPOST, POLIST_POST, RUCH } from '../../common/delivery-point.enum';

class MapMarker extends Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  componentDidMount() {
    this.ref.current.addEventListener('mouseover', e => {
      e.target.parentNode.classList.add('map__marker--visible-tooltip');
    });

    this.ref.current.addEventListener('mouseout', e => {
      e.target.parentNode.classList.remove('map__marker--visible-tooltip');
    });
  }

  render() {
    const { onClick, point } = this.props;

    let logo = null;
    if (point.type === INPOST) {
      logo = InpostLogo;
    } else if (point.type === POLIST_POST) {
      logo = PocztaLogo;
    } else if (point.type === RUCH) {
      logo = RuchLogo;
    }

    return (
      <div ref={this.ref} className={`map__marker ${this.props.selectedClass}`}>
        {logo && (
          <div
            className="map__marker-tooltip"
            style={{ backgroundImage: `url(${logo})` }}
          />
        )}
        <img {...(onClick ? { onClick } : {})} alt="Marker" src={Mark} />
      </div>
    );
  }
}

export default MapMarker;
