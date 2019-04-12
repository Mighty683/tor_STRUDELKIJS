import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const MapMarker = ({ name }) => <div>{name}</div>;
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
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.MAPS_KEY }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        {this.props.points && this.props.points.map(point => <MapMarker />)}
      </GoogleMapReact>
    );
  }
}

export default Map;
