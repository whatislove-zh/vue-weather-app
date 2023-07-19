<script>
export default {
    data() {
        return {
            currentCityInfo: this.city.list[0]

        }
    },
    props: {
        city: {
            type: Object,
        },
    },
    computed: {
        hourlyData() {
            return JSON.parse(JSON.stringify(this.city.list))
        }
    },

}
</script>
<template>
    <div class="current-weather">
        <div class="city-info">
            <h2 class="city-name">{{ city.city.name }}</h2>
            <p class="city-description">{{ currentCityInfo.weather[0].description }}</p>
            <img class="weather-img" :src="`http://openweathermap.org/img/wn/${currentCityInfo.weather[0].icon}@2x.png`
                " alt="weather-icon" />
        </div>
        <div div class=" temp-info">
            <h2 class="temp-info-main">{{ Math.trunc(currentCityInfo.main.temp) }} °C</h2>
            <h2 class="temp-info-feels">Feels like: {{ currentCityInfo.main.feels_like }} °C</h2>
        </div>
    </div>
    <div class="hourly-weather">
        <div class="hourly-weather-item" v-for="weather in hourlyData.splice(0, 9)">

            <p class="time">{{ weather.dt_txt }}</p>
            <img class="weather-img" :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                " alt="weather-icon" />
            <p class="description">{{ weather.weather[0].description }}</p>
            <p class="temp">{{ Math.trunc(weather.main.temp) }}°C</p>



        </div>
    </div>
</template>