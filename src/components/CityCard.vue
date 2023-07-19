<script>
export default {
    props: {
        city: {
            type: Object,
        },

    },
}
</script>
<template>
    <div class="current-weather-wrapper">
        <div class="current-weather">
            <div class="city-info">
                <h2 class="city-name">{{ city.name }}</h2>
                <p class="city-description">{{ city.weather[0].description }}</p>
            </div>
            <div class="temp-info">
                <h2 class="temp-info-main">{{ Math.trunc(city.main.temp) }} °C</h2>
                <h2 class="temp-info-feels">Feels like: {{ city.main.feels_like }} °C</h2>
            </div>
        </div>
        <img class="weather-img" :src="`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`
            " alt="weather-icon" />
    </div>
    
</template>