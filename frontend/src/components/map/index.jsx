import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker';

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 52,
      lng: 22
    },
    zoom: 11
  };

  render() {
    const Markers =
      this.props.points &&
      this.props.points.map(point => (
        <MapMarker
          key={point.id}
          lat={point.coordinates[1]}
          lng={point.coordinates[0]}
          point={point}
          onClick={() => this.props.onPointSelect(point.id)}
        />
      ));

    return (
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {Markers}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
