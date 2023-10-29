import { useState, useEffect } from "react";
import "./App.css";

import { useLoadScript } from "@react-google-maps/api";
import Map from "./Components/Map";
import { mapOptions } from "./Components/MapConfiguration";

export default function App() {
  // load input to server
  function handleButton() {
    let url = `${mapOptions.url}/reportCrime`;

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentPos),
      cache: "default",
    })
      .then((response) => {
        console.log(response);
      })
      .then((currentPos) => {
        console.log("Success:", currentPos);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    document.getElementById("onlyButton").disabled = "disabled";
    document.getElementById("afterClick").innerHTML =
      "Your information has been reported";
  }

  // Load Google Map

  const [currentPos, setCurrentPos] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapOptions.googleMapApiKey,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <h1>Safe Route</h1>
      <h3>Getting you to anywhere safely</h3>
      <div className="container">
        <div className="controls">
          <h4>Report a dangerous situation around you</h4>
          <button id="onlyButton" onClick={handleButton}>
            Report
          </button>
          <div id="afterClick"></div>
        </div>
        <div className="map">
          <Map setCurrentPos={setCurrentPos} />
        </div>
      </div>
    </>
  );
}
