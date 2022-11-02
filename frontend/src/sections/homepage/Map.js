import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ icon }) => <div>{icon}</div>;

export default function Map() {
  const defaultProps = {
    center: {
      lat: 39.639023,
      lng: 22.419125,
    },
    zoom: 12,
  };

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAegfkVf-PXmPE-cbtxjPsQoZ6b9LMsINc ' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={39.62857} lng={22.38364} icon="Here" />
      </GoogleMapReact>
    </div>
  );
}
