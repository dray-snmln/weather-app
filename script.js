const weatherIcon = document.querySelector('#icon')
const searchBox = document.querySelector('.city-search')
const searchButton = document.querySelector('.search')
const key = '21b57f0a705c4ca9b9a8f95335aabec3'

searchButton.addEventListener('click', () => {
  if (searchBox.value !== '') {
    getData(searchBox.value)
  }
})

const getData = (city) => {
  console.log('getData')
  console.log(city.value)
  fetch(`https://api.weatherbit.io/v2.0/current?&city=${city}&key=${key}&include=minutely`)
    .then(data => data.json())
    .then(setWeatherData)
}

const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const precipitationElement = document.querySelector('[data-precipitation]')
const windElement = document.querySelector('[data-wind]')

const setWeatherData = (data) => {
  console.log(data)

  temperatureElement.textContent = data.temp
  precipitationElement.textContent = `${data.precip * 100}%`
  windElement.textContent = data.windSpeed
  weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${data.weather.code}.png`
}