<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
        <button @click="searchByCity" class="search-button">Search</button>
      </div>
    </div>
    <main>
      <div v-if="weatherData">
        <h2>data: {{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div>

          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperate }} °C</p>
        </div>

        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>
<script setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'

const apiKey = '76c39de5375398140c7edaf380fd6bfc'

const city = ref(null)
const weatherData = ref(null)

const hourlyForecase = ref(null)
const dailyForecase = ref(null)

const temperate = computed(() => {
  return weatherData ? Math.floor(weatherData.value.main.temp - 273) : null
})

const iconUrl = computed(() => {
  return weatherData
    ? `http://api.openweathermap.org/img/w/${weatherData.value.weather[0].icon}.png`
    : null
})

onMounted(async () => {
    await fetchCurrentLocationWeather()
})

const searchByCity = async()=>{
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.value)}&appid=${apiKey}`;
        await fetchWeatherData(url);
    }catch(e){
        console.log(e)
    }
}


const fetchCurrentLocationWeather = async () => {
  console.log('start')
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      await fetchWeatherData(url)
    })
  }
}

const fetchWeatherData = async (url) => {
  try {
    const response = await axios.get(url)
    weatherData.value = response.data
    console.log(weatherData.value)
} catch (e) {
    console.log(e)
  }
}
</script>
