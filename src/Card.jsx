import { FaDroplet, FaSnowflake } from "react-icons/fa6";
import {
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
  const [error, setError] = useState("");

  const getWeather = async () => {
    const apiKey = "57b68b503b376c16d0d3b7e42e9e298f";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city}&appid=${apiKey}&units=metric`,
    );

    const data = await res.json();
    setWeather(data);
  };

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case "Clear":
        return <FaSun size={50} className="m-7.5 w-75" />;

      case "Clouds":
        return <FaCloudSun size={50} className="m-7.5 w-75" />;

      case "Rain":
        return <FaCloudRain size={50} className="m-7.5 w-75" />;

      case "Snow":
        return <FaSnowflake size={50} className="m-7.5 w-75" />;

      default:
        return <FaSun size={50} className="m-7.5 w-75" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      <div className="absolute w-125 h-125 bg-purple-500 rounded-full blur-[120px] -top-50 -left-25 opacity-40"></div>
      <div className="absolute w-125 h-125 bg-blue-500 rounded-full blur-[120px] -bottom-25 -right-25 opacity-40"></div>

      <div className=" card backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 w-[90%] max-w-md text-white">
        {/* Search */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-5 py-3 rounded-full bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            onClick={getWeather}
            className="bg-white text-black p-3 rounded-full hover:scale-110 transition duration-300 cursor-pointer"
          >
            <FaSearch />
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}

        {/* Weather Info */}
        {weather && weather.main && (
          <div className="mt-8 text-center">
            <div className="flex justify-center mb-4">
              {getWeatherIcon(weather.weather[0].main)}
            </div>

            <h1 className="text-6xl font-bold">
              {Math.round(weather.main.temp)}°C
            </h1>

            <h2 className="text-2xl mt-2 opacity-80">{weather.name}</h2>

            {/* Details */}
            <div className="flex justify-between mt-8 bg-white/10 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <FaDroplet size={30} />
                <div>
                  <p className="text-xl font-semibold">
                    {weather.main.humidity}%
                  </p>
                  <p className="text-sm opacity-70">Humidity</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaWind size={30} />
                <div>
                  <p className="text-xl font-semibold">
                    {weather.wind.speed} km/h
                  </p>
                  <p className="text-sm opacity-70">Wind</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
