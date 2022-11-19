
import React, {useState} from 'react';

const api = {
    key: "a9e8f95f3c142030ef3630d1580b7f9f",
    base: "https://api.openweathermap.org/data/2.5/"
}


function App() {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
        if (evt.key === 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                });
        }
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    return (
        <div className={(typeof weather.weather !== "undefined")
            ? ((weather.weather[0].main === "Ash") ? 'app ash'
                : (weather.weather[0].main === "Clouds") ? 'app clouds'
                    : (weather.weather[0].main === "Clear") ? 'app clear'
                        : (weather.weather[0].main === "Drizzle") ? 'app drizzle'
                            : (weather.weather[0].main === ("Fog" || "Mist" || "Smoke" || "Haze")) ? 'app fog'
                                : (weather.weather[0].main === "Rain") ? 'app rain'
                                    : (weather.weather[0].main === ("Sand" || "Dust")) ? 'app sand'
                                        : (weather.weather[0].main === "Snow") ? 'app snow'
                                            : (weather.weather[0].main === "Thunderstorm") ? 'app storm'
                                                : (weather.weather[0].main === "Tornado") ? 'app tornado'
                                                    : 'app')

            : 'app'}>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}

                    />
                </div>

                {(typeof weather.main != 'undefined') ? (
                    <div>
                        <div className="location-box">
                            <div className="location">{weather.name}, {weather.sys.country}</div>
                            <div className="date">{dateBuilder(new Date())}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}°C
                            </div>
                            <div className="weather">{weather.weather[0].main}</div>
                        </div>
                    </div>
                ) : ('')}
            </main>


        </div>
    );
}

export default App;