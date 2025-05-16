const keyApi = '6f41c5a8871644869e005907240711'
const btnSearch = document.querySelector('.on-search-submit')
const searchForm = document.querySelector('#search-form')

defaultCity('Sao Paulo')

async function defaultCity(city) {
  const data = await searchWeatherData(city)
  fillData(data)
}

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  let city = document.getElementById('search-input').value

  if (!city) return

  const data = await searchWeatherData(city)

  fillData(data)
})

// btnSearch.addEventListener('click', async (event) => {
//   let city = document.getElementById('search-input').value

//   if (!city) return

//   const data = await searchWeatherData(city)

//   fillData(data)
// })

async function searchWeatherData(city) {
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${keyApi}&q=${city}&days=1&aqi=no&alerts=no&lang=pt`
  const response = await fetch(apiUrl)

  if (!response.ok) {
    alert('Cidade não encontrada.')
    return null
  }

  const data = await response.json()
  return data
}

function fillData(data) {
  const cityName = data.location.name
  const maxTemp = Math.round(data.forecast.forecastday[0].day.maxtemp_c)
  const minTemp = Math.round(data.forecast.forecastday[0].day.mintemp_c)
  const temperature = Math.round(data.current.temp_c)
  const humidity = data.current.humidity
  const condition = data.current.condition.text
  const windSpeed = data.current.wind_kph
  const uv = data.current.uv
  const rainChance = Math.round(data.forecast.forecastday[0].day.daily_chance_of_rain)
  const conditionIcon = data.current.condition.icon
  const sunRise = data.forecast.forecastday[0].astro.sunrise
  const sunSet = data.forecast.forecastday[0].astro.sunset
  const moonRise = data.forecast.forecastday[0].astro.moonrise
  const moonSet = data.forecast.forecastday[0].astro.moonset

  document.getElementById('city-name').textContent = cityName
  document.getElementById('max-temp').textContent = ` ${maxTemp}°C`
  document.getElementById('min-temp').textContent = ` ${minTemp}°C`
  document.getElementById('temperature').textContent = `${temperature}°`
  document.getElementById('humidity').textContent = `${humidity} %`
  document.getElementById('condition').textContent = condition

  document.getElementById('wind-speed').textContent = `${windSpeed} km/h`
  document.getElementById('uv-index').textContent = uv
  document.getElementById('rain-chance').textContent = ` ${rainChance} %`
  document.getElementById('condition-icon').setAttribute('src', conditionIcon)

  document.getElementById('sunrise-time').textContent = sunRise
  document.getElementById('sunset-time').textContent = sunSet
  document.getElementById('moonrise-time').textContent = moonRise
  document.getElementById('moonset-time').textContent = moonSet

  for (let hour = 0; hour < 24; hour++) {
    const temp = data.forecast.forecastday[0].hour[hour].temp_c
    const icon = data.forecast.forecastday[0].hour[hour].condition.icon

    document.getElementById(`temp-${String(hour).padStart(2, '0')}`).textContent = `${Math.round(
      temp
    )}°C`
    document.getElementById(`icon-${String(hour).padStart(2, '0')}`).setAttribute('src', icon)
  }
}

function scrollHourlyLeft() {
  const container = document.getElementById('hourlyForecast')
  container.scrollBy({ left: -100, behavior: 'smooth' })
}

function scrollHourlyRight() {
  const container = document.getElementById('hourlyForecast')
  container.scrollBy({ left: 100, behavior: 'smooth' })
}

const container = document.getElementById('hourlyForecast')

for (let i = 0; i < 24; i++) {
  const hour = String(i).padStart(2, '0')
  const item = document.createElement('div')
  item.className = 'forecast-item'
  item.innerHTML = `
      <div class="time">${hour}h</div>
      <img class="icon" id="icon-${hour}"></div>
      <div class="temp" id="temp-${hour}">-°C</div>
    `
  container.appendChild(item)
}
