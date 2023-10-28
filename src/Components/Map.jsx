import React from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "80vw",
  height: "80vh",
};

const center = {
  lat: 37.8715,
  lng: -122.272781,
};

const markers = [
  {
    name: "location-1",
    location: {
      lat: 37.7843,
      lng: -122.4034,
    },
  },
  {
    name: "location-2",
    location: {
      lat: 39.7843,
      lng: -128.4034,
    },
  },
  {
    name: "location-3",
    location: {
      lat: 31.7843,
      lng: -125.4034,
    },
  },
];

export default function Map() {
  return (
    <>
      <h1> Map Demo</h1>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <div>
          <Marker position={center} />
        </div>
      </GoogleMap>
    </>
  );
}
