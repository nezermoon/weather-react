import { useState, useEffect } from 'react';
import './App.css';
import searchImg from './img/search.svg';
import cloudImg from './img/cloud.svg';
import heartImg from './img/heart.svg';
import rainImg from './img/rain.svg';
export default App;

const URLS = {
	WEATHER_MAIN_INFO: 'http://api.openweathermap.org/data/2.5/weather',
	WEATHER_FORECAST: 'http://api.openweathermap.org/data/2.5/forecast',
	API_KEY: 'f660a2fb1e4bad108d6160b7f58c555f',
}

function convertTime(unixTime) {
	let date = new Date(unixTime * 1000);
	let hours = date.getHours();
	let minutes = "0" + date.getMinutes();
	return hours + ':' + minutes.slice(-2);
}

function convertForecastDay(value) {
	const date = new Date(value * 1000)
  return date.toLocaleString('en-US', {day: "numeric"}) + ' ' + date.toLocaleString('en-US', {month: "short"});
}

function App() {
	const [cityName, setCity] = useState([]);
	const [favouriteCity, setFavouriteCity] = useState([]);
	const [forecastCity, setForecastCity] = useState([]);

	function showCityWeather() {
		const weatherInfoUrl = `${URLS.WEATHER_MAIN_INFO}?q=${cityName}&appid=${URLS.API_KEY}&units=metric`;
		fetch(weatherInfoUrl)
		.then(response => response.json())
		.then(city => setCity(city))
		// .then(city => console.log(city))
		.catch(error => alert('Error: ' + error));
	}

	function showWeatherForecast() {
		const forecastInfoUrl = `${URLS.WEATHER_FORECAST}?q=${cityName}&appid=${URLS.API_KEY}&units=metric`;
		fetch(forecastInfoUrl)
		.then(response => response.json())
		.then(city => setForecastCity(city.list))
		// .then(city => console.log((city.list)))
		.catch(error => alert('Error: ' + error));
	}

	return(
		<div className='weather_app'>
			<FindCityInput 
			cityName={cityName}
			setCity = {setCity}
			showCityWeather={showCityWeather}
			showWeatherForecast={showWeatherForecast}
			forecastCity={forecastCity}
			setForecastCity={setForecastCity}/>
			<Content 
			cityName={cityName}
			setCity={setCity}
			favouriteCity={favouriteCity} 
			setFavouriteCity={setFavouriteCity}
			showCityWeather={showCityWeather}
			showWeatherForecast={showWeatherForecast}
			forecastCity={forecastCity}
			setForecastCity={setForecastCity}/>
		</div>
	);
}

function FindCityInput({cityName, setCity, showCityWeather, showWeatherForecast, forecastCity, setForecastCity}) {
	function handleSubmit(event) {
		event.preventDefault();
	}
	function handleChange(e) {
		setCity(e.target.value);
		setForecastCity(e.target.value);
	}
	return(
		<form onSubmit={handleSubmit}>
			<label>
				<input type="text" onChange={handleChange} name="name" placeholder='Enter city' className='city_input'/>
			</label>
			<SearchCityButton 
			showCityWeather = {showCityWeather}
			showWeatherForecast={showWeatherForecast}/>
		</form>
	);
}

function SearchCityButton({showCityWeather, showWeatherForecast}) {
	return(
		<button className='search_icon' onClick={() => {showCityWeather(); showWeatherForecast(); }}>
			<img src={searchImg} alt="magnifier" className='search_icon_img'/>
		</button>
	);
}

function Content({cityName, setCity, favouriteCity, setFavouriteCity, showCityWeather, forecastCity, setForecastCity, showWeatherForecast}) {
	return(
		<div className='content'>
			<LeftSide 
			cityName={cityName}
			setCity = {setCity}
			favouriteCity={favouriteCity} 
			setFavouriteCity={setFavouriteCity}
			showWeatherForecast={showWeatherForecast}
			forecastCity={forecastCity}
			setForecastCity={setForecastCity}/>
			<RightSide
			cityName={cityName}
			setCity = {setCity}
			favouriteCity={favouriteCity} 
			setFavouriteCity={setFavouriteCity}
			showCityWeather={showCityWeather}
			forecastCity={forecastCity}
			setForecastCity={setForecastCity}/>
		</div>
	)
}

