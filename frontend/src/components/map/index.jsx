import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import './style.scss';

const MapMarker = ({ point }) => <div>{point.name}</div>;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 52,
      lng: 22
    },
    zoom: 11
  };

  render() {
    return (
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.props.points.map(point => (
            <MapMarker
              key={point.id}
              lat={point.coordinates[0]}
              lng={point.coordinates[1]}
              point={point}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
