import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { useLoadScript } from "@react-google-maps/api";
import Map from "./Components/Map";
import { mapOptions } from "./Components/MapConfiguration";

export default function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapOptions.googleMapApiKey,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}
