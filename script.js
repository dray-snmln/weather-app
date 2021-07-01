const weatherIcon = document.querySelector('#icon')
const searchBox = document.querySelector('.city-search')
const searchButton = document.querySelector('.search')
const key = '21b57f0a705c4ca9b9a8f95335aabec3'

searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (searchBox.value !== '') {
    const url = `https://api.weatherbit.io/v2.0/current?&city=${searchBox.value}&key=${key}`
    fetch(url)
      .then(response => response.json())
      .then(data => setWeatherData(data))
  }
})

const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const humidityElement = document.querySelector('[data-humidity]')
const windElement = document.querySelector('[data-wind]')

const setWeatherData = (data) => {
  console.log(data.data[0])
  console.log(data.data[0].weather.description)

  const weatherDesc = data.data[0].weather.description
  const weatherDescCapitalized  = weatherDesc.split(' ').map((word) => { 
        return word[0].toUpperCase() + word.substring(1); 
    }).join(' ')

  statusElement.textContent = weatherDescCapitalized
  locationElement.textContent = data.data[0].city_name
  temperatureElement.textContent = `${data.data[0].temp}°C`
  humidityElement.textContent = `${+(data.data[0].rh).toFixed(1)}%`
  windElement.textContent = `${+(data.data[0].wind_spd * 3.6).toFixed(1)} km/h`
  weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`
  document.body.style.backgroundImage = `url('https://source.unsplash.com/random/1600x900/?${data.data[0].city_name}')`
}