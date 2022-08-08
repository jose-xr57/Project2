import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Loading from "./Loading";

const CardWeather = ({ lat, lon }) => {
  const [weather, setweather] = useState();
  const [temperture, setTemperture] = useState();
  const [isCelsius, setIsCelsiu] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // -----------
    if (lat) {
      const APIkey = "37479e831bd1c0e7be6362a6c81f4f29";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;

      axios
        .get(URL)
        .then((res) => {
          setweather(res.data);
          const temp = {
            celcius: `${Math.round(res.data.main.temp - 273.15)} ℃`,
            farenheit: `${Math.round(
              ((res.data.main.temp - 273.15) * 9) / 5 + 32
            )} °F`,
          };
          setTemperture(temp);
          setIsLoading(false);
        })
        .catch((err) => console.log("err"));
    }
  }, [lat, lon]);
  console.log(weather);
  const handleClick = () => {
    setIsCelsiu(!isCelsius);
  };
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <article className="article">
        <h1>Weather App : '3</h1>
        <p>
          Ciudad {weather?.name}, {weather?.sys.country}
        </p>
        <div className="container-info">
          <img
            src={
              weather &&
              `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`
            }
            alt="Clima"
          />

          <div className="info-text">
            <h3 className="tittle-app">"{weather?.weather[0].description}"</h3>
            <ul>
              <li>
                Wind Speed: <br />
                <span>{weather?.wind.speed} m/s</span>
              </li>
              <li>
                Clouds: <br />
                <span>{weather?.clouds.all} %</span>
              </li>
              <li>
                Pressure:
                <br /> <span>{weather?.main.pressure} mb</span>
              </li>
            </ul>
          </div>
        </div>
        <h1>{isCelsius ? temperture?.celcius : temperture?.farenheit}</h1>
        <button onClick={handleClick}>
          {isCelsius ? "Change to °F" : "Change to ℃"}
        </button>
      </article>
    );
  }
};

export default CardWeather;
