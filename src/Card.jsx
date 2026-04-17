import { FaDroplet } from "react-icons/fa6";
import {
  FaCloud,
  FaCloudRain,
  FaCloudSun,
  FaSearch,
  FaSun,
  FaWind,
} from "react-icons/fa";
import { useState } from "react";

function Card() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const apiKey = "57b68b503b376c16d0d3b7e42e9e298f";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city}&appid=${apiKey}&units=metric`,
    );

    const data = await res.json();
    setWeather(data);
  };


  return (
    <div className="card w-[90%] max-w-117.5 bg-linear-to-t from-green-700 to-blue-400 text-white mt-10 mx-auto mb-0 rounded-3xl p-10 text-center">
      <div className="search w-full flex justify-center items-center">
        <input
          type="text"
          placeholder="Enter city name"
          spellCheck="false"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border-0 outline-0 bg-white text-[#555] py-2.5 px-6 rounded-full h-16 flex-1 mr-4 text-xl"
        />
        <button
          onClick={getWeather}
          className="w-15 h-15 border-0 bg-white cursor-pointer rounded-full"
        >
          <FaSearch size={25} color="black" className="w-8 mx-auto" />
        </button>
      </div>

      <div className={ `error text-left ml-3.5 mt-3 text-red-700 hidden`}>
        <p>Ivalid city name</p>
      </div>

      {weather && weather.main && (
        <div className="weather">
          <FaSun size={50} className="m-7.5 w-75" />
          <FaCloudRain size={50} className="m-7.5 w-75" />
          <FaCloudSun size={50} className="m-7.5 w-75" />
          <FaCloudSun size={50} className="m-7.5 w-75" />
          <h1 className="temp text-8xl font-semibold">
            {Math.round(weather.main.temp)}°c
          </h1>
          <h2 className="city text-4xl font-semibold">{weather.name}</h2>

          <div className="details flex items-center justify-between py-0 px-5 mt-20">
            <div className="col flex items-center text-center">
              <FaDroplet size={45} className="mr-2" />
              <div>
                <p className="humidity text-3xl -mt-2">
                  {weather.main.humidity}%
                </p>
                <p>Humidity</p>
              </div>
            </div>

            <div className="col flex items-center text-center">
              <FaWind size={45} className="mr-2" />
              <div>
                <p className="wind text-3xl -mt-2">{weather.wind.speed} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
