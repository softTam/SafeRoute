import { useState, useEffect } from "react";
import "./App.css";

import { useLoadScript } from "@react-google-maps/api";
import Map from "./Components/Map";
import { mapOptions } from "./Components/MapConfiguration";

export default function App() {
  // load input to server
  function handleButton() {
    let url = "http://localhost:5000/reportCrime";

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

    console.log("Done fetching");
  }

  // Load Google Map

  const [currentPos, setCurrentPos] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapOptions.googleMapApiKey,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <h2>Safe Route</h2>
      <div className="container">
        <div className="controls">
          <h4>Report a dangerous situation around you</h4>
          <button onClick={handleButton}>Report</button>
        </div>
        <div className="map">
          <Map setCurrentPos={setCurrentPos} />
        </div>
      </div>
    </>
  );
}
