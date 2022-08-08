import { useEffect, useState } from "react";
import "./App.css";
import CardWeather from "./Components/CardWeather";

// import * as React from "react";

function App() {
  const [coord, setcoord] = useState();

  useEffect(() => {
    const success = (pos) => {
      const latlon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setcoord(latlon);
    };

    navigator.geolocation.getCurrentPosition(success);
  }, []);

  //   ----------------------------------------------
  return (
    <div className="App">
      <CardWeather lon={coord?.lon} lat={coord?.lat} />
    </div>
  );
}

export default App;
