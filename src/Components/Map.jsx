import React from "react";
import { useMemo, useState, useEffect } from "react";
import { GoogleMap, MarkerF, Circle } from "@react-google-maps/api";
import CustomMarker from "../Components/icons8-place-marker-50.png";

export default function Map({ setCurrentPos }) {
  //{ setCurrentPos }
  // load server
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:5000/get")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  // Parse JSON data to get desired attributes
  const locations = [];
  for (let elem in data) {
    let loc_attr = data[elem].location;
    locations.push(loc_attr);
  }

  const locInfo = [];
  if (locations.length > 1) {
    for (let j in locations) {
      locInfo.push({
        id: j.toString() + " " + locations[j].address,
        pos: {
          lat: parseFloat(locations[j].latitude),
          lng: parseFloat(locations[j].longtitude),
        },
      });
    }
    // console.log(locInfo);
  }

  //Get current location
  const currentPos = {
    lat: null,
    lng: null,
  };
  let infoWindow = new google.maps.InfoWindow();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentPos(pos);

        // console.log(pos);
        infoWindow.setPosition(pos);
        // console.log(pos);
        infoWindow.setContent("Location found.");

        currentPos.lat = pos.lat;
        currentPos.lng = pos.lng;
        // infoWindow.open(map);
        // map.setCenter(pos);
      },
      () => {
        alert("Error: The Geolocation service failed.");
      }
    );
  } else {
    // Browser doesn't support Geolocation
    alert("Error: Your browser doesn't support geolocation.");
  }

  //Render map
  return (
    <div>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <div>
          {locInfo.map((loc) => (
            <div key={loc.id}>
              <MarkerF position={loc.pos} />
              <Circle center={loc.pos} radius={100} options={closeOptions} />
            </div>
          ))}
          <div key="CurrentUserPosition">
            <MarkerF position={currentPos} options={{ icon: CustomMarker }} />
          </div>
        </div>
      </GoogleMap>
    </div>
  );
}

const containerStyle = {
  width: "80vw",
  height: "80vh",
};

const center = {
  lat: 37.8715,
  lng: -122.2595,
};

//Circle properties
const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};

const closeOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};

const farOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};
