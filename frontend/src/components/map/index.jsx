import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

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
      />
    );
  }
}

export default Map;