function LeftSide({cityName, setCity, favouriteCity, setFavouriteCity, forecastCity, setForecastCity, showWeatherForecast}) {
	const [activeTab, setActiveTab] = useState(1);

	function changeTab(tabsNum) {
		setActiveTab(tabsNum);
	}

	return(
		<div className='left_side'>
			<WeatherInfo 
			activeTab = {activeTab}
			cityName={cityName}
			setCity = {setCity}
			favouriteCity={favouriteCity} 
			setFavouriteCity={setFavouriteCity}/>
			<WeatherDetailedInfo 
			activeTab = {activeTab}
			cityName={cityName}/>
			<WeatherForecast 
			activeTab = {activeTab}
			cityName={cityName}
			showWeatherForecast={showWeatherForecast}
			forecastCity={forecastCity}
			setForecastCity={setForecastCity}/>
			<Tabs 
			activeTab = {activeTab}
			changeTab = {changeTab}/>
		</div>
	);
}

function RightSide({cityName, setCity, favouriteCity, setFavouriteCity, showCityWeather, forecastCity, setForecastCity}) {
	function showCurrentCityWeather(currentCity) {
		const weatherInfoUrl = `${URLS.WEATHER_MAIN_INFO}?q=${currentCity}&appid=${URLS.API_KEY}&units=metric`;
		fetch(weatherInfoUrl)
		.then(response => response.json())
		// .then(response => console.log(response.status))
		.then(city => setCity(city))
		.catch(error => alert('Error: ' + error));
	}

	function showCurrentWeatherForecast(currentCity) {
		const forecastInfoUrl = `${URLS.WEATHER_FORECAST}?q=${currentCity}&appid=${URLS.API_KEY}&units=metric`;
		fetch(forecastInfoUrl)
		.then(response => response.json())
		.then(city => setForecastCity(city.list))
		// .then(city => console.log((city.list)))
		.catch(error => alert('Error: ' + error));
	}

	return(
		<div className='right_side'>
			<div className='right_side_header'>
				Added Locations:
			</div>
			<div className='location_list'>
				{[...favouriteCity].map(value =>
					<div className='location' key={value.name}>
						<span onClick={(e) => {showCurrentCityWeather(e.target.textContent); showCurrentWeatherForecast(e.target.textContent)}}>{value.name}</span>
						<span className='cross' onClick={() => setFavouriteCity(favouriteCity.filter(item => item.sys.id !== value.sys.id))}></span>
					</div>
				)}
			</div>
		</div>
	);
}

function WeatherInfo({activeTab, cityName, setCity, favouriteCity, setFavouriteCity}) {
	function addToFavoutites() {
		const favouriteCitiesList = [...favouriteCity];
		if(cityName !== '') {
			favouriteCitiesList.push(cityName);
			setFavouriteCity([...new Map(favouriteCitiesList.map((item) => [item["id"], item])).values()]);
		} 
		// favouriteCity.forEach((value) => {
		// 	console.log(value.name);
		// 	console.log(value.sys.id)
		console.log(favouriteCity);
	}
	return(
		<div className = {activeTab === 1 ? 'weather_info_tab active_content' : 'weather_info_tab'}>
			<div className='degree'>{cityName?.main?.temp === undefined ? '0°' : Math.round(cityName?.main?.temp) + '°'}</div>
			<img src={cityName?.weather?.[0]?.icon === undefined ? cloudImg : `http://openweathermap.org/img/wn/${cityName.weather[0].icon}.png`} alt="cloud" className='weather_icon' />
			<div className='weather_info_bottom'>
				<span className='current_location'>{cityName.name === undefined ? 'Aktobe' : cityName.name}</span>
				<button onClick={addToFavoutites} className='add_location_to_favourite'>
					<img src={heartImg} alt="heart" className='heart_icon'/>
				</button>
			</div>
		</div>
	);
}

