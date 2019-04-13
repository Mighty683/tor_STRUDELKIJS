import React from 'react';
import Mark from '../../assets/map-marker.svg';

export default function({ point, onClick }) {
  return (
    <img
      {...(onClick ? { onClick } : {})}
      className="map__marker"
      alt="logo"
      src={Mark}
    />
  );
}