function WeatherList() {

}

function Tabs({activeTab, changeTab}) {
	return(
		<div className='tabs'>
			<div
			className = {activeTab === 1 ? 'tab_now active_tab' : 'tab_now'}
			onClick={() => changeTab(1)}>Now</div>
			<div 
			className = {activeTab === 2 ? 'tab_details active_tab' : 'tab_details'}
			onClick={() => changeTab(2)}>Details</div>
			<div 
			className = {activeTab === 3 ? 'tab_forecast active_tab' : 'tab_forecast'}
			onClick={() => changeTab(3)}>Forecast</div>
		</div>
	);
}

function WeatherDetailedInfo({activeTab, cityName}) {	
	return(
		<div className = {activeTab === 2 ? 'detailed_info active_content' : 'detailed_info'}>
			<span className='detailed_location'>{cityName?.name === undefined ? 'Aktobe' : cityName.name}</span>
			<span className='details_item detailed_temperature'>{cityName?.main?.temp === undefined ? 'Temperature:' : `Temperature: ${Math.round(cityName.main.temp)}°`}</span>
			<span className='details_item detailed_feeling'>{cityName?.main?.feels_like === undefined ? 'Feels like:' : `Feels like: ${Math.round(cityName.main.feels_like)}°`}</span>
			<span className='details_item detailed_weather'>{cityName?.weather?.[0]?.main === undefined ? 'Weather:' : `Weather: ${cityName.weather[0].main}`}</span>
			<span className='details_item detailed_sunrise'>{cityName?.sys?.sunrise === undefined ? 'Sunrise:' : `Sunrise: ${convertTime(cityName.sys.sunrise)}`}</span>
			<span className='details_item detailed_sunset'>{cityName?.sys?.sunset === undefined ? 'Sunset:' : `Sunset: ${convertTime(cityName.sys.sunset)}`}</span>
		</div>
	);
}

function WeatherForecast({activeTab, cityName, forecastCity, setForecastCity, showWeatherForecast}) {
	return(
		<div className = {activeTab === 3 ? 'forecast_tab active_content' : 'forecast_tab'}>
			<span className='forecast_location'>Location</span>
			<WeatherForecastCard 
			cityName={cityName}
			showWeatherForecast={showWeatherForecast}
			forecastCity={forecastCity}
			setForecastCity={setForecastCity}/>
		</div>
	);
}

function WeatherForecastCard({cityName, forecastCity, setForecastCity, showWeatherForecast}) {
	return(
		<div>
			{forecastCity !== undefined ? Object.values(forecastCity).map(item => 
			<div className='forecast_card'>
				<div className='forecast_top'>
					<span className='forecast_date'>{item?.dt === undefined ? '17 May' : convertForecastDay(item.dt)}</span>
					<span className='forecast_hour'>{item?.dt === undefined ? '12:00' : convertTime(item.dt)}</span>
				</div>
				<div className='forecast_bottom'>
					<div className='forecast_info'>
						<span className='forecast_temp'>{item?.main?.temp === undefined ? 'Temperature: 13°' : 'Temperature: ' + Math.round(item.main.temp) + '°'}</span>
						<span className='forecast_feeling'>{item?.main?.feels_like === undefined ? 'Feels like: 10°' : 'Feels like: ' + Math.round(item.main.feels_like) + '°'}</span>
					</div>
					<div className='forecast_visual'>
						<span className='forecast_weather'>{item?.weather?.[0]?.main === undefined ? 'Rain' : item.weather[0].main}</span>
						<img src={item?.weather?.[0]?.icon === undefined ? rainImg : `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="rain" className='forecast_img' />
					</div>
				</div>
			</div>) : null}
		</div>
	)
}